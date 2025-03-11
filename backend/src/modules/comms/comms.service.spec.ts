import { Test, TestingModule } from '@nestjs/testing';
import { CommsService } from './comms.service';
import { UsersService } from '@modules/users';
import { TemplatesService } from '@modules/templates';
import { NotFoundException } from '@nestjs/common';
import {
  FREE_GIFT_THRESHOLD,
  POUCH_SIZE_PRICES,
} from '@common/constants/constants';

describe('CommsService', () => {
  let service: CommsService;
  let usersService: UsersService;
  let templatesService: TemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommsService,
        {
          provide: UsersService,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: TemplatesService,
          useValue: {
            renderTemplate: jest.fn().mockResolvedValue({
              message:
                "Welcome to KatKin, John Doe! We're super excited for Luna and Milo to join the KatKin club and start loving fresh!",
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CommsService>(CommsService);
    usersService = module.get<UsersService>(UsersService);
    templatesService = module.get<TemplatesService>(TemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getWelcomeMessage', () => {
    const mockUser = {
      id: 'user123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      cats: [
        {
          id: 'cat123',
          name: 'Luna',
          subscriptionActive: true,
          breed: 'Persian',
          pouchSize: 'small',
        },
        {
          id: 'cat456',
          name: 'Milo',
          subscriptionActive: true,
          breed: 'Persian',
          pouchSize: 'small',
        },
      ],
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return welcome message for existing user', async () => {
      jest.spyOn(usersService, 'findById').mockResolvedValue(mockUser);
      jest.spyOn(templatesService, 'renderTemplate').mockResolvedValue({
        message:
          "Welcome to KatKin, John Doe! We're super excited for Luna and Milo to join the KatKin club and start loving fresh!",
      });

      const result = await service.getWelcomeMessage(
        'user123',
        'welcome-fresh',
      );

      expect(result).toEqual({
        message:
          "Welcome to KatKin, John Doe! We're super excited for Luna and Milo to join the KatKin club and start loving fresh!",
      });
      expect(usersService.findById).toHaveBeenCalledWith('user123');
      expect(templatesService.renderTemplate).toHaveBeenCalledWith(
        'welcome-fresh',
        expect.objectContaining({
          fullName: 'John Doe',
          catNames: ['Luna', 'Milo'],
        }),
      );
    });

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(usersService, 'findById').mockResolvedValue(null);

      await expect(
        service.getWelcomeMessage('nonexistent', 'welcome-fresh'),
      ).rejects.toThrow(NotFoundException);
      expect(usersService.findById).toHaveBeenCalledWith('nonexistent');
      expect(templatesService.renderTemplate).not.toHaveBeenCalled();
    });

    it('should handle user with no cats', async () => {
      const userWithNoCats = { ...mockUser, cats: [] };
      jest.spyOn(usersService, 'findById').mockResolvedValue(userWithNoCats);

      await service.getWelcomeMessage('user123', 'welcome-fresh');

      expect(templatesService.renderTemplate).toHaveBeenCalledWith(
        'welcome-fresh',
        expect.objectContaining({
          fullName: 'John Doe',
          catNames: [],
        }),
      );
    });

    it('should handle user with single cat', async () => {
      const userWithOneCat = { ...mockUser, cats: [mockUser.cats[0]] };
      jest.spyOn(usersService, 'findById').mockResolvedValue(userWithOneCat);

      await service.getWelcomeMessage('user123', 'welcome-fresh');

      expect(templatesService.renderTemplate).toHaveBeenCalledWith(
        'welcome-fresh',
        expect.objectContaining({
          fullName: 'John Doe',
          catNames: ['Luna'],
        }),
      );
    });

    it('should handle template rendering errors', async () => {
      jest.spyOn(usersService, 'findById').mockResolvedValue(mockUser);
      jest
        .spyOn(templatesService, 'renderTemplate')
        .mockRejectedValue(new Error('Template error'));

      await expect(
        service.getWelcomeMessage('user123', 'welcome-fresh'),
      ).rejects.toThrow('Template error');
    });

    it('should pass correct template name', async () => {
      jest.spyOn(usersService, 'findById').mockResolvedValue(mockUser);

      await service.getWelcomeMessage('user123', 'custom-template');

      expect(templatesService.renderTemplate).toHaveBeenCalledWith(
        'custom-template',
        expect.any(Object),
      );
    });
  });

  describe('getNextDeliveryMessage', () => {
    const mockUser = {
      id: 'user123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      cats: [
        {
          id: 'cat123',
          name: 'Luna',
          subscriptionActive: true,
          breed: 'Persian',
          pouchSize: 'F',
          price: POUCH_SIZE_PRICES.F,
        },
        {
          id: 'cat456',
          name: 'Milo',
          subscriptionActive: true,
          breed: 'Persian',
          pouchSize: 'F',
          price: POUCH_SIZE_PRICES.F,
        },
      ],
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it(`should return next delivery message with free gift when total price exceeds threshold of £${FREE_GIFT_THRESHOLD}`, async () => {
      jest.spyOn(usersService, 'findById').mockResolvedValue(mockUser);
      jest.spyOn(templatesService, 'renderTemplate').mockResolvedValue({
        title: 'Next Delivery',
        message: 'Your next delivery is coming soon!',
      });

      const result = await service.getNextDeliveryMessage(
        'user123',
        'next-delivery',
      );
      const expectedTotal = POUCH_SIZE_PRICES.F * 2;

      expect(result).toEqual({
        title: 'Next Delivery',
        message: 'Your next delivery is coming soon!',
        totalPrice: expectedTotal, // 71.25 * 2 = 142.50
        freeGift: expectedTotal >= FREE_GIFT_THRESHOLD,
      });
      expect(usersService.findById).toHaveBeenCalledWith('user123');
      expect(templatesService.renderTemplate).toHaveBeenCalledWith(
        'next-delivery',
        expect.objectContaining({
          fullName: 'John Doe',
          catNames: ['Luna', 'Milo'],
        }),
      );
    });

    it(`should return next delivery message without free gift when total price is below threshold of £${FREE_GIFT_THRESHOLD}`, async () => {
      const userWithOneCat = {
        ...mockUser,
        cats: [
          {
            ...mockUser.cats[0],
            pouchSize: 'A',
            price: POUCH_SIZE_PRICES.A,
          },
        ],
      };
      jest.spyOn(usersService, 'findById').mockResolvedValue(userWithOneCat);
      jest.spyOn(templatesService, 'renderTemplate').mockResolvedValue({
        title: 'Next Delivery',
        message: 'Your next delivery is coming soon!',
      });

      const result = await service.getNextDeliveryMessage(
        'user123',
        'next-delivery',
      );
      const expectedTotal = POUCH_SIZE_PRICES.A;

      expect(result).toEqual({
        title: 'Next Delivery',
        message: 'Your next delivery is coming soon!',
        totalPrice: expectedTotal,
        freeGift: expectedTotal >= FREE_GIFT_THRESHOLD,
      });
    });

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(usersService, 'findById').mockResolvedValue(null);

      await expect(
        service.getNextDeliveryMessage('nonexistent', 'next-delivery'),
      ).rejects.toThrow(NotFoundException);
      expect(usersService.findById).toHaveBeenCalledWith('nonexistent');
      expect(templatesService.renderTemplate).not.toHaveBeenCalled();
    });

    it('should handle inactive subscriptions', async () => {
      const userWithInactiveCat = {
        ...mockUser,
        cats: [
          { ...mockUser.cats[0], subscriptionActive: false },
          { ...mockUser.cats[1], subscriptionActive: true },
        ],
      };
      jest
        .spyOn(usersService, 'findById')
        .mockResolvedValue(userWithInactiveCat);
      jest.spyOn(templatesService, 'renderTemplate').mockResolvedValue({
        title: 'Next Delivery',
        message: 'Your next delivery is coming soon!',
      });

      const result = await service.getNextDeliveryMessage(
        'user123',
        'next-delivery',
      );
      const expectedTotal = POUCH_SIZE_PRICES.F;

      expect(templatesService.renderTemplate).toHaveBeenCalledWith(
        'next-delivery',
        expect.objectContaining({
          catNames: ['Milo'],
        }),
      );
      expect(result.totalPrice).toBe(expectedTotal);
      expect(result.freeGift).toBe(expectedTotal >= FREE_GIFT_THRESHOLD);
    });

    it('should handle template rendering errors', async () => {
      jest.spyOn(usersService, 'findById').mockResolvedValue(mockUser);
      jest
        .spyOn(templatesService, 'renderTemplate')
        .mockRejectedValue(new Error('Template error'));

      await expect(
        service.getNextDeliveryMessage('user123', 'next-delivery'),
      ).rejects.toThrow('Template error');
    });

    it('should handle user with no cats', async () => {
      const userWithNoCats = { ...mockUser, cats: [] };
      jest.spyOn(usersService, 'findById').mockResolvedValue(userWithNoCats);
      jest.spyOn(templatesService, 'renderTemplate').mockResolvedValue({
        title: 'Next Delivery',
        message: 'Your next delivery is coming soon!',
      });

      const result = await service.getNextDeliveryMessage(
        'user123',
        'next-delivery',
      );

      expect(result).toEqual({
        title: 'Next Delivery',
        message: 'Your next delivery is coming soon!',
        totalPrice: 0,
        freeGift: false,
      });
      expect(templatesService.renderTemplate).toHaveBeenCalledWith(
        'next-delivery',
        expect.objectContaining({
          catNames: [],
        }),
      );
    });
  });
});
