import { memo, useContext, useEffect } from 'react';
import './index.less';
import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';

const UserName = memo(({ children }: IReactProps) => {
  return (
    <div className='nickname'>
      <div className='truncate whitespace-nowrap'>{children}</div>
    </div>
  );
});

export const Score = memo(({ children }: IReactProps) => {
  return (
    <div className='score'>
      <div className='truncate whitespace-nowrap'>{children}</div>
    </div>
  );
});

const Extra = memo(() => {
  const [context] = useContext(Context);
  const { nickname } = context[ActionType.User]!;
  const { enabled, score } = context[ActionType.Playing]!;

  return (
    <div className='Extra'>
      {enabled && <Score>{score}</Score>}
      {nickname === '' ? null : <UserName>{nickname}</UserName>}
    </div>
  );
});
export default Extra;
