import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Click from 'lesca-click';
import { memo, useContext, useEffect, useId } from 'react';
import Button from '../button';
import './list.less';

const MenuList = memo(() => {
  const id = useId();
  const [context, setContext] = useContext(Context);
  const { token } = context[ActionType.User]!;

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
          <div className='btn-menu'>本週榜單</div>
        </Button>
        <Button
          onClick={() => {
            setContext({ type: ActionType.Menu, state: { enabled: false } });
            setContext({ type: ActionType.Playing, state: { openAnnouncement: true } });
          }}
        >
          <div className='btn-menu'>得獎公告</div>
        </Button>
        <Button className='cursor-not-allowed'>
          <div className='btn-menu'>活動說明</div>
        </Button>
        <Button className='cursor-not-allowed'>
          <div className='btn-menu'>領獎辦法</div>
        </Button>
        <Button className='cursor-not-allowed'>
          <div className='btn-menu'>一起看影片</div>
        </Button>
        {token && (
          <Button
            onClick={() => {
              setContext({ type: ActionType.Menu, state: { enabled: false } });
              setContext({ type: ActionType.Playing, state: { openMyAward: true } });
            }}
          >
            <div className='btn-menu'>我的參加獎</div>
          </Button>
        )}
      </div>
    </>
  );
});
export default MenuList;
