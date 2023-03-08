import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UuidV4 } from '../../../../shared/domain/UuidV4';
import { CustomerName } from '../../../../shared/domain/CustomerName';
import { CustomerLastName } from '../../../../shared/domain/CustomerLastName';
import { AccountNumber } from '../../../../shared/domain/AccountNumber';
import { AvailableCredit } from '../../../../shared/domain/AvailableCredit';

import { CustomerPrimitives } from '../models/Customer.model';

@Entity()
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly uuid!: string;

  @Column({ default: 'UNKNOWN' })
  name!: string;

  @Column({ default: 'UNKNOWN' })
  lastName!: string;

  @Column({ default: 0 })
  readonly accountNumber!: number;

  @Column({ default: 0 })
  availableCredit!: number;
  constructor({
    name,
    lastName,
    accountNumber,
    availableCredit,
  }: Omit<CustomerPrimitives, 'uuid'>) {
    this.name = name;
    this.lastName = lastName;
    this.accountNumber = accountNumber;
    this.availableCredit = availableCredit;
  }
}
