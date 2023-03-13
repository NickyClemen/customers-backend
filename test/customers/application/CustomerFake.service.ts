import { Inject, Injectable } from '@nestjs/common';

import {
  Customer,
  CustomerPrimitives,
} from '../../../src/customers/domain/models/Customer.model';
import {
  CUSTOMER_REPOSITORY,
  CustomerRepository,
} from '../../../src/customers/domain/interfaces/CustomerRepository.interface';

import { CustomerServiceInterface } from '../../../src/customers/domain/interfaces/CustomerService.interface';

@Injectable()
export class CustomerFakeService implements CustomerServiceInterface {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private customerRepository: CustomerRepository<Customer>,
  ) {}

  async create(customer: CustomerPrimitives): Promise<Customer> {
    const newCustomer: Customer = await this.customerRepository.save(customer);

    return newCustomer;
  }

  async findAll(): Promise<Customer[]> {
    const customers: Customer[] = await this.customerRepository.findAll();

    return customers;
  }

  async findBy(textSearch: Partial<CustomerPrimitives>): Promise<Customer[]> {
    const customers: Customer[] = await this.customerRepository.findBy(
      textSearch,
    );

    return customers;
  }

  async addCredit({
    uuid,
    availableCredit,
  }: Partial<CustomerPrimitives>): Promise<Customer> {
    const updatedCustomer: Customer = await this.customerRepository.update(
      uuid,
      { availableCredit },
    );

    return updatedCustomer;
  }
}
