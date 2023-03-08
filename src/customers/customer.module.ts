import { Module } from '@nestjs/common';


import { CUSTOMER_SERVICE } from './domain/interfaces/CustomerService.interface';
import { CUSTOMER_REPOSITORY } from './domain/interfaces/CustomerRepository.interface';

import { CustomerService } from './application/usecases/Customer.service';
import { CustomerFinder } from './application/usecases/CustomerFinder.service';

import { ListAllCustomersController } from './infraestructure/controllers/ListAllCustomers.controller';
import { CustomerMikroOrmRepository } from './domain/repositories/CustomerMikroOrm.repository';
import { TypeOrmClientFactory } from './infraestructure/adapters/TypeOrm';
import { AddCreditCustomerController } from './infraestructure/controllers/AddCreditCustomer.controller';

@Module({
  imports: [
    ...TypeOrmClientFactory.createTypeOrmConection(
      `${__dirname}/domain/entities/Customer.entity`,
    ),
  ],
  controllers: [ListAllCustomersController, AddCreditCustomerController],
  providers: [
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: CustomerMikroOrmRepository,
    },
    {
      provide: CUSTOMER_SERVICE,
      useClass: CustomerService,
    },
    CustomerFinder,
  ],
})
export class CustomerModule {}
