import request from '@/utils/request';
import { v1 } from '../constants/apiVersion';
import type {
  PostCategory,
  FindManyPostCategoryReq,
  IListResponse,
} from '../types';

import qs from 'qs';

export const POST_CATEGORIES = `${v1}/post_categories`;

export function findManyPostCategory(
  data: FindManyPostCategoryReq
): Promise<IListResponse<PostCategory[]>> {
  const query = qs.stringify(data);
  return request.get(`${POST_CATEGORIES}?${query}`);
}
