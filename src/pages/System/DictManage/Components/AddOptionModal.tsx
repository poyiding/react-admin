import React, { useState } from 'react';
import { Modal, Form, Input, message, Space, Button } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { addItem } from '../service';
import type { OptionModal, OptionList } from '../types';

const AddOption: React.FC<API.CreateModalForm & OptionModal> = ({
  visible,
  onCancel,
  onOk,
  parentKey,
}) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { optionList?: OptionList }) => {
    setLoading(true);
    await addItem({
      dictKey: parentKey,
      itemList: values.optionList,
    }).then((res) => {
      if (res.success) {
        onOk();
        message.success('提交成功', 1);
      }
    });
    setLoading(false);
  };

  return (
    <Modal
      title="添加配置项"
      visible={visible}
      onCancel={onCancel}
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
      afterClose={() => form.resetFields()}
      confirmLoading={loading}
      width={800}
    >
      <Form form={form}>
        <Form.List name="optionList">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    label="编号"
                    {...restField}
                    name={[name, 'dictKey']}
                    fieldKey={[fieldKey, 'dictKey']}
                    rules={[
                      { required: true, message: '请输入配置项编号' },
                      {
                        pattern: /^[^\u4e00-\u9fa5!@#$%^&*\s]+$/,
                        message: '不支持中文、空格、!@#$%^&*等字符',
                      },
                    ]}
                  >
                    <Input placeholder="请输入配置项编号" maxLength={60} />
                  </Form.Item>
                  <Form.Item
                    label="名称"
                    {...restField}
                    name={[name, 'dictName']}
                    fieldKey={[fieldKey, 'dictName']}
                    rules={[{ required: true, message: '请输入配置项名称' }]}
                  >
                    <Input placeholder="请输入配置项名称" maxLength={60} />
                  </Form.Item>
                  <Form.Item
                    label="属性"
                    {...restField}
                    name={[name, 'attr']}
                    fieldKey={[fieldKey, 'attr']}
                  >
                    <Input.TextArea maxLength={300} autoSize={{ maxRows: 4 }} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  添加配置项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default AddOption;
