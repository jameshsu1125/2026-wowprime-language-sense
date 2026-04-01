import Button from '@/components/button';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useContext } from 'react';
import './index.less';

const Procedures = memo(() => {
  const [, setContext] = useContext(Context);

  return (
    <div className='Procedures'>
      <div className='bg' />
      <div className='ctx'>
        <div className='content'>
          <div className='header'>
            領獎辦法
            <Button
              className='back'
              onClick={() => {
                setContext({
                  type: ActionType.Playing,
                  state: {
                    openRanking: false,
                    openMyAward: false,
                    openAnnouncement: false,
                    openDescription: false,
                    openProcedures: false,
                  },
                });
              }}
            >
              <div />
            </Button>
          </div>
          <div className='dialog'></div>
        </div>
      </div>
    </div>
  );
});
export default Procedures;
