import { HttpStatus } from '@nestjs/common';

import { apiClient } from '../../../jest.setup';

import { Customer } from '../../../../src/customers/domain/models/Customer.model';

describe('ListAllCustomersController', () => {
  it('list all customers', async () => {
    const { body, status } = await apiClient.listAllCustomers();

    expect(status).toBe(HttpStatus.OK);

    expect(body).toBeDefined();
    expect(body.length).toBeGreaterThan(0);
    expect(body).toBe(
      body.sort(
        (a: Customer, b: Customer) =>
          a.toPrimitives().availableCredit - b.toPrimitives().availableCredit,
      ),
    );
  });

  it('customers not list', async () => {
    const { status } = await apiClient.listAllCustomers();

    expect(status).toBe(HttpStatus.NOT_FOUND);
  });
});
