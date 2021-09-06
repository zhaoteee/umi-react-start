export type OrderModelState = {
  list: OrderItemInfo[];
  current: number;
  total: number;
};
export type OrderItemInfo = {
  id: string;
  supplierName: string;
  sn: string;
  createDate: string;
  orderStatus: string;
  statusText: string;
  hasOperate: boolean;
  integralOrderItemDTOs: goodInfo[];
  shipDTOList: shipInfo[];
  totalAmount: number;
  address: string;
  receiverContactName: string;
  receiverContactPhone: string;
  payDate: string;
  shipDate: string;
  sellerRemark: string;
  receivableAmount: number;
  integralAmount: number;
  integral: number;
  rebateAmount: number;
  offlineAmount: number;
};
export type shipInfo = {
  shipStoreHouse: string;
  expressName: string;
  expressNo: string;
};
export type goodInfo = {
  id: string;
  images: string;
  title: string;
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
