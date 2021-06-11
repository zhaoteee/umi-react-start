export function formatNum(num: number): string {
  let prefix: string = '';
  if (num < 0) {
    num *= -1;
    prefix = '-';
  }
  let DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g;
  let MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g;
  let str: string = num
    .toString()
    .replace(DIGIT_PATTERN, (m) => m.replace(MILI_PATTERN, ','));
  return prefix + str;
}

export function toDecimal(val: number, pre = 2): string {
  const num = parseFloat(val.toString());
  if (isNaN(num)) {
    return '';
  }
  const p = 10 ** pre;
  const value = num * p;
  let f = (Math.round(value) / p).toString();
  let rs = f.indexOf('.');
  if (rs < 0) {
    rs = f.length;
    f += '.';
  }
  while (f.length <= rs + pre) {
    f += '0';
  }
  return f;
}
