export const prettifySeconds = (seconds?: number, resolution?: string) => {
  if (seconds !== 0 && !seconds) {
    return "";
  }
  
  const d: number = Math.floor(seconds / (3600 * 24));
  const h: number = Math.floor((seconds % (3600 * 24)) / 3600);
  const m: number = Math.floor((seconds % 3600) / 60);
  
  if (resolution === "day") {
    return String(d) + (d == 1 ? " day" : " days");
  }
  
  const dDisplay = d > 0 ? String(d) + (d == 1 ? " day, " : " days, ") : "";
  const hDisplay = h > 0 ? String(h) + (h == 1 ? " Hour, " : " Hours, ") : "";
  const mDisplay = m > 0 ? String(m) + (m == 1 ? " Min" : " Mins") : "";
  
  return dDisplay + hDisplay + mDisplay;
};
