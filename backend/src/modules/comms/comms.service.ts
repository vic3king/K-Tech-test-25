import { Injectable, NotFoundException } from '@nestjs/common';
import { NextDeliveryResponse, WelcomeMessageResponse } from './comms.dto';
import { UsersService } from '@modules/users';
import { TemplatesService } from '@modules/templates';
import { calculateTotalPrice } from '@common/utility';
import { FREE_GIFT_THRESHOLD } from '@common/constants';
@Injectable()
export class CommsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly templatesService: TemplatesService,
  ) {}

  async getWelcomeMessage(
    userId: string,
    templateName: string,
  ): Promise<WelcomeMessageResponse> {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const message = await this.templatesService.renderTemplate(templateName, {
      fullName: `${user.firstName} ${user.lastName}`,
      catNames: user.cats
        .filter((cat) => cat.subscriptionActive) // Only include active subscriptions, can be improved in the future
        .map((cat) => cat.name),
    });

    return message;
  }

  async getNextDeliveryMessage(
    userId: string,
    templateName: string,
  ): Promise<NextDeliveryResponse> {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const activeCats = user.cats.filter((cat) => cat.subscriptionActive);

    const message = await this.templatesService.renderTemplate(templateName, {
      fullName: `${user.firstName} ${user.lastName}`,
      catNames: activeCats.map((cat) => cat.name),
    });

    const totalPrice = calculateTotalPrice(user.cats);
    const freeGift = totalPrice > FREE_GIFT_THRESHOLD;

    return {
      title: message.title,
      message: message.message,
      totalPrice,
      freeGift,
      cats: activeCats,
    };
  }
}
