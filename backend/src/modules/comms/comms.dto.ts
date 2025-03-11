import { ApiProperty } from '@nestjs/swagger';

export class WelcomeMessageResponse {
  @ApiProperty({ example: 'Welcome John Doe' })
  message: string;
}
