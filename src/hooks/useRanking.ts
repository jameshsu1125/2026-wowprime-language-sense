import { REST_PATH } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import { useContext, useState } from 'react';

type TWeekResponse = {
  status: string;
  currentWeek: string;
  availableWeeks: string[];
};

type TRankingResponse = {
  ranking: {
    nickname: string;
    phone: string;
    ranking: string;
    score: string;
  }[];
  status: string;
  selectedWeek: string;
  message: string;
};

const useRanking = () => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState<TRankingResponse>();
  const fetch = async () => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    let response;

    try {
      const weekResponse = (await Fetcher.get(REST_PATH.weeks)) as TWeekResponse;
      if (weekResponse.status === 'success') {
        const rankingResponse = (await Fetcher.get(
          `${REST_PATH.ranking}?week=${weekResponse.currentWeek}`,
        )) as TRankingResponse;
        response = { ...rankingResponse, message: '排行榜獲取成功！' };
      }
    } catch {
      response = { status: 'error', message: '網路錯誤，請稍後再試', ranking: [] };
    }

    setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
    setState(response as TRankingResponse);
  };
  return [state, fetch] as const;
};
export default useRanking;
