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
  },
];
export type InfoItem = {
  brandId: string;
  brandName: string;
  id: string;
  invoicePrice: string;
  stock: number;
  supplierId: string;
  title: string;
  unit: string;
  primaryNum: string;
  productInfoExtDTO: productInfoExtDTOInfo;
  productAttributeDTOs: productAttributeDTOs;
};
