import type { StoreContextType } from '@/pages/app';
import { StoreContext } from '@/pages/app';
import { useContext } from 'react';
import { Modal } from 'antd';

const Logout = () => {
  const { state, dispatch } = useContext<StoreContextType>(StoreContext);
  const handleCancel = () => {
    dispatch({ type: 'TOGGLE_LOGOUT', data: !state.isShowLogoutModal });
  };
  const handleConfirm = async () => {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('token');
    // 保存登录数据
    dispatch({ type: 'TOGGLE_LOGINACOUNT', data: { isLogin: false, token: '' } });
    // 关闭弹窗
    dispatch({ type: 'TOGGLE_LOGOUT', data: !state.isShowLogoutModal });
  };
  return (
    <Modal title="退出登录" cancelText="取消" okText="确定" visible={state.isShowLogoutModal} onOk={handleConfirm} onCancel={handleCancel}>
      <p>确定退出登录吗？</p>
    </Modal>
  );
};

export default Logout;
