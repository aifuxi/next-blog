import request from '@/utils/request';
import { v1 } from '../constants/apiVersion';
import type { PostTag, FindManyPostTagReq, IListResponse } from '../types';
import qs from 'qs';

export const POST_TAGS = `${v1}/post_tags`;

export function findManyPostTag(
  data: FindManyPostTagReq
): Promise<IListResponse<PostTag[]>> {
  const query = qs.stringify(data);
  return request.get(`${POST_TAGS}?${query}`);
}
