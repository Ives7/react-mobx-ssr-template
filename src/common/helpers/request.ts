import axios, { AxiosRequestConfig } from 'axios';
import { isSSR } from './env';
import { Request } from 'express';

type SSRConfigType = {
  request?: Request;
};

export const SSRConfig: SSRConfigType = {};

let baseURL = '/api';

let requestInterceptor: (
  config: AxiosRequestConfig,
) => Promise<AxiosRequestConfig>;
if (isSSR()) {
  requestInterceptor = (
    config: AxiosRequestConfig,
  ): Promise<AxiosRequestConfig> => {
    config.headers.cookie = SSRConfig.request.headers.cookie;
    return Promise.resolve(config);
  };
  baseURL = process.env.REQUEST_BASE_URL;
} else {
  requestInterceptor = (
    config: AxiosRequestConfig,
  ): Promise<AxiosRequestConfig> => {
    config.headers['TM-Header-Environment-Token'] = localStorage.getItem(
      'EnvironmentToken',
    );
    return Promise.resolve(config);
  };
}

export const $http = axios.create({
  baseURL,
});

axios.interceptors.request.use(requestInterceptor);
