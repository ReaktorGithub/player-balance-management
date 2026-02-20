import { KES_RATE } from './constants.ts';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formatMonthYear = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
};

export const convertUsdToKes = (value: string): number => {
  const parsed = parseFloat(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Unexpected value for ${parsed.toString()}`);
  }
  return parsed * KES_RATE;
};
