import { request } from 'umi';
import type { DeptInfo } from './types';

// 部门树
export async function queryTreeData() {
  return request('/system/org/tree.json');
}
// 部门详情
export async function orgDetail(deptCode: string | number) {
  return request(`/system/org/detail.json?deptCode=${deptCode}`);
}

// 新增部门
export async function addDept(params: DeptInfo) {
  return request('/system/org/add.json', {
    method: 'post',
    data: params,
  });
}
// 编辑
export async function editDept(params: DeptInfo) {
  return request('/system/org/edit.json', {
    method: 'post',
    data: params,
  });
}
// 删除部门
export async function deleteDept(deptCode: string) {
  return request(`/system/org/remove.json?deptCode=${deptCode}`, {
    method: 'DELETE',
  });
}
