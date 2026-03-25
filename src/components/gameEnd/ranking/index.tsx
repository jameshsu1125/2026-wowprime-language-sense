import Button from '@/components/button';
import useRanking from '@/hooks/useRanking';
import useStatus from '@/hooks/useStatus';
import { Context } from '@/settings/constant';
import { ActionType, TransitionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import Blockquote from './blockquote';
import './index.less';

const Ranking = memo(() => {
  const [, setContext] = useContext(Context);

  const [rankingResponse, getRanking] = useRanking();
  const [status] = useStatus();
  const [transition, setTransition] = useState(TransitionType.Unset);

  useEffect(() => {
    getRanking();
  }, []);

  if (!rankingResponse) return null;
  if (!status) return null;

  const data = rankingResponse.ranking!;
  const { user } = status;

  const ranking = user ? data.find((r) => r.nickname === user.nickname)?.ranking : undefined;
  // const ranking = '1000';
  const score = user ? data.find((r) => r.nickname === user.nickname)?.score : undefined;

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
              nextWeek={rankingResponse.nextWeek}
              transition={transition}
            />
          </div>
        </div>
      </div>
    </OnloadProvider>
  );
});
export default Ranking;
