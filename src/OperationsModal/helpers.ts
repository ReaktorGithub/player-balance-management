import { KES_RATE } from '../constants.ts';

export const convertUsdToKes = (value: string): number => {
  const parsed = parseFloat(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Unexpected value for ${parsed.toString()}`);
  }
  return parsed * KES_RATE;
};
