import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from '../../../Config';
import { CustomerEntity } from '../../domain/entities/Customer.entity';

console.log(Config.host)
export class TypeOrmClientFactory {
  static createTypeOrmConection(domainFolder: string) {
    return [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5232,
        username: 'customer_admin',
        password: '7h>\\}aa/XP!<-Km',
        database: 'customers',
        entities: [domainFolder],
        synchronize: true,
      }),
      TypeOrmModule.forFeature([CustomerEntity]),
    ];
  }
}
