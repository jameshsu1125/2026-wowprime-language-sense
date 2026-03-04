import Button from '@/components/button';
import Heading from '@/components/heading';
import Literal from '@/components/literal';
import { memo, useContext } from 'react';
import './index.less';
import { GameContext, GameStepType } from '../config';

const QUESTION = '愛好好吃的你，可以和我一起好好吃好吃的嗎?';
const ANSWER = [
  { index: 1, tone: 4 },
  { index: 2, tone: 3 },
  { index: 12, tone: 3 },
  { index: 13, tone: 3 },
  { index: 15, tone: 3 },
];

const Question1 = memo(() => {
  const [, setState] = useContext(GameContext);

  return (
    <div className='Question1 list-decimal'>
      <Heading>
        <div className='heading' />
      </Heading>
      <div className='body'>
        <div>
          <div className='question'>
            請在下列句子中，輸入符合各個「好」字注音的聲調數字。
            <br />
            (例如輕聲寫0，一聲寫1，以此類推。)
            <br />
          </div>
          <Literal text={QUESTION} answer={ANSWER} index={1} />
        </div>
        <div className='flex w-full justify-end'>
          <div className='mr-2 mb-5 w-[48%]'>
            <Button
              onClick={() => {
                setState((S) => ({ ...S, step: GameStepType.question2 }));
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
export default Question1;
