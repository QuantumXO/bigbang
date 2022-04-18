import fromExponential from 'from-exponential';

export const trim = (number: number = 0, precision?: number): string => {
  const array = fromExponential(number).split('.');
  if (array.length === 1) return fromExponential(number);
  //@ts-ignore
  array.push(array.pop().substring(0, precision));
  return array.join('.');
};
