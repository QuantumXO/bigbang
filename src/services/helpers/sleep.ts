export const sleep = (seconds: number): Promise<unknown> => {
  return new Promise(resolve => setTimeout(() => resolve(null), seconds * 1000));
};
