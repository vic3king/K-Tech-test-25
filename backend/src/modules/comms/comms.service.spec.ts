import { Test, TestingModule } from '@nestjs/testing';
import { CommsService } from './comms.service';
import { UsersService } from '@modules/users';
import { NotFoundException } from '@nestjs/common';

describe('CommsService', () => {
  let service: CommsService;
  let usersService: UsersService;

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
      ],
    }).compile();

    service = module.get<CommsService>(CommsService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getWelcomeMessage', () => {
    it('should return welcome message for existing user', async () => {
      const mockUser = {
        id: 'user123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        cats: [],
      };

      jest.spyOn(usersService, 'findById').mockResolvedValue(mockUser);

      const result = await service.getWelcomeMessage(
        'user123',
        'welcome-fresh',
      );

      expect(result).toEqual({
        message: 'Welcome John Doe',
      });
      expect(usersService.findById).toHaveBeenCalledWith('user123');
    });

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(usersService, 'findById').mockResolvedValue(null);

      await expect(
        service.getWelcomeMessage('nonexistent', 'welcome-fresh'),
      ).rejects.toThrow(NotFoundException);
      expect(usersService.findById).toHaveBeenCalledWith('nonexistent');
    });
  });
});
