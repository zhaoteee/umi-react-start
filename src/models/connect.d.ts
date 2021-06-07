import { CartModelState } from './cart';

export { CartModelState };

export type ConnectState = {
  cart: CartModelState;
};

export type Route = {
  routes?: Route[];
}
