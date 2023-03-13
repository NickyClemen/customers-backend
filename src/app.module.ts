import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CustomerModule } from './customers/customer.module';
import { TypeOrmClientFactory } from './customers/infraestructure/database/TypeOrmClientFactory';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmClientFactory.createTypeOrmConnection(),
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
