import React from 'react';
import { useModel } from 'umi';
import { Descriptions } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { UserListItem } from '../../UserManage/types';
import { queryUserList } from '../../UserManage/service';

const UserList: React.FC = () => {
  const { selectedNode, deptInfo } = useModel<any>('useDeptModel');

  const columns: ProColumns<UserListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'userName',
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      search: false,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      search: false,
    },
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '所属部门',
      search: false,
      render: (_, record) => {
        return (
          <span>
            {record.pDeptName} /{record.deptName}
          </span>
        );
      },
    },
    {
      title: '备注',
      search: false,
      ellipsis: true,
      dataIndex: 'description',
    },
  ];
  return (
    <>
      <Descriptions title="基本信息">
        <Descriptions.Item label="部门名称">{deptInfo.simpleName}</Descriptions.Item>
        <Descriptions.Item label="部门名称">{deptInfo.type}</Descriptions.Item>
      </Descriptions>
      <ProTable
        columns={columns}
        params={{
          pertainCode: selectedNode.nodeKey, // 一旦变化会触发重新请求
        }}
        request={async (params) => {
          const pertainCode = selectedNode.nodeKey;
          if (!pertainCode) {
            return {};
          }
          const { success, dataObject } = await queryUserList({
            pertainCode,
            currPageNo: params.current || 1,
            limit: params.pageSize || 20,
          });
          return {
            success,
            data: dataObject?.datas,
            total: dataObject?.total,
          };
        }}
        rowKey="userCode"
        search={false}
        options={{
          setting: false,
          density: false,
        }}
        headerTitle="用户列表"
      />
    </>
  );
};
export default UserList;
