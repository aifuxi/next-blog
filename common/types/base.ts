import { CodeEnum } from './enum';

export interface IResponse<T> {
  code: CodeEnum;
  message: string;
  data?: T;
}

export interface IListResponse<T> {
  code: CodeEnum;
  message: string;
  data: {
    lists?: T;
    total: number;
  };
}

export interface PaginationReq {
  limit?: number;
  offset?: number;
}
