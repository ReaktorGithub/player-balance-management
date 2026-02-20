export const validateBalance = (value: number): string => {
  const fixed = value.toFixed(2);
  return `${fixed}`;
};
