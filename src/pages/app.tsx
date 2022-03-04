import React, { useReducer } from 'react';

export type InitValueType = {
  isLogin: boolean;
  token: string;
  isShowLoginModal: boolean;
  isShowRegisterModal: boolean;
  isShowLogoutModal: boolean;
  showSearch: boolean;
};
export type ActionType = {
  type: string;
  data: any;
};

const initValue: InitValueType = {
  isLogin: Boolean(localStorage.getItem('isLogin')),
  token: localStorage.getItem('token') || '',
  isShowLoginModal: false,
  isShowRegisterModal: false,
  isShowLogoutModal: false,
  showSearch: false,
};
export type StoreContextType = {
  state: InitValueType;
  dispatch: (params: { type: string; data: any }) => void;
};
export const StoreContext = React.createContext<StoreContextType>({ state: initValue, dispatch: () => {} });

function reducer(state: InitValueType, action: ActionType) {
  switch (action.type) {
    case 'TOGGLE_LOGIN': // 登录弹窗
      return {
        ...state,
        isShowLoginModal: action.data,
      };
    case 'TOGGLE_REGISTER': // 注册弹窗
      return {
        ...state,
        isShowRegisterModal: action.data,
      };
    case 'TOGGLE_LOGOUT': // 退出弹窗
      return {
        ...state,
        isShowLogoutModal: action.data,
      };
    case 'TOGGLE_SHOWSEARCH': // 更多搜索显示
      return {
        ...state,
        showSearch: action.data,
      };
    case 'TOGGLE_LOGINACOUNT': // 登录接口
      return {
        ...state,
        isLogin: action.data.isLogin,
        token: action.data.token,
      };
    default:
      return initValue;
  }
}

const MyApp: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initValue);
  const { children } = props;
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export default MyApp;
