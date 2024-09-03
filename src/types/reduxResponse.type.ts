/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryApi } from "@reduxjs/toolkit/query";

type TErrorSource = { path: string; message: string };

export type TError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    stack?: string;
    errorSources: TErrorSource[];
  };
};
export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TSuccess = {
  success: boolean;
  message: string;
  data: any;
};

export type TResponseMetaData<T> = {
  success: boolean;
  message: string;
  data: {
    data: T;
    meta: TMeta;
  };
};

export type TResponseData<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type TReduxReponse<T> = TResponseMetaData<T> & BaseQueryApi;
export type TReduxReponseWithoutMeta<T> = TResponseData<T> & BaseQueryApi;
export type TSpecificReduxResponse<T> = BaseQueryApi & T;
