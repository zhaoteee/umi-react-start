import request from '@/utils/request';

export type infoType = { distributorName: string };
export type FenleiType = { id: number; name: string }[];
export type BaseResType = {
  code: number;
  msg: string;
  classification: FenleiType;
  color: FenleiType;
  tag: FenleiType;
};

export async function queryPhaseStatus(): Promise<any> {
  return request('/common/decoration/phase_status');
}
