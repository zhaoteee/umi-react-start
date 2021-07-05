export type productInfoExtDTOInfo = {
  description: string;
  id: string;
  productId: string;
  productImages: [{ resource: string; sort: number }];
};
export type productAttributeDTOs = [
  {
    attributeName: string;
    attributeValue: string;
    createDate: string;
  },
];
export type InfoItem = {
  brandId: string;
  brandName: string;
  categoryId: string;
  centerProductId: string;
  code: string;
  createDate: string;
  id: string;
  invoicePrice: string;
  marketPrice: number;
  salePrice: number;
  salesNum: number;
  stock: number;
  subTitle: string;
  supplierId: string;
  supplierShopName: string;
  title: string;
  unit: string;
  productInfoExtDTO: productInfoExtDTOInfo;
  productAttributeDTOs: productAttributeDTOs;
};

export type HomeQueryType = Location['query'] & { userToken?: string; origin?: string };
