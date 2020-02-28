import { Amortization } from './amortization';
import { Loan } from './loan';

export class LoanWithAmortizations extends Loan {
  amortizations: Amortization[];
}
