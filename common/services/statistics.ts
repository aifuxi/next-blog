import request from '@/utils/request';
import { v1 } from '../constants/apiVersion';
import type { IResponse, StatisticsCount } from '../types';

export const STATISTICS = `${v1}/statistics`;

export function getStatisticsCount(): Promise<IResponse<StatisticsCount>> {
  return request.get(`${STATISTICS}/count`);
}
