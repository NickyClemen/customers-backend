import { TestClient } from './api/TestServer';
import { ApiClient } from './api/ApiClient';

import { AddCreditCustomerController } from '../src/customers/infraestructure/controllers/AddCreditCustomer.controller';
import { CustomerMemoryRepository } from './customers/infraestructure/repositories/CustomerMemoryRepository';
import { CUSTOMER_REPOSITORY } from '../src/customers/domain/interfaces/CustomerRepository.interface';
import { CustomerService } from '../src/customers/application/usecases/Customer.service';
import { CUSTOMER_SERVICE } from '../src/customers/domain/interfaces/CustomerService.interface';
import { AddCreditCustomerService } from '../src/customers/application/usecases/AddCreditCustomerService.service';
import { ListAllCustomersController } from '../src/customers/infraestructure/controllers/ListAllCustomers.controller';
import { CustomerFinder } from '../src/customers/application/usecases/CustomerFinder.service';

let client: TestClient;
export let apiClient: ApiClient;

beforeAll(async () => {
  const moduleRef = TestClient.moduleBuilder({
    controllers: [AddCreditCustomerController, ListAllCustomersController],
    providers: [
      {
        useClass: CustomerMemoryRepository,
        provide: CUSTOMER_REPOSITORY,
      },
      {
        useClass: CustomerService,
        provide: CUSTOMER_SERVICE,
      },
      AddCreditCustomerService,
      CustomerFinder,
    ],
  });

  client = await TestClient.getTestClient(moduleRef);
  apiClient = new ApiClient(client);
});

afterAll(async () => await client.closeServer());
