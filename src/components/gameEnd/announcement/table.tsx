import Button from '@/components/button';
import { TRankingResponse } from '@/hooks/useRanking';
import { TransitionType } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './table.less';

type TAnnouncementTableProps = {
  transition: TransitionType;
  rankingDate: Required<TRankingResponse['rankingDate']>;
};

const Box = memo(
  ({ children, transition }: { children: React.ReactNode; transition: TransitionType }) => {
    const [style, setStyle] = useTween({ opacity: 0, y: 20 });

    useEffect(() => {
      if (transition === TransitionType.FadeIn) {
        setStyle({ opacity: 1, y: 0 }, { duration: 500, delay: 100 });
      }
    }, [transition]);

    return (
      <div className='AnnouncementTable' style={style}>
        {children}
      </div>
    );
  },
);

const AnnouncementTable = memo(({ transition, rankingDate }: TAnnouncementTableProps) => {
  const [tab, setTab] = useState(0);
  return (
    <Box transition={transition}>
      <div>選擇日期查看得獎名單：</div>
      <div>
        {rankingDate &&
          Object.keys(rankingDate).map((date, idx) => {
            return (
              <Button onClick={() => setTab(idx)} key={date}>
                <div
                  className={twMerge('tab', idx === tab && 'active')}
                  onClick={() => setTab(idx)}
                >
                  {date.split('-').slice(1).join('/')}
                </div>
              </Button>
            );
          })}
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>排名</th>
              <th>得獎者</th>
              <th>分數</th>
              <th>手機</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(rankingDate || {})
              .filter((_, idx) => idx === tab)
              .map((data) =>
                data.map((item, idx) => (
                  <tr key={JSON.stringify(item) + idx}>
                    <td>{idx + 1}</td>
                    <td>{item.nickname}</td>
                    <td>{item.score}</td>
                    <td>{item.phone}</td>
                  </tr>
                )),
              )}
          </tbody>
        </table>
      </div>
    </Box>
  );
});
export default AnnouncementTable;
