import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useContext } from 'react';
import Button from '../button';
import './list.less';

const MenuList = memo(() => {
  const [, setContext] = useContext(Context);
  return (
    <>
      <div className='MenuList'>
        <Button
          onClick={() => {
            setContext({ type: ActionType.Menu, state: { enabled: false } });
          }}
        >
          <div className='btn-menu btn-primary'>本週榜單</div>
        </Button>
        <Button
          onClick={() => {
            setContext({ type: ActionType.Menu, state: { enabled: false } });
          }}
        >
          <div className='btn-menu btn-secondary'>得獎公告</div>
        </Button>
        <Button
          onClick={() => {
            setContext({ type: ActionType.Menu, state: { enabled: false } });
          }}
        >
          <div className='btn-menu btn-secondary'>領獎辦法</div>
        </Button>
      </div>
    </>
  );
});
export default MenuList;
