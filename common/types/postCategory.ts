import type { PaginationReq } from './base';
import { IS_DELETED_ENUM, SORT_BY_ENUM, SORT_ORDER_ENUM } from './enum';
import { Post } from './post';

export interface CreatePostCategoryReq {
  name: string;
  description?: string;
}

export type UpdatePostCategoryReq = Partial<
  CreatePostCategoryReq & { isDeleted?: IS_DELETED_ENUM }
>;

export interface PostCategory {
  id: string;
  name: string;
  description?: string;
  isDeleted: IS_DELETED_ENUM;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PostCategoryWithPostCount = PostCategory & {
  posts: number;
};

export type PostCategoryWithPost = PostCategory & {
  posts: Post[];
};

export interface FindManyPostCategoryReq extends PaginationReq {
  id?: string;
  name?: string;
  isDeleted?: IS_DELETED_ENUM;
  sortBy?: SORT_BY_ENUM;
  order?: SORT_ORDER_ENUM;
}
