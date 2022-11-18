import type { PaginationReq } from './base';
import { IS_DELETED_ENUM, SORT_BY_ENUM, SORT_ORDER_ENUM } from './enum';
import { Post } from './post';

export interface CreatePostTagReq {
  name: string;
  description?: string;
}

export type UpdatePostTagReq = Partial<
  CreatePostTagReq & { isDeleted?: IS_DELETED_ENUM }
>;

export interface PostTag {
  id: string;
  name: string;
  description?: string;
  isDeleted: IS_DELETED_ENUM;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PostTagWithPostCount = PostTag & {
  posts: number;
};

export type PostTagWithPost = PostTag & {
  posts: Post[];
};

export interface FindManyPostTagReq extends PaginationReq {
  id?: string;
  name?: string;
  isDeleted?: IS_DELETED_ENUM;
  sortBy?: SORT_BY_ENUM;
  order?: SORT_ORDER_ENUM;
}
