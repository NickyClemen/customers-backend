import { Module } from '@nestjs/common';

import { CUSTOMER_SERVICE } from './domain/interfaces/CustomerService.interface';
import { CUSTOMER_REPOSITORY } from './domain/interfaces/CustomerRepository.interface';

import { CustomerService } from './application/usecases/Customer.service';
import { CustomerFinder } from './application/usecases/CustomerFinder.service';

import { ListAllCustomersController } from './infraestructure/controllers/ListAllCustomers.controller';
import { CustomerTypeOrmRepository } from './infraestructure/repositories/CustomerTypeOrmRepository';

@Module({
  imports: [],
  controllers: [ListAllCustomersController],
  providers: [
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: CustomerTypeOrmRepository,
    },
    {
      provide: CUSTOMER_SERVICE,
      useClass: CustomerService,
    },
    CustomerFinder,
  ],
})
export class CustomerModule {}
