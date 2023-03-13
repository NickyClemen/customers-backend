import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Customer } from '../models/Customer.model';

@Entity()
export class CustomerEntity {
  @PrimaryColumn('uuid')
  readonly uuid: string;

  @Column({ default: 'UNKNOWN' })
  name: string;

  @Column({ default: 'UNKNOWN' })
  lastName: string;

  @Column({ default: 123456 })
  readonly accountNumber: number;

  @Column({ default: 0 })
  availableCredit: number;

  static toDomain(customerEntity: CustomerEntity) {
    return Customer.fromPrimitives({
      uuid: customerEntity.uuid,
      name: customerEntity.name,
      lastName: customerEntity.lastName,
      accountNumber: customerEntity.accountNumber,
      availableCredit: customerEntity.availableCredit,
    });
  }
}
