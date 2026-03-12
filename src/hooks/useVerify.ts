import { REST_PATH } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import { useContext, useState } from 'react';

const useVerify = () => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState<{ status: string; message: string; token?: string }>();
  const fetch = async (data: { nickname: string; phone: string; otp: string }) => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    let response;
    try {
      response = await Fetcher.post(REST_PATH.verify, data);
    } catch (error) {
      console.log(error);
      response = { status: 'error', message: '網路錯誤，請稍後再試' };
    }
    console.log(response);
    setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
    setState(response as { status: string; message: string; token?: string });
  };
  return [state, fetch] as const;
};
export default useVerify;
