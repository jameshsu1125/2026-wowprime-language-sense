import { memo, useEffect } from 'react';
import './index.less';
import useRanking from '@/hooks/useRanking';

const Ranking = memo(() => {
  const [rankingResponse, getRanking] = useRanking();

  useEffect(() => {}, []);
  return <div className='Ranking'>Ranking Component</div>;
});
export default Ranking;
