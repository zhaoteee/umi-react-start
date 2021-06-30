export function formatNum(num: number): string {
  let prefix: string = '';
  if (num < 0) {
    num *= -1;
    prefix = '-';
  }
  const DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g;
  const MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g;
  const str: string = num.toString().replace(DIGIT_PATTERN, (m) => m.replace(MILI_PATTERN, ','));
  return prefix + str;
}

export function toDecimal(val: number, pre = 2): string {
  const num = parseFloat(val.toString());
  if (Number.isNaN(num)) {
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

export const preFixPath = window.SYSTEM_CONFIG?.staticPath || 'https://dev-peppa.hzzcckj.cn';
