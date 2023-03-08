import { faker } from '@faker-js/faker';

import {
  Customer,
  CustomerPrimitives,
} from '../../../../src/customers/domain/models/Customer.model';

export class CustomerMother {
  public static create({
    uuid = faker.datatype.uuid(),
    name = faker.name.firstName(),
    lastName = faker.name.lastName(),
    accountNumber = Number(faker.finance.account()),
    availableCredit = Number(faker.finance.account()),
  }: Partial<CustomerPrimitives> = {}): Customer {
    return Customer.fromPrimitives({
      uuid,
      name,
      lastName,
      accountNumber,
      availableCredit,
    });
  }
  public static createRandomCustomers() {
    return Array(10)
      .fill(null)
      .map(() => CustomerMother.create());
  }
}
