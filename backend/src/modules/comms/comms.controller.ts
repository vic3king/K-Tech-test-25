import { Controller, Get } from '@nestjs/common';

@Controller('comms')
export class CommsController {
  @Get()
  getComms() {
    return 'Hello World';
  }
}
