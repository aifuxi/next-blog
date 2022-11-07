import request from '@/utils/request';
import { v1 } from '../constants/apiVersion';
import type { IResponse, About } from '../types';

export const ABOUT = `${v1}/about`;

export function getAbout(): Promise<IResponse<About>> {
  return request.get(`${ABOUT}`);
}
