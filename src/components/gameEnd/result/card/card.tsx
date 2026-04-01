import Button from '@/components/button';
import Share from '@/components/share';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { getMedalsIDByRanking, shareImage } from '@/utils';
import useTween from 'lesca-use-tween';
import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { GameEndContext, GameEndFinalType } from '../../config';
import './card.less';
import { ResetContext } from '@/pages/config';

const Score = memo(({ transition }: { transition: boolean }) => {
  const [context] = useContext(Context);
  const playing = context[ActionType.Playing];
  const [style, setStyle, destroy] = useTween({ top: 0 });

  useEffect(() => {
    if (transition) setStyle({ top: playing?.score || 0 }, 2000);
    return () => destroy();
  }, [transition]);

  return (
    <div>
      你的分數：<span>{Math.floor(Number(style.top))}</span>
    </div>
  );
});

const Ranking = memo(({ transition, ranking }: { transition: boolean; ranking?: string }) => {
  const [style, setStyle, destroy] = useTween({ top: 1000 });

  useEffect(() => {
    if (transition) setStyle({ top: Number(ranking) || 1000 }, { duration: 2500 });
    return () => destroy();
  }, [transition, ranking]);

  return (
    <div>
      本次排名：<span>{ranking !== '未上榜' ? Math.floor(Number(style.top)) : '未上榜'}</span>
      {ranking !== '未上榜' ? '名' : ''}
    </div>
  );
});

type ICardProps = {
  transition: boolean;
  user?: { nickname: string; phone: string };
  coupon?: string;
};

const Card = memo(({ transition, user, coupon }: ICardProps) => {
  const [context, setContext] = useContext(Context);
  const [state, setState] = useContext(GameEndContext);
  const [, setReset] = useContext(ResetContext);

  const { score } = context[ActionType.Playing]!;
  const ranking = state.result.rank === 0 ? '未上榜' : String(state.result.rank);
  const medalsID = getMedalsIDByRanking(ranking || '1000');
  const [isShare, setIsShare] = useState(false);
  const [url, setURL] = useState('');
  const [base64, setBase64] = useState('');

  const onUploaded = useCallback(
    (shareUrl: string, base64: string) => {
      setURL(shareUrl);
      setBase64(base64);
      shareImage({
        image: base64,
        nickname: user?.nickname || '某某某',
        score: score || 0,
        url: shareUrl,
        onError: () => {
          setContext({
            type: ActionType.Modal,
            state: {
              enabled: true,
              title: '系統訊息',
              content: (
                <>
                  您的瀏覽器不支援分享功能，建議可直接手機截圖分享唷！
                  <br />
                  *溫馨提醒，建議改用預設瀏覽器可獲得最佳遊戲體驗！
                </>
              ),
              Label: ['確定'],
            },
          });
        },
      });
      setIsShare(false);
    },
    [user, score, setContext],
  );

  const onClick = useCallback(() => {
    if (!url) setIsShare(true);
    else {
      shareImage({
        image: base64,
        nickname: user?.nickname || '某某某',
        score: score || 0,
        url: url,
        onError: () => {
          setContext({
            type: ActionType.Modal,
            state: {
              enabled: true,
              title: '系統訊息',
              content: (
                <>
                  您的瀏覽器不支援分享功能，建議可直接手機截圖分享唷！
                  <br />
                  *溫馨提醒，建議改用預設瀏覽器可獲得最佳遊戲體驗！
                </>
              ),
              Label: ['確定'],
            },
          });
        },
      });
    }
  }, [url, user, score, base64, setContext]);

  return (
    <div className='Card'>
      <div className='box'>
        <div>
          <div>
            <div className='box-inner'>
              <div>
                <div className={twMerge('medals', medalsID)} />
                <div className='box-content'>
                  <div>
                    考生：
                    {(user?.nickname || '某某某').substring(0, 10)}
                  </div>
                  <Score transition={transition} />
                  <Ranking transition={transition} ranking={ranking} />
                </div>
                <div className={twMerge('step', `step-${medalsID}`)} />
              </div>
            </div>
          </div>
        </div>
        <div className='card-buttons'>
          <div>
            <Button onClick={onClick}>
              <Button.large>
                <div className='share-btn' />
              </Button.large>
            </Button>
          </div>
          <div>
            {coupon ? (
              <Button
                onClick={() => {
                  setState((S) => ({ ...S, final: GameEndFinalType.award }));
                }}
              >
                <Button.large>
                  <div className='award-btn' />
                </Button.large>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setReset((S) => ({ ...S, index: S.index + 1, navto: 'game' }));
                }}
              >
                <Button.large>
                  <div className='again-btn' />
                </Button.large>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className='note'>
        <div>週週關注榜單，每週名次最高</div>
        <div>可直接獲得瘋美食點數</div>
        <span>17,000點</span>
      </div>
      {isShare && (
        <Share
          medalsID={medalsID}
          ranking={ranking}
          score={score || 0}
          nickname={user?.nickname || '某某某'}
          onUploaded={onUploaded}
        />
      )}
    </div>
  );
});
export default Card;
