import { useState } from 'react';

type State<T> = {
  error: Error | null;
  data: T | null;
  status: 'idle' | 'loading' | 'error' | 'success';
};

const defaultInitialState: State<null> = {
  status: 'idle',
  data: null,
  error: null,
};

const useAsync = <T>(initialState?: State<T>) => {
  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState,
  });
  const [retry, setRetry] = useState(() => () => {});

  const setData = (data: T) => {
    setState({
      status: 'success',
      data,
      error: null,
    });
  };

  const setError = (error: Error) => {
    setState({
      status: 'error',
      data: null,
      error,
    });
  };

  const run = (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
    if (!promise || !promise.then) {
      throw new Error('请传入promise类型数据');
    }
    setState({
      status: 'loading',
      data: null,
      error: null,
    });
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};

export default useAsync;
