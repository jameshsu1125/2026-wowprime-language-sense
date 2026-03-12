import { Context } from '@/settings/constant';
import { memo, useContext } from 'react';
import './index.less';
import { ActionType } from '@/settings/type';

const Menu = memo(() => {
  const [, setContext] = useContext(Context);
  return (
    <div className='Menu'>
      <button
        className='burger'
        onClick={() => {
          setContext({ type: ActionType.Menu, state: { enabled: true } });
        }}
      />
    </div>
  );
});
export default Menu;
