export function useNowDate() {
  const date = new Date();

  const YEAR = date.getFullYear();
  const MONTH = date.getMonth();
  const DATE = date.getDate();

  return `${YEAR}-${MONTH + 1}-${DATE}`;
}
