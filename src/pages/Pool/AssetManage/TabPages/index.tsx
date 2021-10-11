import React from 'react';
import { Descriptions } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';

type PAGE_NAME_UPPER_CAMEL_CASEProps = {
  match: {
    url: string;
    path: string;
    params: { planId: string };
  };
  location: {
    pathname: string;
  };
};

const TabPageLayout: React.FC<PAGE_NAME_UPPER_CAMEL_CASEProps> = (props) => {
  const { planId } = props.match.params;

  const tabList = [
    {
      key: 'capitalFlow',
      tab: '资金流水',
    },
    {
      key: 'astList',
      tab: '资产列表',
    },
  ];
  const handleTabChange = (key: string) => {
    history.push(`/pool/assetManage/${planId}/${key}`);
  };

  const info = (
    <Descriptions column={3} title="项目信息">
      <Descriptions.Item label="项目编号">plan_23242424</Descriptions.Item>
      <Descriptions.Item label="项目名称">计划xxxx</Descriptions.Item>
      <Descriptions.Item label="创建日期">2021-04-01</Descriptions.Item>
    </Descriptions>
  );
  return (
    <PageContainer
      content={info}
      tabList={tabList}
      // eslint-disable-next-line no-restricted-globals
      tabActiveKey={location.pathname.replace(`/pool/assetManage/${planId}/`, '')}
      onTabChange={handleTabChange}
    >
      {props.children}
    </PageContainer>
  );
};

export default TabPageLayout;
