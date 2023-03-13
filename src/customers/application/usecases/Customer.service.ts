import { Inject, Injectable } from '@nestjs/common';

import {
  Customer,
  CustomerPrimitives,
} from '../../domain/models/Customer.model';
import {
  CUSTOMER_REPOSITORY,
  CustomerRepository,
} from '../../domain/interfaces/CustomerRepository.interface';

import { CustomerServiceInterface } from '../../domain/interfaces/CustomerService.interface';
import { CustomerEntity } from '../../domain/entities/Customer.entity';

@Injectable()
export class CustomerService implements CustomerServiceInterface {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private customerRepository: CustomerRepository<CustomerEntity>,
  ) {}

  async create(customer: CustomerPrimitives): Promise<Customer> {
    const newCustomer: CustomerEntity = await this.customerRepository.save(
      customer,
    );

    return CustomerEntity.toDomain(newCustomer);
  }

  async findAll(): Promise<Customer[]> {
    const customers: CustomerEntity[] = await this.customerRepository.findAll();

    return customers.map((customer: CustomerEntity) =>
      CustomerEntity.toDomain(customer),
    );
  }

  async findBy(textSearch: Partial<CustomerPrimitives>): Promise<Customer[]> {
    const customers: CustomerEntity[] = await this.customerRepository.findBy(
      textSearch,
    );

    return customers.map((customer: CustomerEntity) =>
      CustomerEntity.toDomain(customer),
    );
  }

  async addCredit({
    uuid,
    availableCredit,
  }: Partial<CustomerPrimitives>): Promise<Customer> {
    const updatedCustomer: CustomerEntity =
      await this.customerRepository.update(uuid, { availableCredit });

    return CustomerEntity.toDomain(updatedCustomer);
  }
}
