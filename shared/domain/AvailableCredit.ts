import { ObjectValue } from './ObjectValue';

export class AvailableCredit extends ObjectValue<number> {
  sumValue(sumValue: number): void {
    this.value += sumValue;
  }
}
