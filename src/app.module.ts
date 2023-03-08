import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CustomerModule } from './customers/customer.module';
@Module({
  imports: [
    CustomerModule,
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/.development.env`,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
