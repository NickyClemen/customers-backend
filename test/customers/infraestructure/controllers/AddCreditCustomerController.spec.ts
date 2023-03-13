import { HttpStatus } from '@nestjs/common';

import { apiClient } from '../../../jest.setup';

import { AddCreditCustomerController } from '../../../../src/customers/infraestructure/controllers/AddCreditCustomer.controller';
import { CustomerPrimitives } from '../../../../src/customers/domain/models/Customer.model';

import { DefaultCustomer, UndefinedCustomer } from '../../../shared/customers';

describe('AddCreditCustomerController', () => {
  it('add credit to undefined customer should return NOT_FOUND', async () => {
    const { status } = await apiClient.addCreditAvailable({
      uuid: UndefinedCustomer.uuid,
      availableCredit: 1000,
    } as CustomerPrimitives);

    expect(status).toBe(HttpStatus.NOT_FOUND);
  });

  it('add credit to customer', async () => {
    const { status, body } = await apiClient.addCreditAvailable({
      uuid: DefaultCustomer.uuid,
      availableCredit: 1000,
    } as CustomerPrimitives);

    expect(status).toBe(HttpStatus.OK);
    expect(body.availableCredit).toBe(DefaultCustomer.availableCredit + 1000);
  });
});
