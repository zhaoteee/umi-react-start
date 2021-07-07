export type OrderModelState = {
  list: OrderItemInfo[];
  current: number;
  total: number;
};
export type OrderItemInfo = {
  id: number;
  supplierName: string;
  sn: string;
  createDate: string;
  orderStatus: string;
  statusText: string;
  hasOperate: boolean;
  integralOrderItemDTOs: goodInfo[];
};
export type goodInfo = {
  id: number;
  images: string;
  brandName: string;
  price: number;
  quantity: number;
  totalAmount: number;
};
export const statusMap = {
  PART_PAY: '部分付款',
  WAIT_PAY: '待付款',
  SHIPED: '已发货',
  WAIT_CONFIRM: '待确认',
  CANCELED: '已关闭',
  WAIT_SHIP: '待发货',
  PART_SHIP: '部分发货',
};
