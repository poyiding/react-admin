/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Tree, message, Button } from 'antd';
import useRequest from '@/utils/useRequest';
import { addRole, editRole } from '../service';
import type { RoleListItem } from '../types';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

// 将角色树父级的key打标
const flatParentKeys = (menus: string[], item: Record<string, string | boolean>) => {
  menus.forEach((ele: any) => {
    if (ele.children) {
      item[ele.key] = true;
      flatParentKeys(ele.children, item);
    } else {
      item[ele.key] = false;
    }
  });
  return item;
};
const AddRoleForm: React.FC<
  API.CreateModalForm & { roleInfo: Record<string, any>; handleType: string }
> = ({ visible, onCancel, onOk, roleInfo, handleType }) => {
  const [form] = Form.useForm();
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && roleInfo.roleCode) {
      form.setFieldsValue(roleInfo);
      // 子级节点如果没全选，角色的编辑和查看父级节点不应选中，由于角色和权限码是同一套，而权限需要返回父级节点code,所以这里需要过滤
      const flatKeyObj = flatParentKeys(roleInfo.menus, {});
      const filterCheckedKeys = roleInfo.menuCodes.filter((item: string) => !flatKeyObj[item]);

      setCheckedKeys(filterCheckedKeys);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const { data: treeData } = useRequest('/system/menu/list/tree.json');

  const isDetail = handleType === 'detail';
  const onCheck: any = (checkedKeysValue: React.Key[]) => {
    if (!isDetail) {
      setCheckedKeys(checkedKeysValue);
    }
  };

  const handleSubmit = async (values: RoleListItem) => {
    if (checkedKeys.length < 1) {
      message.error('请选择权限配置');
      return;
    }
    setLoading(true);
    const submit = roleInfo.roleCode
      ? editRole({ ...values, menuCodes: checkedKeys, roleCode: roleInfo.roleCode })
      : addRole({ ...values, menuCodes: checkedKeys });
    const { success } = await submit;
    if (success) {
      const resetPageIndex = !roleInfo.roleCode;
      onOk(resetPageIndex);
      message.success('提交成功');
    }
    setLoading(false);
  };
  let title = '新增角色';
  if (handleType === 'edit') {
    title = '编辑角色';
  } else if (handleType === 'detail') {
    title = '查看详情';
  }

  return (
    <Modal
      title={title}
      visible={visible}
      afterClose={() => {
        form.resetFields();
        setCheckedKeys([]);
      }}
      onCancel={onCancel}
      footer={
        handleType === 'detail'
          ? null
          : [
              <Button key="back" onClick={onCancel}>
                取消
              </Button>,
              <Button
                type="primary"
                key="submit"
                loading={loading}
                onClick={() => {
                  form
                    .validateFields()
                    .then((values) => {
                      handleSubmit(values);
                    })
                    .catch((info) => {
                      console.log('Validate Failed:', info);
                    });
                }}
              >
                提交
              </Button>,
            ]
      }
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item
          name="roleName"
          label="角色名称"
          rules={[{ required: true, message: '请输入角色名称' }]}
          getValueFromEvent={(e) => e.target.value.trim()}
        >
          {isDetail ? <span className="ant-form-text">{roleInfo.roleName}</span> : <Input />}
        </Form.Item>
        <Form.Item name="description" label="备注">
          {isDetail ? (
            <span className="ant-form-text">{roleInfo.description}</span>
          ) : (
            <Input.TextArea rows={2} maxLength={60} />
          )}
        </Form.Item>
        <Form.Item name="menuCodes" label="权限配置" required>
          <Tree
            checkable
            defaultExpandAll
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={treeData}
            height={400}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRoleForm;
