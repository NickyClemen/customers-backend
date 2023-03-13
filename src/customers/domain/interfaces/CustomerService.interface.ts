import { Customer, CustomerPrimitives } from '../models/Customer.model';

export const CUSTOMER_SERVICE = 'CUSTOMER SERVICE';

export interface CustomerServiceInterface {
  create(customer: CustomerPrimitives): Promise<Customer>;

  findAll(): Promise<Customer[]>;

  findBy(textSearch: Partial<CustomerPrimitives>): Promise<Customer[]>;

  addCredit({
    uuid,
    availableCredit,
  }: Partial<CustomerPrimitives>): Promise<Customer | undefined>;
}
