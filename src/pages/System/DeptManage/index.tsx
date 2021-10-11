import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import DeptTree from './Components/DeptTree';
import UserTable from './Components/UserTable';

const DeptManage: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Card.Grid style={{ width: '25%', padding: 12 }} hoverable={false}>
          <DeptTree />
        </Card.Grid>
        <Card.Grid style={{ width: '75%', padding: 12 }} hoverable={false}>
          <UserTable />
        </Card.Grid>
      </Card>
    </PageContainer>
  );
};

export default DeptManage;
