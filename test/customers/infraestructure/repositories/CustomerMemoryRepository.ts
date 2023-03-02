import { Injectable } from '@nestjs/common';

import { CustomerRepository } from '../../../../src/customers/domain/interfaces/CustomerRepository.interface';
import {
  Customer,
  CustomerPrimitives,
} from '../../../../src/customers/domain/models/Customer.model';

import { CustomerMother } from '../../domain/CustomerMother';

import { DefaultCustomer } from '../../../shared/customers';

@Injectable()
export class CustomerMemoryRepository implements CustomerRepository {
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

  findAll(): Customer[] {
    return this.customers;
  }
  findById(uuid: string): Customer {
    return this.customers.find(
      (customer: Customer) => customer.toPrimitives().uuid === uuid,
    );
  }

  addCredit({ uuid, availableCredit }: Partial<CustomerPrimitives>): Customer {
    const customer: Customer = this.findById(uuid);

    if (typeof customer !== 'undefined') {
      customer.addCredit(availableCredit);
    }

    return customer;
  }
}
