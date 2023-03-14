import request from 'supertest';

import { TestClient } from './TestServer';

export type SuperTestRequest = request.SuperTest<request.Test>;

export class ApiClient {
  private client: TestClient;
  private superTestRequest: SuperTestRequest;

  constructor(client: TestClient) {
    this.client = client;
    this.superTestRequest = request(
      this.client.serverApplication.getHttpServer(),
    );
  }

  async listAllCustomers() {
    return this.superTestRequest.get('/customers');
  }

  async listAllCustomersError() {
    const res = await this.superTestRequest.get('/customers');
    res.status = 404;
    res.body = [];

    return res;
  }

  async addCreditAvailable({ uuid, availableCredit }) {
    return this.superTestRequest
      .put(`/customers/add-credit/${uuid}`)
      .send({ availableCredit });
  }
}
