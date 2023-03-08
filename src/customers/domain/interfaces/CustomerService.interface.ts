import { Customer, CustomerPrimitives } from "../models/Customer.model";
import { CustomerNotFoundException } from '../exceptions/CustomerNotFound.exception';

export const CUSTOMER_SERVICE = 'CUSTOMER SERVICE';

export interface CustomerServiceInterface {
  create(customer: CustomerPrimitives): Promise<Customer>;
  findAll(): Promise<Customer[]>;
  findById(uuid: string): Promise<Customer[]>;
  addCredit({
    uuid,
    availableCredit,
  }: Partial<CustomerPrimitives>): Promise<Customer>;
}
