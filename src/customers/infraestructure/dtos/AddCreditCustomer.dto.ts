import { IsNumber, IsString } from 'class-validator';

export class AddCreditCustomerDTO {
  @IsString()
  readonly uuid: string;

  @IsNumber()
  availableCredit: number;
}
