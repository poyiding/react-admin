import { request } from 'umi';
import type { SearchParams, DictInfoType, OptionList } from './types';

export async function queryDictList(params: Omit<SearchParams, 'parentKey'>) {
  return request('/system/dict/list.json', {
    method: 'GET',
    params,
  });
}

// 新增
export async function addDict(params: DictInfoType) {
  return request('/system/dict/add.json', {
    method: 'post',
    data: params,
  });
}
// 编辑提交,
export async function updateDict(params: DictInfoType) {
  return request('/system/dict/edit.json', {
    method: 'post',
    data: params,
  });
}
// 删除
export async function deleteDict(dictId?: number) {
  return request(`/system/dict/remove.json?dictId=${dictId}`, {
    method: 'DELETE',
  });
}

// 启用
export async function enableDict(dictId?: number) {
  return request(`/system/dict/enable.json?dictId=${dictId}`);
}
// 停用
export async function disableDict(dictId?: number) {
  return request(`/system/dict/disable.json?dictId=${dictId}`);
}

export async function queryOption(params: Omit<SearchParams, 'condition'>) {
  return request('/system/dict/list/detail.json', {
    method: 'GET',
    params,
  });
}

export async function addItem(params: { dictKey: string | number; itemList?: OptionList }) {
  return request('/system/dict/item.json', {
    method: 'post',
    data: params,
  });
}
