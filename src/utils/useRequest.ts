/**
 * 统一封装 umijs/hooks请求，https://hooks.umijs.org/
 * @param {string | object | (...args)=> string|object } service
 * @param { object } options
 */

import { useRequest, request } from 'umi';

type RequestService = string | ({ url: string } & Record<string, any>);

type Service = RequestService | ((...args: any) => RequestService);

// https://github.com/alibaba/hooks/blob/master/packages/use-request/src/useRequest.ts
export default function HooksRequest(service: Service, options = {}): Record<string, any> {
  let promiseService = () => Promise.resolve();
  if (typeof service === 'string') {
    promiseService = () => request(service);
  } else if (typeof service === 'object') {
    const { url, ...rest } = service;
    promiseService = () => request(url, rest);
  } else {
    // typeof service === 'function'
    promiseService = (...args) =>
      new Promise((resolve) => {
        const result = service(...args);
        if (typeof result === 'string') {
          request(result).then((res) => {
            resolve(res);
          });
        } else if (typeof result === 'object') {
          const { url, ...rest } = result;
          request(url, rest).then((res) => {
            resolve(res);
          });
        }
      });
  }

  return useRequest(promiseService, {
    ...options,
    formatResult: (res: any) => res?.dataObject,
  });
}
