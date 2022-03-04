import type { StoreContextType } from '@/components/layout';
import { StoreContext } from '@/components/layout';
import { useContext } from 'react';
import request from '@/utils/request';
import { Modal, Form, Input } from 'antd';

const Register = () => {
  const [form] = Form.useForm();
  const { state, dispatch } = useContext<StoreContextType>(StoreContext);
  const handleCancel = () => {
    dispatch({ type: 'TOGGLE_REGISTER', data: !state.isShowRegisterModal });
  };
  const toLogin = () => {
    dispatch({ type: 'TOGGLE_REGISTER', data: false });
    dispatch({ type: 'TOGGLE_LOGIN', data: true });
  };
  const handleConfirm = async () => {
    const values = await form.validateFields();
    request('/api/register', { method: 'post', data: values }).then(({ data }) => {
      if (data.msg === 'success') {
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('token', data.token);
        // 保存登录数据
        dispatch({ type: 'TOGGLE_LOGINACOUNT', data: { isLogin: true, token: data.token } });
        // 关闭弹窗
        dispatch({ type: 'TOGGLE_REGISTER', data: !state.isShowRegisterModal });
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
    <Modal title="注册账号" cancelText="取消" okText="确定注册" visible={state.isShowRegisterModal} onOk={handleConfirm} onCancel={handleCancel}>
      <Form name="basic" form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} initialValues={{ remember: true }} autoComplete="off">
        <Form.Item label="账号" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="密码" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>
        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item> */}
        <p style={{ paddingLeft: '30px' }}>
          已有账号？
          <span style={{ color: '#f74a49', cursor: 'pointer' }} onClick={toLogin}>
            去登录
          </span>
        </p>
      </Form>
    </Modal>
  );
};

export default Register;
