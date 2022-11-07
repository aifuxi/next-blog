import request from '@/utils/request';
import { v1 } from '../constants/apiVersion';
import type { Post, FindManyPostReq, IListResponse, IResponse } from '../types';
import qs from 'qs';

export const POSTS = `${v1}/posts`;

export function getPost(id: string): Promise<IResponse<Post>> {
  return request.get(`${POSTS}/${id}`);
}

export function findManyPosts(
  data: FindManyPostReq
): Promise<IListResponse<Post[]>> {
  const query = qs.stringify(data);
  return request.get(`${POSTS}?${query}`);
}

export function postViewIncrement(id: string) {
  return request.patch(`${POSTS}/view_increment/${id}`);
}
