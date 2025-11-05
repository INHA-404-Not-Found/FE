// YYYY-MM-DD
export const DateFormat = (originalDate) => {
  return !originalDate ? originalDate : originalDate.split("T")[0];
};
