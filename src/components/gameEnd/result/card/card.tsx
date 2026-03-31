import Button from '@/components/button';
import Share from '@/components/share';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { getMedalsIDByRanking, shareImage } from '@/utils';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { GameEndContext, GameEndFinalType } from '../../config';
import './card.less';

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

const Card = memo(
  ({ transition, user }: { transition: boolean; user?: { nickname: string; phone: string } }) => {
    const [, setContext] = useContext(Context);
    const [state, setState] = useContext(GameEndContext);
    const ranking = state.result.rank === 0 ? '未上榜' : String(state.result.rank);
    const medalsID = getMedalsIDByRanking(ranking || '1000');
    const [isShare, setIsShare] = useState(false);
    const [url, setURL] = useState('');

    return (
      <div className='Card'>
        <div className='box'>
          <div>
            <div>
              <div className='box-inner'>
                <div>
                  <div className={twMerge('medals', medalsID)} />
                  <div className='box-content'>
                    <div>考生：{user?.nickname || '某某某'}</div>
                    <Score transition={transition} />
                    <Ranking transition={transition} ranking={ranking} />
                  </div>
                </div>
              </div>
              <div className='box-below'>
                一定是學習太孤單了!
                <br />
                徵求學伴和我一起加油
              </div>
              {/* <div>
                
                <div className='box-content'>
                  <div>考生：{user?.nickname || '某某某'}</div>
                  <Score transition={transition} />
                  <Ranking transition={transition} ranking={ranking} />
                </div>
                <div className='award-content'>asd</div>
              </div> */}
            </div>
          </div>
          <div className='card-buttons'>
            <div>
              <Button
                onClick={() => {
                  if (!url) setIsShare(true);
                  else {
                    shareImage({
                      image: url,
                      onError: () => {
                        setContext({
                          type: ActionType.Modal,
                          state: {
                            enabled: true,
                            content: '不支援分享功能，請使用支援 Web Share API 的瀏覽器。',
                            Label: ['確定'],
                          },
                        });
                      },
                    });
                  }
                }}
              >
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
        </div>
        <div className='note'>
          <div>週週關注榜單，每週名次最高</div>
          <div>可直接獲得瘋美食點數</div>
          <span>17,000點</span>
        </div>
        {isShare && (
          <Share
            onUploaded={(shareUrl) => {
              setURL(shareUrl);
              shareImage({
                image: shareUrl,
                onError: () => {
                  setContext({
                    type: ActionType.Modal,
                    state: {
                      enabled: true,
                      content: '不支援分享功能，請使用支援 Web Share API 的瀏覽器。',
                      Label: ['確定'],
                    },
                  });
                },
              });
              setIsShare(false);
            }}
          />
        )}
      </div>
    );
  },
);
export default Card;
