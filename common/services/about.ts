import request from '@/utils/request';
import { API_VERSION_V1 } from '../constants/apiVersion';
import type { IResponse, About } from '../types';

export const ABOUT = `${API_VERSION_V1}/about`;

export function getAbout(): Promise<IResponse<About>> {
  return request.get(`${ABOUT}`);
}
