import request from '@/utils/request';
import { API_VERSION_V1 } from '../constants/apiVersion';
import type { IResponse, Profile } from '../types';

export const PROFILE = `${API_VERSION_V1}/profile`;

export function getProfile(): Promise<IResponse<Profile>> {
  return request.get(`${PROFILE}`);
}
