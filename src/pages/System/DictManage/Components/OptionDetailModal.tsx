import React, { useRef } from 'react';
import { Modal, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import type { DictInfoType, OptionModal } from '../types';
import { queryOption, deleteDict } from '../service';

export default function OptionDetail({ visible, onCancel, parentKey }: OptionModal) {
  const ref = useRef<ActionType & { reloadAndRest: () => void }>();
  const columns: ProColumns<DictInfoType>[] = [
    { title: '字典编码', dataIndex: 'dictKey' },
    { title: '字典名称', dataIndex: 'dictName' },
    { title: '属性', dataIndex: 'attr', width: 300, ellipsis: true },
    {
      title: '操作',
      key: 'operation',
      width: 60,
      render: (text, record) => (
        <span>
          <Popconfirm
            title="您确定删除该字典?"
            onConfirm={async () => {
              await deleteDict(record.id).then((res) => res.success && ref.current?.reload());
            }}
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  return (
    <Modal title="配置项详情" visible={visible} onCancel={onCancel} width={800} footer={false}>
      <ProTable
        columns={columns}
        actionRef={ref}
        request={async (params) => {
          const { success, dataObject } = await queryOption({
            parentKey,
            currPageNo: params.current || 1,
            limit: params.pageSize || 20,
          });
          return {
            success,
            data: dataObject?.datas,
            total: dataObject?.total,
          };
        }}
        rowKey="dictKey"
        search={false}
        headerTitle="字典列表"
        toolBarRender={false}
      />
    </Modal>
  );
}
