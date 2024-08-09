export interface SetUpIntentProps {
  setupIntentClientSecret: string;
}

export type CardBrand = 'visa' | 'amex' | 'mastercard';

export interface CreditCardProps {
  brand: CardBrand;
  last4: string;
  type: string;
  funding: string;
  exp_month: string;
  exp_year: string;
}

export interface PaymentMethodProps {
  id: string;
  isSelected: boolean;
  card: CreditCardProps;
}
