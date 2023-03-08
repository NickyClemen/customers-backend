export class Config {
  static readonly host: string = process.env.HOST;
  static readonly port: number = Number(process.env.PORT);
  static readonly username: string = process.env.POSTGRES_USER;
  static readonly password: string = process.env.POSTGRES_PASSWORD;
  static readonly database: string = process.env.DATABASE;
}
