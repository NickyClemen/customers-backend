import { Injectable, Inject } from '@nestjs/common';

import { Customer, CustomerPrimitives } from "../../domain/models/Customer.model";
import {
  CUSTOMER_REPOSITORY,
  CustomerRepository,
} from '../../domain/interfaces/CustomerRepository.interface';

import { CustomerServiceInterface } from '../../domain/interfaces/CustomerService.interface';

@Injectable()
export class CustomerService implements CustomerServiceInterface {
  constructor(
    @Inject(CUSTOMER_REPOSITORY) private customerRepository: CustomerRepository,
  ) {}

  findAll(): Customer[] {
    return this.customerRepository.findAll();
  }

  findById(uuid: string): Customer {
    return this.customerRepository.findById(uuid);
  }
  addCredit({ uuid, availableCredit }: Partial<CustomerPrimitives>): Customer {
    return this.customerRepository.addCredit({ uuid, availableCredit });
  }
}
