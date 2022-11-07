import type { PaginationReq } from './base';
import { Post } from './post';
import type { SortByEnum, SortOrderEnum } from './sort-enum';

export interface CreatePostCategoryReq {
  name: string;
  description?: string;
}

export type UpdatePostCategoryReq = Partial<
  CreatePostCategoryReq & { isDeleted?: boolean }
>;

export interface PostCategory {
  id: string;
  name: string;
  description?: string;
  isDeleted: boolean;
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
  isDeleted?: boolean;
  sortBy?: SortByEnum;
  order?: SortOrderEnum;
}
