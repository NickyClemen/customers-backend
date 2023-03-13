import { CustomerName } from '../../../../shared/domain/CustomerName';
import { CustomerLastName } from '../../../../shared/domain/CustomerLastName';
import { UuidV4 } from '../../../../shared/domain/UuidV4';
import { AccountNumber } from '../../../../shared/domain/AccountNumber';
import { AvailableCredit } from '../../../../shared/domain/AvailableCredit';

export type CustomerPrimitives = {
  readonly uuid: string;
  name: string;
  lastName: string;
  accountNumber: number;
  availableCredit: number;
};

export class Customer {
  private readonly uuid: UuidV4;
  private name: CustomerName;
  private lastName: CustomerLastName;
  private readonly accountNumber: AccountNumber;
  private availableCredit: AvailableCredit;

  constructor({
    uuid,
    name,
    lastName,
    accountNumber,
    availableCredit,
  }: CustomerPrimitives) {
    this.uuid = new UuidV4(uuid);
    this.name = new CustomerName(name);
    this.lastName = new CustomerLastName(lastName);
    this.accountNumber = new AccountNumber(accountNumber);
    this.availableCredit = new AvailableCredit(availableCredit);
  }

  static fromPrimitives({
    uuid,
    name,
    lastName,
    accountNumber,
    availableCredit,
  }: CustomerPrimitives): Customer {
    return new Customer({
      uuid,
      name,
      lastName,
      accountNumber,
      availableCredit,
    });
  }

  toPrimitives(): CustomerPrimitives {
    return {
      uuid: this.uuid.getValue(),
      name: this.name.getValue(),
      lastName: this.lastName.getValue(),
      accountNumber: this.accountNumber.getValue(),
      availableCredit: this.availableCredit.getValue(),
    };
  }

  addCredit(availableCredit): void {
    this.availableCredit.sumValue(availableCredit);
  }

  updateCustomer(customer: Omit<CustomerPrimitives, 'uuid'>): void {
    this.name.setValue(customer.name);
    this.lastName.setValue(customer.lastName);
    this.accountNumber.setValue(customer.accountNumber);
    this.availableCredit.sumValue(customer.availableCredit);
  }
}
