import * as dotenv from 'dotenv';
import * as path from 'path';

import { DataSource, DataSourceOptions } from 'typeorm';
import {
  Customer,
  CustomerPrimitives,
} from '../../../src/customers/domain/models/Customer.model';
import { CustomerMother } from '../../../test/customers/domain/models/CustomerMother';
import { DefaultCustomer } from '../../../test/shared/customers';
import { CustomerEntity } from '../../../src/customers/domain/entities/Customer.entity';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const environtment = ['development', 'test'];
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DATABASE,
  entities: [
    path.join(
      __dirname,
      '../../../src/customers/domain/entities/*.entity{.ts,.js}',
    ),
  ],
  migrations: [
    path.join(
      __dirname,
      '../../../src/customers/infraestructure/database/migrations/*{.ts,.js}',
    ),
  ],
  synchronize: environtment.includes(process.env.NODE_ENV) ? true : false,
};

const dataSource: DataSource = new DataSource(dataSourceOptions);

export async function initDatabase() {
  const customers: CustomerPrimitives[] = [
    CustomerMother.create(DefaultCustomer),
    ...CustomerMother.createRandomCustomers(),
  ].map((customer: Customer) => customer.toPrimitives());

  await dataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });

  await dataSource
    .createQueryBuilder()
    .insert()
    .into(CustomerEntity)
    .values(customers)
    .execute();
}

export default dataSource;
