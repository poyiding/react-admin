import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import AddRoleForm from './Components/AddRoleModal';
import { queryRoleList, deleteRole, queryRoleInfo } from './service';
import type { RoleListItem } from './types';

const RoleList: React.FC = () => {
  const ref = useRef<ActionType & { reloadAndRest: () => void }>();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('add');
  const [selectRole, setSelectRole] = useState<Record<string, any>>({});
  const reload = (messageText: string) => {
    ref.current?.reload();
    message.success(messageText);
  };

  const onEdit = async (roleCode: string, handleType: string) => {
    const { success, dataObject } = await queryRoleInfo(roleCode);
    if (success) {
      setSelectRole(dataObject);
    }
    setVisible(true);
    setType(handleType);
  };

  const onCancel = () => {
    setVisible(false);
    setSelectRole({});
  };

  const handleDelete = async (roleCode: string) => {
    const { success } = await deleteRole(roleCode);
    if (success) {
      reload('删除成功');
    }
  };

  const columns: ProColumns<RoleListItem>[] = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },

    {
      title: '备注',
      search: false,
      ellipsis: true,
      dataIndex: 'description',
    },
    {
      title: '操作',
      valueType: 'option',
      // width: '164px',
      render: (text, record: Record<string, any>) => [
        <a key="editable" onClick={() => onEdit(record.roleCode, 'edit')}>
          编辑
        </a>,
        <Popconfirm
          title="您确定删除该角色?"
          key="delete"
          onConfirm={() => handleDelete(record.roleCode)}
        >
          <a>删除</a>
        </Popconfirm>,
        <a key="detail" onClick={() => onEdit(record.roleCode, 'detail')}>
          查看
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={ref}
        search={false}
        request={async ({ current = 1, pageSize = 20 }) => {
          const { success, dataObject } = await queryRoleList({
            currPageNo: current,
            limit: pageSize,
          });
          return {
            success,
            data: dataObject?.datas,
            total: dataObject?.total,
          };
        }}
        rowKey="roleCode"
        options={{
          setting: false,
          density: false,
        }}
        headerTitle="角色列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setVisible(true);
              setType('add');
            }}
          >
            新增角色
          </Button>,
        ]}
      />
      <AddRoleForm
        visible={visible}
        onCancel={onCancel}
        handleType={type}
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onOk={(resetPageIndex) => {
          if (resetPageIndex) {
            ref.current?.reloadAndRest();
          } else {
            ref.current?.reload();
          }
          onCancel();
        }}
        roleInfo={selectRole}
      />
    </PageContainer>
  );
};
export default RoleList;
