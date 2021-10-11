import { request } from 'umi';

export async function queryProdList(params: {
  pageNum: number;
  pageSize: number;
  planNo?: string;
}) {
  return request('/prod/list.json?handleType=LIST', {
    method: 'GET',
    params,
  });
}
