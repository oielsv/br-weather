export enum CurrencyCodeEnum {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
  JPY = 'JPY',
  CZK = 'CZK',
}

export type Currency = {
  code: CurrencyCodeEnum;
  name: string;
  symbol: string;
};

export const currencies: Record<CurrencyCodeEnum, Currency> = {
  [CurrencyCodeEnum.EUR]: {
    code: CurrencyCodeEnum.EUR,
    name: 'Euro',
    symbol: '€',
  },
  [CurrencyCodeEnum.USD]: {
    code: CurrencyCodeEnum.USD,
    name: 'United States Dollar',
    symbol: '$',
  },
  [CurrencyCodeEnum.GBP]: {
    code: CurrencyCodeEnum.GBP,
    name: 'British Pound',
    symbol: '£',
  },
  [CurrencyCodeEnum.JPY]: {
    code: CurrencyCodeEnum.JPY,
    name: 'Japanese Yen',
    symbol: '¥',
  },
  [CurrencyCodeEnum.CZK]: {
    code: CurrencyCodeEnum.CZK,
    name: 'Czech Koruna',
    symbol: 'Kč',
  },
};

export type CurrencyCode = keyof typeof currencies;
