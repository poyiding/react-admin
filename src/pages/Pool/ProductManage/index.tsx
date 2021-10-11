import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { Link } from 'umi';
import { queryProdList } from './service';
import type { ProdListItem } from './data';

const columns: ProColumns<ProdListItem>[] = [
  {
    title: '产品名称',
    dataIndex: 'prodName',
  },
  {
    title: '产品编码',
    dataIndex: 'prodCode',
  },
  {
    title: '资产服务机构',
    dataIndex: 'managerOrgName',
    search: false,
  },
  {
    title: '审批状态',
    dataIndex: 'approveStatus',
    search: false,
  },
  {
    title: '操作',
    width: 180,
    search: false,
    render: (text, record) => <Link to={`/pool/product/${record.abssqrProdCode}`}>查看</Link>,
  },
];
const ProductList: React.FC = () => {
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        // actionRef={actionRef}
        request={async (params) => {
          const { success, dataObject } = await queryProdList({
            planNo: params.planNo,
            pageNum: params.current || 1,
            pageSize: params.pageSize || 20,
          });
          return {
            success,
            data: dataObject?.datas,
            total: dataObject?.total,
          };
        }}
        rowKey="prodCode"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: false,
          density: false,
        }}
        headerTitle="产品列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              // setVisible(true);
            }}
          >
            新增产品
          </Button>,
        ]}
      />
    </PageContainer>
  );
};
export default ProductList;
