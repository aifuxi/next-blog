import type { PaginationReq } from './base';
import type { PostCategory } from './postCategory';
import type { PostTag } from './postTag';
import type { PostSortByEnum, SortOrderEnum } from './sort-enum';

export interface CreatePostReq {
  title: string;
  description?: string;
  content: string;
  categories?: string[];
  tags?: string[];
}

export type UpdatePostReq = Partial<
  CreatePostReq & { isDeleted: boolean; isPublished?: boolean }
>;

export interface Post {
  id: string;
  title: string;
  description?: string;
  content: string;
  view: number;
  isDeleted: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  categories?: PostTag[];
  tags?: PostCategory[];
}

export interface FindManyPostReq extends PaginationReq {
  id?: string;
  title?: string;
  isPublished?: boolean;
  isDeleted?: boolean;
  categories?: string[];
  tags?: string[];
  sortBy?: PostSortByEnum;
  order?: SortOrderEnum;
}
