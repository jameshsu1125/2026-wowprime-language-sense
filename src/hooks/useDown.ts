import { REST_PATH } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { toBase64 } from 'lesca-atobtoa';
import Fetcher from 'lesca-fetcher';
import { useContext, useState } from 'react';

type TResponse = {
  status: string;
  data: {
    currentScore: number;
    bestScore: number;
    coupon: string;
  };
  message?: string;
};

const useDown = () => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState<TResponse>();
  const fetch = async (data: { score: number }) => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    let response;
    try {
      response = await Fetcher.post(REST_PATH.down, { payload: toBase64(data) });
    } catch {
      response = {
        status: 'error',
        data: { currentScore: 0, bestScore: 0, coupon: '' },
        message: '網路異常，請稍後再試',
      };
    }

    setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
    setState(response as TResponse);
  };
  return [state, fetch] as const;
};
export default useDown;
