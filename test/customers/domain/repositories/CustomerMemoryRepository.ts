import { Injectable } from '@nestjs/common';

import { CustomerRepository } from '../../../../src/customers/domain/interfaces/CustomerRepository.interface';
import {
  Customer,
  CustomerPrimitives,
} from '../../../../src/customers/domain/models/Customer.model';

import { CustomerMother } from '../models/CustomerMother';

import { DefaultCustomer } from '../../../shared/customers';

@Injectable()
export class CustomerMemoryRepository implements CustomerRepository<Customer> {
  private readonly customers: Customer[];

  constructor() {
    this.customers = [
      CustomerMother.create(DefaultCustomer),
      ...CustomerMother.createRandomCustomers(),
    ].sort(
      (a: Customer, b: Customer) =>
        a.toPrimitives().availableCredit - b.toPrimitives().availableCredit,
    );
  }

  async findAll(): Promise<Customer[]> {
    return this.customers;
  }

  async findBy(textSearch: Partial<CustomerPrimitives>): Promise<Customer[]> {
    return this.customers.filter((customer: Customer) => {
      for (const [key, value] of Object.entries(textSearch)) {
        return customer.toPrimitives()[key] === value;
      }
    });
  }

  async save(customer: Omit<CustomerPrimitives, 'uuid'>): Promise<Customer> {
    const newCustomer: Customer = CustomerMother.create(customer);

    this.customers.push(newCustomer);

    return newCustomer;
  }

  async update(
    uuid,
    customer: Omit<CustomerPrimitives, 'uuid'>,
  ): Promise<Customer> {
    const customerIndex: number = this.customers.findIndex(
      (customer: Customer) => customer.toPrimitives().uuid === uuid,
    );

    this.customers[customerIndex].updateCustomer({
      ...this.customers[customerIndex].toPrimitives(),
      ...customer,
    });

    return this.customers[customerIndex];
  }
}
