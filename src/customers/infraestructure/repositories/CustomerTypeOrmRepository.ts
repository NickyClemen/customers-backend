import { Injectable } from '@nestjs/common';

import { CustomerRepository } from '../../domain/interfaces/CustomerRepository.interface';
import { Customer, CustomerPrimitives } from "../../domain/models/Customer.model";

@Injectable()
export class CustomerTypeOrmRepository implements CustomerRepository {
  findAll(): Customer[] {
    return [] as Customer[];
  }

  addCredit({ uuid, availableCredit }: Partial<CustomerPrimitives>): Customer {
    return {} as Customer;
  }

  findById(uuid): Customer {
    return undefined as Customer;
  }
}
