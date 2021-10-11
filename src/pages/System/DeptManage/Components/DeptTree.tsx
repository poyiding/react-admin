import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { Tree, Space, message, Popconfirm, Spin } from 'antd';
import AddDeptForm from './AddDeptModal';
import { deleteDept, queryTreeData, orgDetail } from '../service';
import type { DataNode } from '../types';

const DeptTree: React.FC = () => {
  const [treeData, setTreeData] = useState<DataNode>([]);
  const [visible, setVisible] = useState(false);
  const [treeLoading, setTreeLoading] = useState(false);
  const [handleType, setHandleType] = useState<string>();

  const { selectedNode, setSelectedNode, setDeptInfoData } = useModel<any>('useDeptModel');

  const fetchTreeData = async () => {
    setTreeLoading(true);
    const { dataObject } = await queryTreeData(); // 查询部门tree
    setTreeLoading(false);
    setTreeData(dataObject);
    return dataObject;
  };
  const fetchDeptInfo = async (deptKey: string | number) => {
    const res = await orgDetail(deptKey); // 部门基本信息
    setDeptInfoData(res.dataObject);
  };
  const initFetch = async () => {
    const treeList = await fetchTreeData();

    await fetchDeptInfo(treeList[0].key);
    // 设置当前选中节点
    setSelectedNode({
      nodeKey: treeList[0].key,
      nodeType: treeList[0].type,
    });
    // console.log(detailInfo);
  };

  useEffect(() => {
    initFetch();
  }, []);

  const onSelect = async (keys: React.Key[], { selectedNodes }: any) => {
    setSelectedNode({
      nodeKey: keys[0],
      nodeType: selectedNodes[0]?.type,
    });
    await fetchDeptInfo(keys[0]);
  };

  const handle = (type: string) => {
    if (!selectedNode.nodeKey) {
      message.error('请选择部门');
      return;
    }
    setHandleType(type);
    setVisible(true);
  };
  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Space style={{ marginBottom: 10 }}>
        <h3 style={{ marginRight: 20, marginBottom: 0 }}>部门</h3>
        <a onClick={() => handle('add')}>新增</a>
        <a onClick={() => handle('edit')}>编辑</a>
        <Popconfirm
          title="确定删除该部门吗？"
          onConfirm={async () => {
            const { success } = await deleteDept(selectedNode.nodeKey);
            if (success) {
              await initFetch();
            }
          }}
        >
          <a>删除</a>
        </Popconfirm>
      </Space>
      <Spin spinning={treeLoading}>
        {treeData?.length && (
          <Tree
            treeData={treeData}
            selectedKeys={[selectedNode.nodeKey]}
            onSelect={onSelect}
            defaultExpandAll
          />
        )}
      </Spin>
      <AddDeptForm
        handleType={handleType}
        visible={visible}
        onCancel={onCancel}
        onOk={async () => {
          onCancel();
          await fetchTreeData();
          await fetchDeptInfo(selectedNode.nodeKey);
        }}
      />
    </div>
  );
};

export default DeptTree;
