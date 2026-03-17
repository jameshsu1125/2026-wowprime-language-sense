import { memo, useContext, useEffect } from 'react';
import './index.less';
import useRanking from '@/hooks/useRanking';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Storage from 'lesca-local-storage';
import Button from '@/components/button';
import Blockquote from './blockquote';

const Ranking = memo(() => {
  const [, setContext] = useContext(Context);
  const [rankingResponse, getRanking] = useRanking();

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

  const rankings = rankingResponse.ranking!;
  // const ranking = userData
  //   ? rankings.find((r) => r.nickname === userData.nickname)?.ranking
  //   : undefined;
  const ranking = '1';

  const score = userData
    ? rankings.find((r) => r.nickname === userData.nickname)?.score
    : undefined;

  return (
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
          <Blockquote ranking={ranking} score={score} />
        </div>
      </div>
    </div>
  );
});
export default Ranking;
