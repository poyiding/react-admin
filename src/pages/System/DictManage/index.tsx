/* eslint-disable no-case-declarations */
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Space, Menu, Dropdown, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import AddDictForm from './Components/AddDictModal';
import OptionDetail from './Components/OptionDetailModal';
import AddOption from './Components/AddOptionModal';
import { queryDictList, deleteDict, enableDict, disableDict } from './service';
import type { DictInfoType } from './types';

const DictList: React.FC = () => {
  const ref = useRef<ActionType & { reloadAndRest: () => void }>();
  const [visible, setVisible] = useState(false);
  const [showOptionDetail, setShowOptionDetail] = useState(false);
  const [showAddOption, setShowAddOption] = useState(false);
  const [selectedDict, setSelectedDict] = useState<Record<string, string | number>>({});
  const reload = (messageText: string) => {
    ref.current?.reload();
    message.success(messageText);
  };

  const handleOperation = async (key: string | number, record: DictInfoType) => {
    switch (key) {
      case 'edit':
        setVisible(true);
        setSelectedDict(record);
        break;
      case 'del':
        await deleteDict(record.id).then((res) => res.success && reload('删除成功'));
        break;
      case 'disable':
        await disableDict(record.id).then((res) => res.success && reload('停用成功'));
        break;
      case 'enable':
        await enableDict(record.id).then((res) => res.success && reload('启用成功'));
        break;
      default:
    }
  };

  const onCancel = () => {
    setVisible(false);
    setShowOptionDetail(false);
    setShowAddOption(false);
    setSelectedDict({});
  };
  const columns: ProColumns<DictInfoType>[] = [
    {
      title: '字典编码',
      dataIndex: 'dictKey',
      search: false,
    },
    {
      title: '字典名称',
      dataIndex: 'dictName',
    },
    {
      title: '属性',
      dataIndex: 'attr',
      search: false,
      ellipsis: true,
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
      width: '200px',
      render: (text, record) => {
        const menu = (
          <Menu onClick={(item) => handleOperation(item.key, record)}>
            <Menu.Item key="edit">编辑</Menu.Item>
            <Menu.Item key="del">删除</Menu.Item>
            {record.validStatus === 1 && <Menu.Item key="disable">停用</Menu.Item>}
            {record.validStatus === 2 && <Menu.Item key="enable">启用</Menu.Item>}
          </Menu>
        );
        return (
          <Space>
            <a
              key="detail"
              onClick={() => {
                setShowOptionDetail(true);
                setSelectedDict(record);
              }}
            >
              查看配置项
            </a>
            <a
              key="add"
              onClick={() => {
                setShowAddOption(true);
                setSelectedDict(record);
              }}
            >
              添加配置项
            </a>
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
          const { success, dataObject } = await queryDictList({
            condition: params.dictName,
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
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: false,
          density: false,
        }}
        headerTitle="字典列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            新增字典
          </Button>,
        ]}
      />
      <AddDictForm
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
        dictInfo={selectedDict}
      />
      {showOptionDetail && (
        <OptionDetail
          visible={showOptionDetail}
          onCancel={onCancel}
          parentKey={selectedDict.dictKey}
        />
      )}
      <AddOption
        parentKey={selectedDict.dictKey}
        visible={showAddOption}
        onCancel={onCancel}
        onOk={() => {
          ref.current?.reload();
          onCancel();
        }}
      />
    </PageContainer>
  );
};
export default DictList;
