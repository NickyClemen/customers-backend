import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { INestApplication, ModuleMetadata } from '@nestjs/common';

import * as request from 'supertest';
export class TestClient {
  constructor(
    public readonly serverApplication: INestApplication,
    public readonly testingModule: TestingModule,
  ) {}
  static async getTestClient(
    moduleBuilder: Promise<TestingModuleBuilder>,
  ): Promise<TestClient> {
    return await TestClient.createTestClient(moduleBuilder);
  }
  private static async createTestClient(
    moduleBuilder: Promise<TestingModuleBuilder>,
  ): Promise<TestClient> {
    const moduleFixture: TestingModule = await (await moduleBuilder).compile();
    const app: INestApplication = moduleFixture.createNestApplication();

    await app.init();

    return new TestClient(app, moduleFixture);
  }
  static async moduleBuilder(
    metadata: ModuleMetadata,
  ): Promise<TestingModuleBuilder> {
    return Test.createTestingModule(metadata);
  }
  async closeServer(): Promise<void> {
    await this.serverApplication.close();
  }
}