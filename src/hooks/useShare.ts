import { IS_TEST, REST_PATH } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import { useContext, useState } from 'react';

type ResponseType = { status: string; shareUrl: string };
type ShareParam = {
  title: string;
  description: string;
  imageUrl: string;
};

const useShare = () => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState<ResponseType>();
  const fetch = async (data: ShareParam) => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    let response;
    try {
      response = await Fetcher.post<ResponseType>(REST_PATH.share, data);
    } catch {
      response = { status: 'error', shareUrl: '' };
    }

    if (IS_TEST) console.log(response);

    setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
    setState(response as ResponseType);
  };

  return [state, fetch] as const;
};
export default useShare;
