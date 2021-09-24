import { toDecimal } from '@/utils/util';
import { CheckOutlined } from '@ant-design/icons';
import '../index.less';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useMemo } from 'react';

type ShippingListItemProps = {
  info: FreightTemplate;
  selectedTem: FreightTemplate | null;
  setSelectedTem: Dispatch<SetStateAction<FreightTemplate | null>>;
  freightName: string;
};
const ShippingListItem = (props: ShippingListItemProps) => {
  const {
    freightTemplateItem: { deliveryDescribe, id },
    freightRuleDesc,
  } = props.info;
  return (
    <div
      className={`w-80 h-32 p-2.5 mr-2.5 flex flex-col justify-between flex-shrink-0 border rounded cursor-pointer bg-white relative ${
        props.selectedTem?.freightTemplateItem.id === id ? 'border-red-500' : ''
      }`}
      onClick={() => props.setSelectedTem(props.info)}
    >
      <div>{props.freightName}</div>
      <div>配送描述：{deliveryDescribe}</div>
      <div>运费：{freightRuleDesc}</div>
      {props.selectedTem?.freightTemplateItem.id === id && (
        <div className="absolute bottom-0 right-0 checkBg">
          <CheckOutlined className="absolute -bottom-1 -right-5 text-white text-xs" />
        </div>
      )}
    </div>
  );
};

export type FreightTemplate = {
  freightRuleDesc: string;
  orderFreight: number;
  freightTemplateItem: {
    deliveryDescribe: string;
    freightTemplateId: string;
    freightType: 'FREIGHT' | 'FREIGHT_FREE';
    isDefault: boolean;
    id: string;
  };
};
export type FreightType = {
  freightName: string;
  freightTemplates: FreightTemplate[];
};

type ShippingListProps = {
  freightList?: FreightType;
  selectedTem: FreightTemplate | null;
  setSelectedTem: Dispatch<SetStateAction<FreightTemplate | null>>;
};
const ShippingList = (props: ShippingListProps) => {
  const { selectedTem, setSelectedTem } = props;
  const freightTemplates = useMemo(() => props.freightList?.freightTemplates ?? [], [props.freightList?.freightTemplates]);
  useEffect(() => {
    if (freightTemplates.length === 1) {
      setSelectedTem(freightTemplates[0]);
    } else {
      setSelectedTem(freightTemplates.find((item) => item.freightTemplateItem.isDefault) ?? null);
    }
  }, [freightTemplates, setSelectedTem]);
  console.log(selectedTem);
  return (
    <div>
      <div className="flex justify-between items-center p-2.5">
        <div className="font-bold">运费</div>
        {selectedTem?.orderFreight !== undefined && <div className="font-bold text-red-500">{`￥${toDecimal(selectedTem.orderFreight)}`}</div>}
      </div>
      <div className="flex items-center overflow-x-auto p-2.5 bg-gray-100 border rounded">
        {freightTemplates.map((item) => (
          <ShippingListItem info={item} key={item.freightTemplateItem.id} selectedTem={selectedTem} setSelectedTem={setSelectedTem} freightName={props.freightList?.freightName ?? ''} />
        ))}
      </div>
    </div>
  );
};

export default ShippingList;
