export function getNowDate(splitWord: string) {
  const date = new Date();

  const YEAR = date.getFullYear();
  const MONTH = date.getMonth() + 1;
  const DATE = date.getDate();

  return `${YEAR}${splitWord}${MONTH < 10 ? `0${MONTH}` : MONTH}${splitWord}${
    DATE < 10 ? `0${DATE}` : DATE
  }`;
}
