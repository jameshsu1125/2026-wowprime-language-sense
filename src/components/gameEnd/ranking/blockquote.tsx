import { memo, useContext, useEffect, useId, useMemo, useState } from 'react';
import './blockquote.less';
import Click from 'lesca-click';
import Button from '@/components/button';
import useTween from 'lesca-use-tween';
import { twMerge } from 'tailwind-merge';
import { Context, PlayingState } from '@/settings/constant';
import { ActionType } from '@/settings/type';

const IncreaseCount = memo(({ initCount, toCount }: { initCount: number; toCount: number }) => {
  const [count, setCount] = useState(initCount);
  const [, setStyle] = useTween({ top: initCount });
  useEffect(() => {
    setStyle(
      { top: toCount },
      {
        duration: 1000,
        onUpdate: (v: { top: number }) => setCount(Math.floor(Number(v.top))),
        onEnd: () => setCount(toCount),
      },
    );
  }, []);
  return <>{count}</>;
});

const InTheRanking = memo(({ ranking, score }: { ranking?: string; score?: string }) => {
  return (
    <div className='flex w-full flex-col gap-5'>
      <blockquote>
        <div>考生：松山蔡依林</div>
        <div>
          你的分數：
          <span>
            <IncreaseCount initCount={0} toCount={Number(score) || 0} />
          </span>
        </div>
        <div>
          目前排行：
          <span>
            {Number(ranking) <= 100 ? (
              <IncreaseCount initCount={1000} toCount={Number(ranking) || 1000} />
            ) : (
              '未榜上'
            )}
          </span>
          {Number(ranking) <= 100 ? '名' : ''}
        </div>
      </blockquote>
      <div className='flex w-full flex-row gap-5 px-10'>
        <div className='w-1/2'>
          <Button>
            <Button.large>
              <div className='btn-invite' />
            </Button.large>
          </Button>
        </div>
        <div className='w-1/2'>
          <Button>
            <Button.large>
              <div className='btn-again' />
            </Button.large>
          </Button>
        </div>
      </div>
    </div>
  );
});

const NotLoginRanking = memo(() => {
  const [, setContext] = useContext(Context);
  return (
    <div className='font-line-bold text-primary flex w-full flex-col gap-10 text-center text-3xl leading-snug'>
      <div>
        什麼！
        <br />
        你竟然還沒玩過？
        <br />
        現在馬上來一局！
        <br />
        <span className='text-black'>快帶著你的准考證進入試場!</span>
      </div>
      <div className='flex w-full justify-center'>
        <div className='w-1/2'>
          <Button
            onClick={() => {
              setContext({
                type: ActionType.Playing,
                state: { ...PlayingState },
              });
            }}
          >
            <Button.rounded>
              <div className='btn-next'>
                <div />
              </div>
            </Button.rounded>
          </Button>
        </div>
      </div>
    </div>
  );
});

const Text = memo(({ ranking }: { ranking?: string }) => {
  if (ranking === undefined) return null;
  else if (Number(ranking) <= 100) {
    return (
      <>
        恭喜你榜上有名！
        <br />
        但不能大意，隨時都有可能被刷下來喔！
      </>
    );
  }
  return (
    <>
      不要氣餒！繼續練習一定會有好成績的！ <br />
      前100名的獎勵在等妳！
    </>
  );
});

const Blockquote = memo(({ ranking, score }: { ranking?: string; score?: string }) => {
  const id = useId();

  const page = useMemo(() => {
    if (ranking === undefined) return <NotLoginRanking />;
    else return <InTheRanking ranking={ranking} score={score} />;
  }, [ranking, score]);

  useEffect(() => {
    Click.addPreventExcept(`#${id}`);
  }, [id]);

  return (
    <div
      id={id}
      className={twMerge(
        'flex w-full flex-1 flex-col items-center justify-start gap-5 overflow-y-scroll px-5',
        ranking === undefined ? 'pt-0' : 'pt-8',
      )}
    >
      <div className='text-primary font-line-bold w-full text-center text-2xl'>
        <Text ranking={ranking} />
      </div>
      <div className='Blockquote'>{page}</div>
    </div>
  );
});
export default Blockquote;
