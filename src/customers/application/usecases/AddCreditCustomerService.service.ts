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
export class AddCreditCustomerService {
  constructor(
    @Inject(CUSTOMER_SERVICE) private customerService: CustomerService,
  ) {}

  async execute({
    uuid,
    availableCredit,
  }: Partial<CustomerPrimitives>): Promise<
    CustomerPrimitives | CustomerNotFoundException
  > {
    const customer: Customer = await this.customerService.addCredit({
      uuid,
      availableCredit,
    });

    if (typeof customer === 'undefined') {
      return new CustomerNotFoundException(CustomerStatus.NOT_FOUND);
    }

    return customer.toPrimitives();
  }
}
