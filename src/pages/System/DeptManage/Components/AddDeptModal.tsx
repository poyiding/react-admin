import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { Modal, Form, Input, message } from 'antd';
import useRequest from '@/utils/useRequest';
import { addDept, editDept } from '../service';
import type { DeptInfo } from '../types';
import { BaseSelect } from 'chili-lib';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const AddDeptForm: React.FC<API.CreateModalForm & { handleType: string | undefined }> = ({
  visible,
  onCancel,
  onOk,
  handleType,
}) => {
  const [form] = Form.useForm();
  const { selectedNode, deptInfo } = useModel<any>('useDeptModel');
  const [loading, setLoading] = useState(false);

  const { data: orgLevelList } = useRequest(
    `/system/dict/select/orgLevel.json?type=${selectedNode.nodeType}`,
    {
      refreshDeps: [selectedNode.nodeType],
    },
  );

  useEffect(() => {
    if (visible && handleType === 'edit') {
      form.setFieldsValue({
        simpleName: deptInfo.simpleName,
        type: deptInfo.typeCode,
      });
    }
    if (handleType === 'add') {
      form.resetFields();
    }
  }, [visible]);

  const handleSubmit = async (values: DeptInfo) => {
    setLoading(true);
    const submit =
      handleType === 'add'
        ? addDept({
            ...values,
            pcode: selectedNode.nodeKey,
          })
        : editDept({
            ...values,
            code: selectedNode.nodeKey,
          });

    const { success } = await submit;
    if (success) {
      onOk();
      message.success('提交成功');
    }
    setLoading(false);
  };

  return (
    <Modal
      title={handleType === 'add' ? '新增部门' : '编辑部门'}
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
      confirmLoading={loading}
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item
          name="simpleName"
          label="部门名称"
          rules={[{ required: true, message: '请输入部门名称' }]}
          getValueFromEvent={(e) => e.target.value.trim()}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label="部门性质"
          rules={[{ required: true, message: '请选择部门性质' }]}
        >
          <BaseSelect
            disabled={handleType === 'edit'}
            data={orgLevelList}
            dataFormat={{ key: 'dictKey', value: 'dictName' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDeptForm;
