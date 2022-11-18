import type { PaginationReq } from './base';
import {
  IS_DELETED_ENUM,
  IS_PUBLISHED_ENUM,
  POST_SORT_BY_ENUM,
  POST_TYPE_ENUM,
  SORT_ORDER_ENUM,
} from './enum';
import type { PostCategory } from './postCategory';
import type { PostTag } from './postTag';

export interface CreatePostReq {
  title: string;
  description?: string;
  content: string;
  type: POST_TYPE_ENUM;
  categories?: string[];
  tags?: string[];
}

export type UpdatePostReq = Partial<
  CreatePostReq & {
    isDeleted: IS_DELETED_ENUM;
    isPublished?: IS_PUBLISHED_ENUM;
  }
>;

export interface Post {
  id: string;
  title: string;
  description?: string;
  content: string;
  view: number;
  type: POST_TYPE_ENUM;
  isDeleted: IS_DELETED_ENUM;
  isPublished: IS_PUBLISHED_ENUM;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  categories?: PostTag[];
  tags?: PostCategory[];
}

export interface FindManyPostReq extends PaginationReq {
  id?: string;
  title?: string;
  isPublished?: IS_PUBLISHED_ENUM;
  isDeleted?: IS_DELETED_ENUM;
  categories?: string[];
  tags?: string[];
  sortBy?: POST_SORT_BY_ENUM;
  order?: SORT_ORDER_ENUM;
}
