import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MyLoggerDev } from './logger/my.logger.dev';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, MyLoggerDev],
})
export class AppModule { }
