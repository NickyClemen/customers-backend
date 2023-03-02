import { IsNumber, IsString } from 'class-validator';

export class CustomerDto {
  @IsString()
  readonly uuid: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsNumber()
  accountNumber: number;

  @IsNumber()
  availableCredit: number;
}
