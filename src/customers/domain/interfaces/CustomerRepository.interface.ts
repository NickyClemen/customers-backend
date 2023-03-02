import { Customer, CustomerPrimitives } from '../models/Customer.model';
export const CUSTOMER_REPOSITORY = 'CUSTOMER REPOSITORY';

export interface CustomerRepository {
  findAll(): Customer[];
  findById(uuid): Customer;

  addCredit({ uuid, availableCredit }: Partial<CustomerPrimitives>): Customer;
}
