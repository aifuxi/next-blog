import { TEN_THOUSAND, THOUSAND } from '@/common/constants/numbers';
import { isUndefined } from 'lodash-es';

/**
 * 0 ~ 9999 =>  xxx
 * 1000 ~ 9999 => xx.x k
 * 10000 ~ 99999 => xx.x w
 * 暂不考虑上亿的情况
 * @param num
 * @returns
 */
export function formatNumber(num?: number): string | number {
  if (isUndefined(num)) {
    return '-';
  }

  if (num >= THOUSAND && num < TEN_THOUSAND) {
    return parseInt(`${num / THOUSAND}`).toFixed(1) + 'k';
  }

  if (num >= TEN_THOUSAND) {
    return parseInt(`${num / TEN_THOUSAND}`).toFixed(1) + 'w';
  }

  return num;
}
