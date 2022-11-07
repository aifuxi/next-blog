import request from '@/utils/request';
import { v1 } from '../constants/apiVersion';
import type {
  FindManyPostCategoryReq,
  IListResponse,
  IResponse,
  PostCategoryWithPost,
  PostCategoryWithPostCount,
} from '../types';

import qs from 'qs';

export const POST_CATEGORIES = `${v1}/post_categories`;

export function findManyPostCategory(
  data: FindManyPostCategoryReq
): Promise<IListResponse<PostCategoryWithPostCount[]>> {
  const query = qs.stringify(data);
  return request.get(`${POST_CATEGORIES}?${query}`);
}

export function getPostCategory(
  id: string
): Promise<IResponse<PostCategoryWithPost>> {
  return request.get(`${POST_CATEGORIES}/${id}`);
}
