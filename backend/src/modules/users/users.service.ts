import { Injectable } from '@nestjs/common';
import { User, UserRepository } from '@modules/users';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }
}
