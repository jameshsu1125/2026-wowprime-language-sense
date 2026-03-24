import Button from '@/components/button';
import { ResetContext } from '@/pages/config';
import { Context } from '@/settings/constant';
import { ActionType, IReactProps, TransitionType } from '@/settings/type';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import OnloadProvider from 'lesca-react-onload';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { GameEndContext } from '../../config';
import './index.less';

type TweenerProviderProps = IReactProps & {
  transition: TransitionType;
  delay?: number;
  className?: string;
  type: '1' | '2' | '3';
};

const TweenerProvider = memo(
  ({ children, transition, delay = 0, className, type = '1' }: TweenerProviderProps) => {
    const [style, setStyle] = useTween(
      type === '1'
        ? { opacity: 0, y: 50, scale: 1 }
        : type === '2'
          ? { opacity: 0, y: 30, scale: 1 }
          : { opacity: 0, y: 0, scale: 3 },
    );

    useEffect(() => {
      if (transition === TransitionType.FadeIn) {
        setStyle({ opacity: 1, y: 0, scale: 1 }, { delay, duration: 300 });
      }
    }, [transition]);

    return (
      <div className={twMerge(className)} style={style}>
        {children}
      </div>
    );
  },
);

const Final = memo(() => {
  const [context, setContext] = useContext(Context);
  const user = context[ActionType.User]!;
  const [copiedText, copy] = useCopyToClipboard();
  const [{ result }] = useContext(GameEndContext);
  const [, setReset] = useContext(ResetContext);
  const [transition, setTransition] = useState(TransitionType.Unset);

  useEffect(() => {
    if (copiedText) {
      alert('專屬兌換序號已複製成功');
    }
  }, [copiedText]);

  return (
    <OnloadProvider onload={() => setTransition(TransitionType.FadeIn)}>
      <div className='Final'>
        <div>
          <div>
            <TweenerProvider transition={transition} type='1'>
              恭喜{user.nickname}獲得
            </TweenerProvider>
            <TweenerProvider transition={transition} delay={50} type='1'>
              參加獎瘋美食點數<span>50點</span>
            </TweenerProvider>
            <TweenerProvider transition={transition} delay={100} type='1'>
              您的專屬兌換序號加下：
            </TweenerProvider>
            <TweenerProvider transition={transition} delay={150} type='1'>
              <div className='join'>
                <input defaultValue={result?.coupon || ''} />
                <Button
                  onClick={() => {
                    copy(result?.coupon || '');
                  }}
                >
                  複製
                </Button>
              </div>
            </TweenerProvider>
            <TweenerProvider transition={transition} delay={200} type='1'>
              請到
              <a href='#'>王品瘋美食</a>
              輸入序號兌換
            </TweenerProvider>
          </div>
          <div>
            <TweenerProvider transition={transition} type='2' delay={1000}>
              ※兌換點數前，請先註冊成為王品瘋美食會員。
            </TweenerProvider>
            <TweenerProvider transition={transition} type='2' delay={1050}>
              ※兌換時間：需於 2026/05/03 前完成兌換。
            </TweenerProvider>
            <TweenerProvider transition={transition} type='2' delay={1100}>
              ※一名玩家限領一次，不得重複領取
            </TweenerProvider>
            <TweenerProvider transition={transition} type='2' delay={1150}>
              ※玩家需要有王品瘋美食帳號
            </TweenerProvider>
            <TweenerProvider transition={transition} type='2' delay={1200}>
              ※一組序號僅限兌換一次，不得重複使用
            </TweenerProvider>
            <div className='flex w-full flex-row items-center justify-between gap-4 pb-14'>
              <TweenerProvider className='w-1/2' transition={transition} type='3' delay={500}>
                <Button
                  onClick={() => {
                    setContext({ type: ActionType.Playing, state: { openRanking: true } });
                  }}
                >
                  <Button.large>
                    <div className='btn-ranking' />
                  </Button.large>
                </Button>
              </TweenerProvider>
              <TweenerProvider className='w-1/2' transition={transition} type='3' delay={650}>
                <Button
                  onClick={() => {
                    setReset((S) => ({ ...S, index: S.index + 1, navto: 'game' }));
                  }}
                >
                  <Button.large>
                    <div className='btn-again' />
                  </Button.large>
                </Button>
              </TweenerProvider>
            </div>
          </div>
        </div>
      </div>
    </OnloadProvider>
  );
});
export default Final;
