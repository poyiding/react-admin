import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { addDict, updateDict } from '../service';
import type { DictInfoType } from '../types';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const AddDictForm: React.FC<API.CreateModalForm & { dictInfo: DictInfoType }> = ({
  visible,
  onCancel,
  onOk,
  dictInfo,
}) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && dictInfo.dictKey) {
      form.setFieldsValue(dictInfo);
    }
  }, [visible]);

  const handleSubmit = async (values: DictInfoType) => {
    setLoading(true);
    const submit = dictInfo.dictKey
      ? updateDict({ ...values, dictId: dictInfo.id })
      : addDict(values);

    const { success } = await submit;
    if (success) {
      const resetPageIndex: boolean = !dictInfo.dictKey;
      onOk(resetPageIndex);
      onOk();
      message.success('提交成功');
    }
    setLoading(false);
  };

  return (
    <Modal
      title={dictInfo.dictKey ? '编辑字典' : '新增字典'}
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
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item
          name="dictKey"
          label="字典编号"
          rules={[
            { required: true, message: '请输入字典编号' },
            {
              pattern: /^[^\u4e00-\u9fa5!@#$%^&*\s]+$/,
              message: '不支持中文、空格、!@#$%^&*等字符',
            },
          ]}
          getValueFromEvent={(e) => e.target.value.trim()}
        >
          <Input maxLength={60} />
        </Form.Item>
        <Form.Item
          name="dictName"
          label="字典名称"
          rules={[{ required: true, message: '请输入字典名称' }]}
        >
          <Input maxLength={60} />
        </Form.Item>
        <Form.Item name="attr" label="属性">
          <Input.TextArea maxLength={60} autoSize={{ minRows: 2, maxRows: 4 }} />
        </Form.Item>
        <Form.Item name="description" label="备注">
          <Input.TextArea maxLength={60} autoSize={{ minRows: 2, maxRows: 4 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDictForm;
