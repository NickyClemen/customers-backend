import { IsString } from 'class-validator';

export class UuidDTO {
  @IsString()
  readonly uuid: string;
}
