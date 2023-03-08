import { Inject, Injectable } from '@nestjs/common';

import { CUSTOMER_SERVICE } from '../../domain/interfaces/CustomerService.interface';

import {
  Customer,
  CustomerPrimitives,
} from '../../domain/models/Customer.model';
import { CustomerNotFoundException } from '../../domain/exceptions/CustomerNotFound.exception';

import { CustomerService } from './Customer.service';

import { CustomerStatus } from '../../../../shared/domain/CustomerStatus.enum';

@Injectable()
export class CustomerFinder {
  constructor(
    @Inject(CUSTOMER_SERVICE) private customerService: CustomerService,
  ) {}

  async execute(): Promise<CustomerPrimitives[] | CustomerNotFoundException> {
    const customers: Customer[] = await this.customerService.findAll();

    if (!customers || customers.length === 0) {
      return new CustomerNotFoundException(CustomerStatus.NOT_FOUND);
    }

    return customers.map((customer: Customer) => customer.toPrimitives());
  }
}
