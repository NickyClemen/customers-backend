import { Injectable, Inject } from '@nestjs/common';

import { Customer, CustomerPrimitives } from "../../domain/models/Customer.model";
import {
  CUSTOMER_REPOSITORY,
  CustomerRepository,
} from '../../domain/interfaces/CustomerRepository.interface';

import { CustomerServiceInterface } from '../../domain/interfaces/CustomerService.interface';
import { CustomerEntity } from '../../domain/entities/Customer.entity';

@Injectable()
export class CustomerService implements CustomerServiceInterface {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private customerRepository: CustomerRepository<CustomerEntity>,
  ) {}

  async create(customer: CustomerPrimitives): Promise<Customer> {
    const newCustomer: CustomerEntity = await this.customerRepository.save(
      customer,
    );

    return Customer.fromPrimitives({
      uuid: newCustomer.uuid,
      name: newCustomer.name,
      lastName: newCustomer.lastName,
      accountNumber: newCustomer.accountNumber,
      availableCredit: newCustomer.availableCredit,
    });
  }

  async findAll(): Promise<Customer[]> {
    const customers: CustomerEntity[] = await this.customerRepository.findAll();

    return customers.map((customer: CustomerEntity) =>
      Customer.fromPrimitives({
        uuid: customer.uuid,
        name: customer.name,
        lastName: customer.lastName,
        accountNumber: customer.accountNumber,
        availableCredit: customer.availableCredit,
      }),
    );
  }
  async findById(uuid: string): Promise<Customer[]> {
    const customers: CustomerEntity[] = await this.customerRepository.findBy({
      uuid,
    });

    return customers.map((customer: CustomerEntity) =>
      Customer.fromPrimitives({
        uuid: customer.uuid,
        name: customer.name,
        lastName: customer.lastName,
        accountNumber: customer.accountNumber,
        availableCredit: customer.availableCredit,
      }),
    );
  }
  async addCredit({
    uuid,
    availableCredit,
  }: Partial<CustomerPrimitives>): Promise<Customer> {
    const updatedCustomer: CustomerEntity =
      await this.customerRepository.update(uuid, { availableCredit });

    console.log(updatedCustomer)

    return Customer.fromPrimitives({
      uuid: updatedCustomer.uuid,
      name: updatedCustomer.name,
      lastName: updatedCustomer.lastName,
      accountNumber: updatedCustomer.accountNumber,
      availableCredit: updatedCustomer.availableCredit,
    });
  }
}
