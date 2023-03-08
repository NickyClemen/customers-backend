import {
  Put,
  Param,
  HttpStatus,
  Inject,
  Res,
  Controller,
  Body,
} from '@nestjs/common';

import { StatusResponse } from '../../../../shared/infraestructure/api/StatusResponse.interface';
import { UuidDTO } from '../dtos/Uuid.dto';
import { AddCreditCustomerDTO } from '../dtos/AddCreditCustomer.dto';
import { AddCreditCustomerService } from '../../application/usecases/AddCreditCustomerService.service';
import { CustomerNotFoundException } from '../../domain/exceptions/CustomerNotFound.exception';

import { CustomerPrimitives } from '../../domain/models/Customer.model';
import { CustomerDto } from '../dtos/Customer.dto';

@Controller('customers')
export class AddCreditCustomerController {
  constructor(
    @Inject(AddCreditCustomerService)
    private addCreditCustomer: AddCreditCustomerService,
  ) {}
  @Put('add-credit/:uuid')
  async execute(
    @Param() { uuid }: UuidDTO,
    @Body() { availableCredit }: AddCreditCustomerDTO,
    @Res() res: StatusResponse<HttpStatus.OK>,
  ): Promise<StatusResponse<CustomerDto | HttpStatus.NOT_FOUND>> {
    const customer: CustomerPrimitives | CustomerNotFoundException =
      await this.addCreditCustomer.execute({
        uuid,
        availableCredit,
      });

    if (customer instanceof CustomerNotFoundException) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: customer.getErrorMessage() });
    }

    return res.status(HttpStatus.OK).json(customer);
  }
}
