import { Test, TestingModule } from '@nestjs/testing';
import { CommsController } from './comms.controller';
import { CommsService } from './comms.service';
import { NotFoundException } from '@nestjs/common';

describe('CommsController', () => {
  let controller: CommsController;
  let service: CommsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommsController],
      providers: [
        {
          provide: CommsService,
          useValue: {
            getWelcomeMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CommsController>(CommsController);
    service = module.get<CommsService>(CommsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getWelcomeMessage', () => {
    it('should return welcome message for valid user', async () => {
      const userId = 'user123';
      const expectedResponse = { message: 'Welcome John Doe' };

      jest
        .spyOn(service, 'getWelcomeMessage')
        .mockResolvedValue(expectedResponse);

      const result = await controller.getWelcomeMessage(userId);

      expect(result).toEqual(expectedResponse);
      expect(service.getWelcomeMessage).toHaveBeenCalledWith(
        userId,
        'welcome-fresh',
      );
    });

    it('should throw NotFoundException when user is not found', async () => {
      const userId = 'nonexistent';

      jest
        .spyOn(service, 'getWelcomeMessage')
        .mockRejectedValue(new NotFoundException());

      await expect(controller.getWelcomeMessage(userId)).rejects.toThrow(
        NotFoundException,
      );

      expect(service.getWelcomeMessage).toHaveBeenCalledWith(
        userId,
        'welcome-fresh',
      );
    });
  });
});
