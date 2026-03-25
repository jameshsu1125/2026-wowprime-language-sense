import { IS_TEST, REST_PATH } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import { useContext, useEffect, useState } from 'react';

type ResponseType = { status: string; user: { nickname: string; phone: string }; coupon: string };

const useStatus = () => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState<ResponseType>();
  const fetch = async () => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    let response;
    try {
      response = await Fetcher.get(REST_PATH.status);
    } catch {
      response = { status: 'error', user: { nickname: '', phone: '' }, coupon: '' };
    }

    if (IS_TEST) console.log(response);

    setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
    setState(response as ResponseType);
  };

  useEffect(() => {
    fetch();
  }, []);

  return [state, fetch] as const;
};
export default useStatus;
