import { request } from 'umi';
import type { SearchParams, UserListItem } from './types';

// 用户列表
export async function queryUserList(params: SearchParams) {
  return request('/system/user/page.json', {
    method: 'GET',
    params,
  });
}
// 查询用户
export async function queryUserInfo(useCode: string) {
  return request(`/system/user/detail.json?userCode=${useCode}`);
}
// 添加用户
export async function addUser(params: UserListItem) {
  return request('/system/user/add.json', {
    method: 'post',
    data: params,
  });
}
// 删除用户
export async function deleteUser(userCode: string) {
  return request(`/system/user/remove.json?userCode=${userCode}`, {
    method: 'DELETE',
  });
}
// 启用
export async function enableUser(userCode: string, status: string) {
  return request(`/system/user/enable.json?userCode=${userCode}&status=${status}`);
}
// 停用
export async function disableUser(userCode: string, status: string) {
  return request(`/system/user/disable.json?userCode=${userCode}&status=${status}`);
}

// 重置密码
export async function restPassword(userCode: string) {
  return request(`/system/user/reset.json?userCode=${userCode}`);
}

// 编辑提交,
export async function updateUser(params: UserListItem) {
  return request('/system/user/edit.json', { method: 'post', data: params });
}
