import { Inject, Injectable } from '@nestjs/common';

import { CUSTOMER_SERVICE } from '../../domain/interfaces/CustomerService.interface';

import {
  Customer,
  CustomerPrimitives,
} from '../../domain/models/Customer.model';
import { CustomerNotFoundException } from '../../domain/exceptions/CustomerNotFound.exception';

import { CustomerService } from './Customer.service';

@Injectable()
export class AddCreditCustomerService {
  constructor(
    @Inject(CUSTOMER_SERVICE) private customerService: CustomerService,
  ) {}

  execute({
    uuid,
    availableCredit,
  }: Partial<CustomerPrimitives>):
    | CustomerPrimitives
    | CustomerNotFoundException {
    const customer: Customer = this.customerService.addCredit({
      uuid,
      availableCredit,
    });

    if (typeof customer === 'undefined') {
      return new CustomerNotFoundException('customer not found or not exists');
    }

    return customer.toPrimitives();
  }
}
