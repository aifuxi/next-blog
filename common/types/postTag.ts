import type { PaginationReq } from './base';
import { Post } from './post';
import type { SortByEnum, SortOrderEnum } from './sort-enum';

export interface CreatePostTagReq {
  name: string;
  description?: string;
}

export type UpdatePostTagReq = Partial<
  CreatePostTagReq & { isDeleted?: boolean }
>;

export interface PostTag {
  id: string;
  name: string;
  description?: string;
  isDeleted: boolean;
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
  isDeleted?: boolean;
  sortBy?: SortByEnum;
  order?: SortOrderEnum;
}
