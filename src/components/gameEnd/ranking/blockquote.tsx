import Button from '@/components/button';
import CountDown from '@/components/countDown';
import Table from '@/components/table';
import { TRankingResponse } from '@/hooks/useRanking';
import { ResetContext } from '@/pages/config';
import { HomeContext, HomePageType } from '@/pages/home/config';
import { Context, PlayingState } from '@/settings/constant';
import { ActionType, TransitionType } from '@/settings/type';
import { shareURL } from '@/utils';
import Click from 'lesca-click';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useId, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './blockquote.less';
import { useCopyToClipboard } from '@uidotdev/usehooks';

const IncreaseCount = memo(({ initCount, toCount }: { initCount: number; toCount: number }) => {
  const [count, setCount] = useState(initCount);
  const [, setStyle] = useTween({ top: initCount });
  useEffect(() => {
    setStyle(
      { top: toCount },
      {
        delay: 600,
        duration: 2000,
        onUpdate: (v: { top: number }) => setCount(Math.floor(Number(v.top))),
        onEnd: () => setCount(toCount),
      },
    );
  }, []);
  return <>{count}</>;
});

type TInTheRankingProps = {
  ranking?: string;
  score?: string;
  transition: TransitionType;
};

const InTheRanking = memo(({ ranking, score, transition }: TInTheRankingProps) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  const [, setReset] = useContext(ResetContext);
  const [context, setContext] = useContext(Context);
  const user = context[ActionType.User]!;
  const [text, copy] = useCopyToClipboard();

  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ opacity: 1, y: 0 }, { duration: 600, delay: 200 });
    }
  }, [transition]);

  useEffect(() => {
    if (text) {
      setContext({
        type: ActionType.Modal,
        state: {
          enabled: true,
          title: '系統訊息',
          content: '網址已複製，快邀請朋友來挑戰吧！',
          Label: ['確定'],
        },
      });
    }
  }, [text]);

  return (
    <div className='font-default flex w-full flex-col gap-5' style={style}>
      <blockquote>
        <div>考生：{user.nickname}</div>
        <div>
          最佳分數：
          <span>
            <IncreaseCount initCount={0} toCount={Number(score) || 0} />
          </span>
        </div>
        <div>
          本週排名：
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
          <Button
            onClick={() =>
              shareURL({
                onError: () => {
                  copy(window.location.href);
                },
              })
            }
          >
            <Button.large>
              <div className='btn-invite' />
            </Button.large>
          </Button>
        </div>
        <div className='w-1/2'>
          <Button
            onClick={() => {
              setReset((S) => ({ ...S, index: S.index + 1, navto: 'game' }));
            }}
          >
            <Button.large>
              <div className='btn-again' />
            </Button.large>
          </Button>
        </div>
      </div>
    </div>
  );
});

const NotLoginRanking = memo(({ transition }: { transition: TransitionType }) => {
  const [, setContext] = useContext(Context);
  const [, setState] = useContext(HomeContext);

  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ opacity: 1, y: 0 }, { duration: 600, delay: 200 });
    }
  }, [transition]);

  return (
    <div
      className='font-line-bold text-primary flex w-full flex-col gap-10 text-center text-3xl leading-snug md:text-3xl'
      style={style}
    >
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
        <div className='w-2/5'>
          <Button
            onClick={() => {
              setContext({
                type: ActionType.Playing,
                state: { ...PlayingState },
              });
              setState((S) => ({ ...S, page: HomePageType.Login }));
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

const Text = memo(({ ranking, transition }: { ranking?: string; transition: TransitionType }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ opacity: 1, y: 0 }, 600);
    }
  }, [transition, ranking]);

  if (ranking === undefined) return null;
  else if (Number(ranking) <= 100) {
    return (
      <div
        className='text-primary font-line-bold w-full text-center text-xl md:text-xl'
        style={style}
      >
        恭喜你榜上有名！
        <br />
        但不能大意，隨時都有可能被刷下來喔！
      </div>
    );
  }
  return (
    <div
      className='text-primary font-line-bold w-full text-center text-xl md:text-xl'
      style={style}
    >
      不要氣餒！繼續練習一定會有好成績的！ <br />
      前100名的獎勵在等妳！
    </div>
  );
});

type BlockquoteProps = {
  ranking?: string;
  score?: string;
  data: TRankingResponse['ranking'];
  nextWeek: string;
  transition: TransitionType;
};

const Blockquote = memo(({ ranking, score, data, nextWeek, transition }: BlockquoteProps) => {
  const [context] = useContext(Context);
  const { token } = context[ActionType.User]!;

  const id = useId();
  const page = useMemo(() => {
    if (!token) return <NotLoginRanking transition={transition} />;
    else return <InTheRanking ranking={ranking} score={score} transition={transition} />;
  }, [ranking, score, transition, token]);

  useEffect(() => {
    Click.addPreventExcept(`#${id}`);
  }, [id]);

  return (
    <div
      id={id}
      className={twMerge(
        'flex w-full flex-1 flex-col items-center justify-start gap-5 overflow-y-scroll px-5 pb-5',
        ranking === undefined ? 'pt-0' : 'pt-8',
      )}
    >
      {token && <Text ranking={ranking} transition={transition} />}
      <div className='Blockquote'>{page}</div>
      {nextWeek && <CountDown nextWeek={nextWeek} transition={transition} />}
      <Table data={data} transition={transition} />
    </div>
  );
});
export default Blockquote;
