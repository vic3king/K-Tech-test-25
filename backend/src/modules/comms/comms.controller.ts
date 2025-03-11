import { Controller, Get, Param, Query } from '@nestjs/common';
import { NextDeliveryDocs, WelcomeMessageDocs } from '@common/decorators';
import { NextDeliveryResponse, WelcomeMessageResponse } from '@modules/comms';
import { ApiTags } from '@nestjs/swagger';
import { CommsService } from './comms.service';

@ApiTags('Communications')
@Controller('comms')
export class CommsController {
  constructor(private readonly commsService: CommsService) {}

  /**
   * Get a personalized welcome message for a new user
   * @param userId - The unique identifier of the user
   * @returns {Promise<WelcomeMessageResponse>} An object containing the welcome message
   * @throws {NotFoundException} When the user is not found
   */
  @WelcomeMessageDocs()
  @Get('welcome-fresh')
  async getWelcomeMessage(
    @Query('userId') userId: string,
  ): Promise<WelcomeMessageResponse> {
    return this.commsService.getWelcomeMessage(userId, 'welcome-fresh');
  }

  /**
   * Get the next delivery date for a user
   * @param userId - The unique identifier of the user
   * @returns {Promise<NextDeliveryResponse>} An object containing the next delivery date
   * @throws {NotFoundException} When the user is not found
   */
  @NextDeliveryDocs()
  @Get('your-next-delivery')
  async getNextDeliveryMessage(
    @Query('userId') userId: string,
  ): Promise<NextDeliveryResponse> {
    return this.commsService.getNextDeliveryMessage(
      userId,
      'your-next-delivery',
    );
  }
}
