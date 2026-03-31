import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';
import { memo, useContext, useEffect } from 'react';
import './index.less';
import useTween from 'lesca-use-tween';
import { HomeContext, HomePageType } from '@/pages/home/config';

const UserName = memo(({ children }: IReactProps) => (
  <div className='nickname'>
    <div className='truncate whitespace-nowrap'>{children}</div>
  </div>
));

export const Score = memo(({ score }: { score: number }) => {
  const [count, setCount] = useTween({ top: score });

  useEffect(() => {
    setCount({ top: score });
  }, [score]);

  return (
    <div className='score'>
      <div className='truncate whitespace-nowrap'>{String(Math.round(Number(count.top ?? 0)))}</div>
    </div>
  );
});

const Extra = memo(() => {
  const [context] = useContext(Context);
  const { nickname } = context[ActionType.User]!;
  const { enabled, score, openAnnouncement, openRanking } = context[ActionType.Playing]!;
  const [state] = useContext(HomeContext);

  return (
    <div className='Extra'>
      {state.page !== HomePageType.Examiner &&
      state.page !== HomePageType.Login &&
      !openAnnouncement &&
      !openRanking &&
      !enabled ? (
        <>
          {enabled && <Score score={score || 0} />}
          {nickname === '' ? null : <UserName>{nickname}</UserName>}
        </>
      ) : null}
    </div>
  );
});
export default Extra;
