import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CustomerPrimitives } from '../models/Customer.model';
import { CustomerRepository } from '../interfaces/CustomerRepository.interface';
import { CustomerEntity } from '../entities/Customer.entity';

@Injectable()
export class CustomerMikroOrmRepository
  implements CustomerRepository<CustomerEntity>
{
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}
  async findAll(): Promise<CustomerEntity[]> {
    return await this.customerRepository.find();
  }
  async save(
    customer: Omit<CustomerPrimitives, 'uuid'>,
  ): Promise<CustomerEntity> {
    return await this.customerRepository.save(customer);
  }
  async update(
    uuid,
    customer: Partial<CustomerPrimitives>,
  ): Promise<CustomerEntity> {
    return await this.customerRepository.save({
      uuid,
      ...customer,
    });
  }
  async findBy(
    textSearch: Partial<CustomerPrimitives>,
  ): Promise<CustomerEntity[]> {
    return await this.customerRepository.find({
      where: textSearch,
    });
  }
}
