import Button from '@/components/button';
import Heading from '@/components/heading';
import Radio from '@/components/radio';
import { memo, useContext } from 'react';
import { GameContext, GameStepType } from '../config';
import './index.less';

const OPTIONS = ['曖昧對象', '大學學長', '白雪公主'];

const Question2 = memo(() => {
  const [, setState] = useContext(GameContext);

  return (
    <div className='Question2'>
      <Heading>
        <div className='heading' />
      </Heading>
      <div className='body'>
        <div>
          <div className='question'>
            請按下下方聲音鍵，在聽完對話後，選出正確答案。
            <Button className='relative'>
              <div className='sound' />
            </Button>
            <Radio text='請問說話者最有可能是在對誰說話?' index={1} options={OPTIONS} />
          </div>
        </div>
        <div className='flex w-full justify-end'>
          <div className='mr-2 mb-5 w-[48%]'>
            <Button
              onClick={() => {
                setState((S) => ({ ...S, step: GameStepType.Question3 }));
              }}
            >
              <Button.large>
                <div className='btn-next' />
              </Button.large>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Question2;
