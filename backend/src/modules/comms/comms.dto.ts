import { ApiProperty } from '@nestjs/swagger';

export class WelcomeMessageResponse {
  @ApiProperty({ example: 'Welcome John Doe' })
  message: string;
}

export class NextDeliveryResponse {
  @ApiProperty({
    example: 'Your next delivery for <cat-names>',
  })
  title: string;

  @ApiProperty({
    example:
      "Hey <full-name>! In two days' time, we'll be charging you for your next order for <cat-names>'s fresh food.",
  })
  message: string;

  @ApiProperty({ example: 120 })
  totalPrice: number;

  @ApiProperty({ example: true })
  freeGift: boolean;
}
