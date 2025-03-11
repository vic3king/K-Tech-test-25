import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CommsModule } from './modules/comms/comms.module';
import { TemplatesModule } from './modules/templates/templates.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, CommsModule, TemplatesModule],
})
export class AppModule {}
