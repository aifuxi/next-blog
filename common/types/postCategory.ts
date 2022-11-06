import type { PaginationReq } from './base';
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

export interface FindManyPostCategoryReq extends PaginationReq {
  id?: string;
  name?: string;
  isDeleted?: boolean;
  sortBy?: SortByEnum;
  order?: SortOrderEnum;
}
