import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Click from 'lesca-click';
import { memo, useContext, useEffect, useId } from 'react';
import Button from '../button';
import './list.less';

const MenuList = memo(() => {
  const id = useId();
  const [, setContext] = useContext(Context);

  useEffect(() => {
    Click.add(`#${id}`, () => {
      setContext({ type: ActionType.Menu, state: { enabled: false } });
    });

    return () => Click.remove(`#${id}`);
  }, []);

  return (
    <>
      <div id={id} className='fixed top-0 left-0 h-full w-full bg-transparent' />
      <div className='MenuList'>
        <Button
          onClick={() => {
            setContext({ type: ActionType.Menu, state: { enabled: false } });
            setContext({ type: ActionType.Playing, state: { openRanking: true } });
          }}
        >
          <div className='btn-menu btn-primary'>本週榜單</div>
        </Button>
        <Button
          onClick={() => {
            setContext({ type: ActionType.Menu, state: { enabled: false } });
            setContext({ type: ActionType.Playing, state: { openAnnouncement: true } });
          }}
        >
          <div className='btn-menu btn-secondary'>得獎公告</div>
        </Button>
        <Button className='cursor-not-allowed'>
          <div className='btn-menu btn-secondary'>活動說明</div>
        </Button>
        <Button className='cursor-not-allowed'>
          <div className='btn-menu btn-secondary'>領獎辦法</div>
        </Button>
        <Button className='cursor-not-allowed'>
          <div className='btn-menu btn-secondary'>一起看影片</div>
        </Button>
      </div>
    </>
  );
});
export default MenuList;
