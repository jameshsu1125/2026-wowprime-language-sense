import Button from '@/components/button';
import useRanking from '@/hooks/useRanking';
import { Context } from '@/settings/constant';
import { ActionType, TransitionType } from '@/settings/type';
import Storage from 'lesca-local-storage';
import { memo, useContext, useEffect, useState } from 'react';
import Blockquote from './blockquote';
import './index.less';
import OnloadProvider from 'lesca-react-onload';

const Ranking = memo(() => {
  const [, setContext] = useContext(Context);
  const [rankingResponse, getRanking] = useRanking();
  const [transition, setTransition] = useState(TransitionType.Unset);

  useEffect(() => {
    getRanking();
  }, []);

  useEffect(() => {
    if (rankingResponse) {
      // console.log(rankingResponse, storage);
    }
  }, [rankingResponse]);

  if (!rankingResponse) return null;

  const storage = Storage.get('token');
  const userData = storage && storage.data ? storage.data : null;

  const data = rankingResponse.ranking!;
  // const ranking = userData
  //   ? data.find((r) => r.nickname === userData.nickname)?.ranking
  //   : undefined;
  const ranking = '50';
  const score = userData ? data.find((r) => r.nickname === userData.nickname)?.score : undefined;

  return (
    <OnloadProvider onload={() => setTransition(TransitionType.FadeIn)}>
      <div className='Ranking'>
        <div className='bg' />
        <div className='ctx'>
          <div className='content'>
            <div className='header'>
              本週榜單
              <Button
                className='back'
                onClick={() => {
                  setContext({ type: ActionType.Playing, state: { openRanking: false } });
                }}
              >
                <div />
              </Button>
            </div>
            <Blockquote
              ranking={ranking}
              score={score}
              data={data}
              selectedWeek={rankingResponse.nextWeek}
              transition={transition}
            />
          </div>
        </div>
      </div>
    </OnloadProvider>
  );
});
export default Ranking;
