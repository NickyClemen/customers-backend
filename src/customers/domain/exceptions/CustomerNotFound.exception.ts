import { BaseException } from '../../../../shared/domain/BaseException';

export class CustomerNotFoundException extends BaseException {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomerNotFoundException.prototype);
  }
}
