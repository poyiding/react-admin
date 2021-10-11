import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Space, Menu, Dropdown, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import UserAddForm from './Components/AddUserFormModal';
import {
  queryUserList,
  deleteUser,
  enableUser,
  disableUser,
  queryUserInfo,
  restPassword,
} from './service';
import type { UserListItem } from './types';

const UserList: React.FC = () => {
  const ref = useRef<ActionType & { reloadAndRest: () => void }>();
  const [visible, setVisible] = useState(false);
  const [selectUser, setSelectUser] = useState<Record<string, any>>({});
  const reload = (messageText: string) => {
    ref.current?.reload();
    message.success(messageText);
  };

  const handleOperation = (key: string | number, userCode: string, status: string) => {
    if (key === 'del') {
      deleteUser(userCode).then((res) => res.success && reload('删除成功'));
    } else if (key === 'resetPwd') {
      restPassword(userCode).then((res) => res.success && reload('重置成功'));
    } else if (key === 'disable') {
      disableUser(userCode, status).then((res) => res.success && reload('停用成功'));
    } else if (key === 'enable') {
      enableUser(userCode, status).then((res) => res.success && reload('启用成功'));
    }
  };
  const onEdit = async (userCode: string) => {
    const { success, dataObject } = await queryUserInfo(userCode);
    if (success) {
      setSelectUser(dataObject);
    }
    setVisible(true);
  };
  const onCancel = () => {
    setVisible(false);
    setSelectUser({});
  };
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
    {
      title: '操作',
      // valueType: 'option',
      width: '164px',
      render: (text, record: Record<string, any>) => {
        const menu = (
          <Menu onClick={(item) => handleOperation(item.key, record.userCode, record.status)}>
            <Menu.Item key="del">删除</Menu.Item>
            {record.status === '1' && <Menu.Item key="disable">停用</Menu.Item>}
            {record.status === '2' && <Menu.Item key="enable">启用</Menu.Item>}
            <Menu.Item key="resetPwd">重置密码</Menu.Item>
          </Menu>
        );
        return (
          <Space>
            <a key="edit" onClick={() => onEdit(record.userCode)}>
              编辑
            </a>
            <a key="dataAuth">数据权限</a>
            <Dropdown overlay={menu}>
              <EllipsisOutlined style={{ color: '#1890ff' }} />
            </Dropdown>
          </Space>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={ref}
        request={async (params) => {
          const { success, dataObject } = await queryUserList({
            account: params.account,
            phone: params.phone,
            userName: params.userName,
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
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: false,
          density: false,
        }}
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            新增用户
          </Button>,
        ]}
      />
      <UserAddForm
        visible={visible}
        onCancel={onCancel}
        onOk={(resetPageIndex) => {
          if (resetPageIndex) {
            ref.current?.reloadAndRest();
          } else {
            ref.current?.reload();
          }
          onCancel();
        }}
        userInfo={selectUser}
      />
    </PageContainer>
  );
};
export default UserList;
