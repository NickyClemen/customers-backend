import { TestClient } from './api/TestServer';
import { ApiClient } from './api/ApiClient';

import { CUSTOMER_REPOSITORY } from '../src/customers/domain/interfaces/CustomerRepository.interface';
import { CUSTOMER_SERVICE } from '../src/customers/domain/interfaces/CustomerService.interface';

import { CustomerFinder } from '../src/customers/application/usecases/CustomerFinder.service';
import { AddCreditCustomerService } from '../src/customers/application/usecases/AddCreditCustomer.service';

import { ListAllCustomersController } from '../src/customers/infraestructure/controllers/ListAllCustomers.controller';
import { AddCreditCustomerController } from '../src/customers/infraestructure/controllers/AddCreditCustomer.controller';

import { CustomerMemoryRepository } from './customers/domain/repositories/CustomerMemoryRepository';
import { CustomerFakeService } from './customers/application/CustomerFake.service';

let client: TestClient;
export let apiClient: ApiClient;

beforeEach(async () => {
  const moduleRef = TestClient.moduleBuilder({
    controllers: [AddCreditCustomerController, ListAllCustomersController],
    providers: [
      {
        useClass: CustomerMemoryRepository,
        provide: CUSTOMER_REPOSITORY,
      },
      {
        useClass: CustomerFakeService,
        provide: CUSTOMER_SERVICE,
      },
      AddCreditCustomerService,
      CustomerFinder,
    ],
  });

  client = await TestClient.getTestClient(moduleRef);
  apiClient = new ApiClient(client);
});

afterEach(async () => await client.closeServer());
