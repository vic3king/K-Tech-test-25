import { Injectable, NotFoundException } from '@nestjs/common';
import { WelcomeMessageResponse } from './comms.dto';
import { UsersService } from '@modules/users';

@Injectable()
export class CommsService {
  constructor(private readonly usersService: UsersService) {}

  async getWelcomeMessage(
    userId: string,
    templateName: string,
  ): Promise<WelcomeMessageResponse> {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    console.log(templateName);

    return { message: `Welcome ${user.firstName} ${user.lastName}` };
  }
}
