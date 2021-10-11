// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.UserInfoResult>('/system/user/info.json', {
    method: 'GET',
    ...(options || {}),
  });
}
