import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Row, Col, TreeSelect, message } from 'antd';
import { BaseSelect } from 'chili-lib';
import useRequest from '@/utils/useRequest';
import { addUser, updateUser } from '../service';
import type { UserListItem } from '../types';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const colSpan = 12;
const UserAddForm: React.FC<API.CreateModalForm & { userInfo: Record<string, any> }> = ({
  visible,
  onCancel,
  onOk,
  userInfo,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (visible && userInfo.userCode) {
      form.setFieldsValue(userInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);
  const { data: deptData } = useRequest('/system/org/tree/select.json');
  const { data: roleData } = useRequest('/system/role/tree.json');

  const handleSubmit = async (values: UserListItem) => {
    setLoading(true);
    const submit = userInfo.userCode
      ? updateUser({ ...values, userCode: userInfo.userCode })
      : addUser(values);
    const { success } = await submit;
    if (success) {
      const resetPageIndex = !userInfo.userCode;
      onOk(resetPageIndex);
      message.success('提交成功');
    }
    setLoading(false);
  };

  return (
    <Modal
      title={userInfo.userCode ? '编辑用户' : '新增用户'}
      visible={visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            handleSubmit(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={onCancel}
      width={800}
      confirmLoading={loading}
      afterClose={() => form.resetFields()}
    >
      <Form {...formItemLayout} form={form}>
        <Row gutter={20}>
          <Col span={colSpan}>
            <Form.Item
              name="account"
              label="账号"
              rules={[{ required: true, message: '请输入账号' }]}
              getValueFromEvent={(e) => e.target.value.trim()}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              name="userName"
              label="姓名"
              rules={[{ required: true, message: '请输入姓名' }]}
              getValueFromEvent={(e) => e.target.value.trim()}
            >
              <Input />
            </Form.Item>
          </Col>
          {!userInfo.userCode && (
            <>
              <Col span={colSpan}>
                <Form.Item
                  name="password"
                  label="密码"
                  help="密码须包含大小写字母、数字和至少8位数"
                  rules={[{ required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,}$/ }]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col span={colSpan}>
                <Form.Item
                  name="confirmPassword"
                  label="确认密码"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: '请输入确认密码',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('输入的两个密码不一致!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </>
          )}
          <Col span={colSpan}>
            <Form.Item
              name="pertainCode"
              label="部门"
              rules={[{ required: true, message: '请选择部门' }]}
            >
              <TreeSelect
                dropdownStyle={{ maxHeight: 380, overflow: 'auto' }}
                treeData={deptData}
                treeDefaultExpandAll
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              name="roleCodes"
              label="角色"
              rules={[{ required: true, message: '请选择角色' }]}
            >
              <BaseSelect
                data={roleData}
                dataFormat={{ key: 'value', value: 'label' }}
                mode="multiple"
                optionFilterProp="children"
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item name="phone" label="手机号">
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[{ type: 'email', message: '请输入正确格式的邮箱' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item name="description" label="备注">
              <Input.TextArea rows={2} maxLength={60} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserAddForm;
