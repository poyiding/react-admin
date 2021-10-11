import React from 'react';
import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { Link } from 'umi';

const ProductList: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        资产管理
        <Link to="/pool/assetManage/24355/capitalFlow">查看</Link>
      </Card>
    </PageContainer>
  );
};
export default ProductList;
