import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import './burger.less';

const Burger = memo(() => {
  const [context, setContext] = useContext(Context);
  return (
    <button
      className={twMerge('burger', context[ActionType.Menu]?.enabled ? 'burger-revert' : '')}
      onClick={() =>
        setContext({
          type: ActionType.Menu,
          state: { enabled: !context[ActionType.Menu]?.enabled },
        })
      }
    >
      {[...new Array(3).keys()].map((index) => {
        return <div key={`b${index}`} />;
      })}
    </button>
  );
});
export default Burger;
