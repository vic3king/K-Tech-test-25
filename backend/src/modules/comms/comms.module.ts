import { Module } from '@nestjs/common';
import { CommsController } from './comms.controller';
import { CommsService } from './comms.service';
import { UsersModule } from '@modules/users';
import { TemplatesModule } from '@modules/templates';
@Module({
  imports: [UsersModule, TemplatesModule],
  controllers: [CommsController],
  providers: [CommsService],
})
export class CommsModule {}
