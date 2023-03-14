import { Controller, Get, HttpStatus, Inject, Res } from '@nestjs/common';

import { CustomerFinder } from '../../application/usecases/CustomerFinder.service';

import { CustomerDto } from '../dtos/Customer.dto';

import { StatusResponse } from '../../../../shared/infraestructure/api/StatusResponse.interface';
import { CustomerNotFoundException } from '../../domain/exceptions/CustomerNotFound.exception';
import { SortedByAvailableCreditResponse } from '../../../../shared/infraestructure/api/SortedByAvailableCreditResponse';

@Controller('customers')
export class ListAllCustomersController {
  constructor(@Inject(CustomerFinder) private customerFinder: CustomerFinder) {}

  @Get()
  async execute(
    @Res() res: StatusResponse<CustomerDto[]>,
  ): Promise<StatusResponse<CustomerDto[]>> {
    const customers:
      | SortedByAvailableCreditResponse
      | CustomerNotFoundException = await this.customerFinder.execute();

    if (customers instanceof CustomerNotFoundException) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: customers.getErrorMessage() });
    }

    return res.status(HttpStatus.OK).json(customers.execute());
  }
}
