import { memo, useEffect } from 'react';
import './index.less';
import { TRankingResponse } from '@/hooks/useRanking';
import useTween from 'lesca-use-tween';
import { TransitionType } from '@/settings/type';

type TableProps = {
  data: TRankingResponse['ranking'];
  transition: TransitionType;
};

const Table = memo(({ data, transition }: TableProps) => {
  const [style, setStyle] = useTween({ opacity: 0, y: window.innerHeight * 0.5 });

  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ opacity: 1, y: 0 }, { duration: 600, delay: 1000 });
    }
  }, [transition]);

  return (
    <table className='Table' style={style}>
      <thead>
        <tr>
          <th></th>
          <th>排名</th>
          <th>考生</th>
          <th>分數</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>
              {index === 0 ? (
                <div className='gold' />
              ) : index === 1 ? (
                <div className='silver' />
              ) : index === 2 ? (
                <div className='bronze' />
              ) : (
                ''
              )}
            </td>
            <td>{index + 1}</td>
            <td>{item.nickname}</td>
            <td>{item.score}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <th>排名</th>
          <th>考生</th>
          <th>分數</th>
        </tr>
      </tfoot>
    </table>
  );
});
export default Table;
