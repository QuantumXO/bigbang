export const setAll = (state: any, properties: any): void => {
  const props = Object.keys(properties);
  props.forEach(key => {
    state[key] = properties[key];
  });
};
