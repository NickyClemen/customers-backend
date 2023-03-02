import { Customer, CustomerPrimitives } from "../models/Customer.model";
import { CustomerNotFoundException } from '../exceptions/CustomerNotFound.exception';

export const CUSTOMER_SERVICE = 'CUSTOMER SERVICE';

export interface CustomerServiceInterface {
  findAll(): Customer[];
  addCredit({ uuid, availableCredit }: Partial<CustomerPrimitives>): Customer;
}
