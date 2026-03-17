import { memo, useEffect } from 'react';
import './index.less';
import useRanking from '@/hooks/useRanking';

const Ranking = memo(() => {
  const [rankingResponse, getRanking] = useRanking();

  useEffect(() => {
    getRanking();
  }, []);

  useEffect(() => {
    if (rankingResponse) {
      console.log(rankingResponse);
    }
  }, [rankingResponse]);

  return <div className='Ranking'>Ranking Component</div>;
});
export default Ranking;
