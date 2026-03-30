import { IS_TEST, REST_PATH } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { useCallback, useContext, useState } from 'react';

type TUploadState = {
  status: string;
  url?: string;
  filename?: string;
  message?: string;
};

const useUpload = () => {
  const [context, setContext] = useContext(Context);
  const [state, setState] = useState<TUploadState>();
  const token = context[ActionType.User]?.token;

  const fetch = useCallback(
    async (formData: FormData) => {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
      let response: TUploadState;
      try {
        const apiRoot = (import.meta.env.VITE_API_PATH || './api').replace(/\/$/, '');
        const headers = new Headers();

        if (token) headers.set('Authorization', `Bearer ${token}`);

        const uploadResponse = await window.fetch(`${apiRoot}/${REST_PATH.upload}`, {
          method: 'POST',
          body: formData,
          headers,
        });

        response = (await uploadResponse.json()) as TUploadState;
      } catch {
        response = { status: 'error', message: '網路錯誤，請稍後再試' };
      }

      if (IS_TEST) console.log(response);

      setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
      setState(response);
    },
    [setContext, token],
  );
  return [state, fetch] as const;
};
export default useUpload;
