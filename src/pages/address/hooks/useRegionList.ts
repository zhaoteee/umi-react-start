import { useEffect, useState } from 'react';
import { getRegionData } from '@/services/address';

type regionType = {
  id: string;
  fullname: string;
  name: string;
  children: regionType[];
};

type RegionListType = regionType[];
const useRegionList = () => {
  const [regionList, setRegionList] = useState<RegionListType>([]);
  useEffect(() => {
    getRegionData().then((res) => {
      setRegionList(res.data);
    });
  }, []);
  return regionList;
};

export default useRegionList;
