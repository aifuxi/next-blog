import request from '@/utils/request';
import { v1 } from '../constants/apiVersion';
import type {
  FindManyPostTagReq,
  IListResponse,
  PostTagWithPost,
  IResponse,
  PostTagWithPostCount,
} from '../types';
import qs from 'qs';

export const POST_TAGS = `${v1}/post_tags`;

export function findManyPostTag(
  data: FindManyPostTagReq
): Promise<IListResponse<PostTagWithPostCount[]>> {
  const query = qs.stringify(data);
  return request.get(`${POST_TAGS}?${query}`);
}

export function getPostTag(id: string): Promise<IResponse<PostTagWithPost>> {
  return request.get(`${POST_TAGS}/${id}`);
}
