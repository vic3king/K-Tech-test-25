import { Module } from '@nestjs/common';
import { CommsController } from './comms.controller';
import { CommsService } from './comms.service';
import { UsersModule } from '@modules/users';

@Module({
  imports: [UsersModule],
  controllers: [CommsController],
  providers: [CommsService],
})
export class CommsModule {}
