import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';
import { CommsController } from './modules/comms/comms.controller';
import { UsersModule } from './modules/users/users.module';
import { CommsModule } from './modules/comms/comms.module';

@Module({
  controllers: [AppController, UsersController, CommsController],
  providers: [AppService, UsersService],
  imports: [UsersModule, CommsModule],
})
export class AppModule {}
