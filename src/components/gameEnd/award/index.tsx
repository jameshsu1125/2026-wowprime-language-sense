import Button from '@/components/button';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useContext } from 'react';
import './index.less';

const Award = memo(() => {
  const [, setContext] = useContext(Context);

  return (
    <div className='Award'>
      <div className='bg' />
      <div className='ctx'>
        <div className='content'>
          <div className='header'>
            我的參加獎
            <Button
              className='back'
              onClick={() => {
                setContext({ type: ActionType.Playing, state: { openMyAward: false } });
              }}
            >
              <div />
            </Button>
          </div>
          <div>asd</div>
        </div>
      </div>
    </div>
  );
});
export default Award;
