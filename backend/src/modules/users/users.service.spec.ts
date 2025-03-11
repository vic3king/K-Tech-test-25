import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    mockUserRepository = {
      findById: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      const mockUser = {
        id: '1',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        cats: [],
      };
      mockUserRepository.findById.mockResolvedValue(mockUser);

      const user = await service.findById('1');

      expect(mockUserRepository.findById).toHaveBeenCalledWith('1');
      expect(user).toEqual(mockUser);
    });
  });
});
