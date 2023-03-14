import { HttpStatus } from '@nestjs/common';

import { apiClient } from '../../../jest.setup';

import { CustomerPrimitives } from '../../../../src/customers/domain/models/Customer.model';
import { ListAllCustomersController } from '../../../../src/customers/infraestructure/controllers/ListAllCustomers.controller';

describe('ListAllCustomersController', () => {
  it('list all customers', async () => {
    const { body, status } = await apiClient.listAllCustomers();

    expect(status).toBe(HttpStatus.OK);

    expect(body).toBeDefined();
    expect(body.length).toBeGreaterThan(0);
    expect(body).toBe(
      body.sort(
        (a: CustomerPrimitives, b: CustomerPrimitives) =>
          a.availableCredit - b.availableCredit,
      ),
    );
  });

  it('customers not list', async () => {
    const { status } = await apiClient.listAllCustomersError();

    expect(status).toBe(HttpStatus.NOT_FOUND);
  });
});
