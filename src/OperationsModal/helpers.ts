const KES_RATE = 129;

export const convertUsdToKes = (value: string): bigint => {
  const [intPart, fracPart = ''] = value.split('.');
  const cents = BigInt(intPart) * 100n + BigInt((fracPart + '00').slice(0, 2));
  return cents * BigInt(KES_RATE);
};
