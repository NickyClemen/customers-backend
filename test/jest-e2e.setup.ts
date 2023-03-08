import { TestClient } from './api/TestServer';
import { ApiClient } from './api/ApiClient';

import { AppModule } from '../src/app.module';

let client: TestClient;
export let apiClient: ApiClient;
beforeAll(async () => {
  const moduleRef = TestClient.moduleBuilder({
    imports: [AppModule],
  });

  client = await TestClient.getTestClient(moduleRef);
  apiClient = new ApiClient(client);
});
