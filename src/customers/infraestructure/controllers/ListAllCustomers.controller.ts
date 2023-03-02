import { Controller, Get, HttpStatus, Inject, Res } from '@nestjs/common';

import { CustomerFinder } from '../../application/usecases/CustomerFinder.service';

import { CustomerDto } from '../dtos/Customer.dto';

import { StatusResponse } from '../../../../shared/infraestructure/api/StatusResponse.interface';
import { CustomerNotFoundException } from '../../domain/exceptions/CustomerNotFound.exception';
@Controller('customers')
export class ListAllCustomersController {
  constructor(@Inject(CustomerFinder) private customerFinder: CustomerFinder) {}
  @Get()
  execute(
    @Res() res: StatusResponse<CustomerDto[]>,
  ): StatusResponse<CustomerDto[]> {
    const customers: CustomerDto[] | CustomerNotFoundException =
      this.customerFinder.execute();

    if (customers instanceof CustomerNotFoundException) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: customers.getErrorMessage() });
    }

    return res.status(HttpStatus.OK).json(customers);
  }
}
