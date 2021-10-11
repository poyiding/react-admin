import { request } from 'umi';
import type { RoleListItem } from './types';

// 角色列表
export async function queryRoleList(params: { currPageNo: number; limit: number }) {
  return request('/system/role/page.json', {
    method: 'GET',
    params,
  });
}
// 查询
export async function queryRoleInfo(roleCode: string) {
  return request(`/system/role/detail.json?roleCode=${roleCode}`);
}
// 新增角色
export async function addRole(params: RoleListItem) {
  return request('/system/role/add.json', {
    method: 'post',
    data: params,
  });
}
// 编辑角色
export async function editRole(params: RoleListItem) {
  return request('/system/role/edit.json', {
    method: 'post',
    data: params,
  });
}
// 删除角色
export async function deleteRole(roleCode: string) {
  return request(`/system/role/remove.json?roleCode=${roleCode}`, {
    method: 'DELETE',
  });
}
