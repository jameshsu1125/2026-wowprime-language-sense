import Button from '@/components/button';
import { memo, useContext } from 'react';
import { GameContext, GameStepType } from '../config';
import './index.less';

const Question3 = memo(() => {
  const [, setState] = useContext(GameContext);
  return (
    <div className='Question3'>
      <div className='flex w-full flex-col items-center justify-center gap-10'>
        <div className='relative w-6/12'>
          <div className='heading' />
        </div>
        <div className='relative w-7/12'>
          <div className='description' />
        </div>
        <div className='relative w-8/12'>
          <div className='content' />
        </div>
        <div className='flex w-full justify-center'>
          <div className='w-1/2'>
            <Button
              onClick={() => {
                setState((S) => ({ ...S, step: GameStepType.Taiko }));
              }}
            >
              <Button.large>
                <div className='btn-start' />
              </Button.large>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Question3;
