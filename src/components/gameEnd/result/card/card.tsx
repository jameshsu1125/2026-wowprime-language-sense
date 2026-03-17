import Button from '@/components/button';
import useRanking from '@/hooks/useRanking';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect } from 'react';
import { GameEndContext, GameEndFinalType } from '../../config';
import './card.less';

const Score = memo(({ transition }: { transition: boolean }) => {
  const [context] = useContext(Context);
  const playing = context[ActionType.Playing];
  const [style, setStyle, destroy] = useTween({ top: 0 });

  useEffect(() => {
    if (transition) {
      setStyle({ top: playing?.score || 0 }, 2000);
    }
    return () => {
      destroy();
    };
  }, [transition]);

  return (
    <div>
      你的分數：<span>{Math.floor(Number(style.top))}</span>
    </div>
  );
});

const Ranking = memo(({ transition }: { transition: boolean }) => {
  const [style, setStyle, destroy] = useTween({ top: 1000 });
  const [rankingResponse, getRanking] = useRanking();

  useEffect(() => {
    getRanking();
  }, []);

  useEffect(() => {
    if (rankingResponse && rankingResponse.status === 'success' && transition) {
      const [{ ranking }] = rankingResponse.ranking;
      setStyle({ top: Number(ranking) || 1000 }, { duration: 2500 });
    }

    return () => {
      destroy();
    };
  }, [transition, rankingResponse]);
  return (
    <div>
      目前排行：<span>{Math.floor(Number(style.top))}</span>名
    </div>
  );
});

const Card = memo(({ transition }: { transition: boolean }) => {
  const [context] = useContext(Context);
  const user = context[ActionType.User];
  const [, setState] = useContext(GameEndContext);

  return (
    <div className='Card'>
      <div className='box'>
        <div>
          <div className='box-content'>
            <div>考生：{user?.nickname || '松山蔡依林'}</div>
            <Score transition={transition} />
            <Ranking transition={transition} />
          </div>
        </div>
      </div>
      <div className='text'>
        <div>
          恭喜你獲得瘋美食點數
          <span>50點</span>
        </div>
        <div>快分享結果並依步驟領取獎勵!</div>
      </div>
      <div className='result-btn'>
        <div>
          <Button>
            <Button.large>
              <div className='share-btn' />
            </Button.large>
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              setState((S) => ({ ...S, final: GameEndFinalType.award }));
            }}
          >
            <Button.large>
              <div className='award-btn' />
            </Button.large>
          </Button>
        </div>
      </div>
      <div className='note'>
        <div>週週關注榜單，每週名次最高</div>
        <div>可直接獲得瘋美食點數</div>
        <span>17,777點</span>
      </div>
    </div>
  );
});
export default Card;
