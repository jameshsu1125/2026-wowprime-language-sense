import { memo, useEffect } from 'react';
import './index.less';
import { TRankingResponse } from '@/hooks/useRanking';

const Table = memo(({ data }: { data: TRankingResponse['ranking'] }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <table className='Table'>
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
            <td>{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}</td>
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
