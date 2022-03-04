import React from 'react';
import type { StoreContextType } from '@/pages/app';
import { StoreContext } from '@/pages/app';
import { useContext } from 'react';
import { Modal, Form, Input } from 'antd';
import request from '@/utils/request';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { state, dispatch } = useContext<StoreContextType>(StoreContext);
  const handleCancel = () => {
    dispatch({ type: 'TOGGLE_LOGIN', data: !state.isShowLoginModal });
  };
  const toRegister = () => {
    dispatch({ type: 'TOGGLE_LOGIN', data: false });
    dispatch({ type: 'TOGGLE_REGISTER', data: true });
  };
  const handleConfirm = async () => {
    const values = await form.validateFields();
    request('/api/login', { method: 'post', data: values }).then(({ data }) => {
      if (data.msg === 'success') {
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('token', data.token);
        // 保存登录数据
        dispatch({ type: 'TOGGLE_LOGINACOUNT', data: { isLogin: true, token: data.token } });
        // 关闭弹窗
        dispatch({ type: 'TOGGLE_LOGIN', data: !state.isShowLoginModal });
      } else {
        Modal.error({
          title: '请求出错',
          okText: '确定',
          content: data.msg,
        });
      }
    });
  };
  return (
    <Modal title="登录" cancelText="取消" okText="登录" visible={state.isShowLoginModal} onOk={handleConfirm} onCancel={handleCancel}>
      <Form name="basic" form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} initialValues={{ remember: false }} autoComplete="off">
        <Form.Item label="账号" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password />
        </Form.Item>
        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item> */}
        <p style={{ paddingLeft: '30px' }}>
          没有账号？
          <span style={{ color: '#f74a49', cursor: 'pointer' }} onClick={toRegister}>
            去注册
          </span>
        </p>
      </Form>
    </Modal>
  );
};

export default Login;
