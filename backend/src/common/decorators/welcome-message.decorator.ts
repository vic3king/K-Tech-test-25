import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { WelcomeMessageResponse } from '@modules/comms/comms.dto';

export function WelcomeMessageDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Get welcome message for new user' }),
    ApiQuery({ name: 'userId', required: true }),
    ApiResponse({ status: 200, type: WelcomeMessageResponse }),
    ApiResponse({ status: 404, description: 'User not found' }),
  );
}
