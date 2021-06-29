import { useMemo, useState } from 'react';

type Actions = {
  setTrue: () => void;
  setFalse: () => void;
  toggle: (value: boolean | undefined) => void;
};
const useBoolean = (initState?: boolean): [boolean, Actions] => {
  const [state, setState] = useState(initState || false);
  const actions: Actions = useMemo(() => {
    return {
      setTrue: () => setState(true),
      setFalse: () => setState(false),
      toggle: () => setState(!state),
    };
  }, [state]);
  return [state, actions];
};

export default useBoolean;
