import request from '@/utils/request';
import { API_VERSION_V1 } from '../constants/apiVersion';
import type { IResponse, StatisticsCount } from '../types';

export const STATISTICS = `${API_VERSION_V1}/statistics`;

export function getStatisticsCount(): Promise<IResponse<StatisticsCount>> {
  return request.get(`${STATISTICS}/count`);
}
