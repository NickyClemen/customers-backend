import { CustomerPrimitives } from '../models/Customer.model';

export const CUSTOMER_REPOSITORY = 'CUSTOMER REPOSITORY';

export interface CustomerRepository<T> {
  save(customer: Omit<CustomerPrimitives, 'uuid'>): Promise<T>;

  update(uuid, customer: Partial<CustomerPrimitives>): Promise<T>;

  findAll(): Promise<T[]>;

  findBy(textSearch: Partial<CustomerPrimitives>): Promise<T[]>;
}
