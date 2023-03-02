import { CustomerPrimitives } from '../../src/customers/domain/models/Customer.model';

export const DefaultCustomer: CustomerPrimitives = {
  uuid: '47aea7e1-d9da-45ae-b94e-f3a8f966daa4',
  name: 'María',
  lastName: 'Gonzalez',
  accountNumber: 123456,
  availableCredit: 0,
};

export const UndefinedCustomer: CustomerPrimitives = {
  uuid: 'ea68e1cd-ebf1-4c8d-a3bd-3ff62da484e9',
  name: 'Pedro',
  lastName: 'García',
  accountNumber: 67891,
  availableCredit: 120,
};
