import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { CUSTOMER_SERVICE } from './domain/interfaces/CustomerService.interface';
import { CUSTOMER_REPOSITORY } from './domain/interfaces/CustomerRepository.interface';
import { CustomerTypeOrmRepository } from './domain/repositories/CustomerTypeOrm.repository';

import { CustomerService } from './application/usecases/Customer.service';
import { CustomerFinder } from './application/usecases/CustomerFinder.service';
import { AddCreditCustomerService } from './application/usecases/AddCreditCustomer.service';

import { ListAllCustomersController } from './infraestructure/controllers/ListAllCustomers.controller';
import { AddCreditCustomerController } from './infraestructure/controllers/AddCreditCustomer.controller';

import { CustomerEntity } from './domain/entities/Customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [ListAllCustomersController, AddCreditCustomerController],
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
    AddCreditCustomerService,
  ],
})
export class CustomerModule {}
