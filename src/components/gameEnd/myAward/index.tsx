import Button from '@/components/button';
import useStatus from '@/hooks/useStatus';
import { ResetContext } from '@/pages/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { memo, useContext, useEffect } from 'react';
import './index.less';

const MyAward = memo(() => {
  const [, setContext] = useContext(Context);
  const [status] = useStatus();

  const [copiedText, copy] = useCopyToClipboard();
  const [, setReset] = useContext(ResetContext);

  useEffect(() => {
    if (copiedText) {
      setContext({
        type: ActionType.Modal,
        state: {
          title: '系統訊息',
          enabled: true,
          content: '專屬兌換序號已複製成功',
          Label: ['確定'],
        },
      });
    }
  }, [copiedText]);

  if (!status) return null;

  return (
    <div className='MyAward'>
      <div className='bg' />
      <div className='ctx'>
        <div className='content'>
          <div className='header'>
            我的參加獎
            <Button
              className='back'
              onClick={() => {
                setContext({
                  type: ActionType.Playing,
                  state: {
                    openMyAward: false,
                    openRanking: false,
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
          <div className='dialog'>
            <div>
              <div className='flex flex-row'>
                恭喜
                <div className='font-default font-black'>{status.user.nickname || '某某某'}</div>
                獲得
              </div>
              <div className='flex flex-row items-center justify-start'>
                <div>參加獎瘋美食點數</div>
                <span>50點</span>
              </div>
              <div>您的專屬兌換序號加下：</div>
              <div className='join'>
                <input defaultValue={status.coupon || '未配發'} />
                <Button
                  onClick={() => {
                    copy(status.coupon || '');
                  }}
                >
                  複製
                </Button>
              </div>
              <div className='mt-5'>
                請到
                <a
                  href='https://www.wowfms.com/event/eattogether50points'
                  target='_blank'
                  rel='noreferrer'
                >
                  王品瘋美食
                </a>
                輸入序號兌換
              </div>
            </div>
            <div>
              ※兌換點數前，請先註冊成為王品瘋美食會員。 <br />
              ※兌換時間：需於 2026/05/03 前完成兌換。
              <br />
              ※一名玩家限領一次，不得重複領取
              <br />
              ※玩家需要有王品瘋美食帳號
              <br />
              ※一組序號僅限兌換一次，不得重複使用
              <div className='flex w-full flex-row items-center justify-between gap-4 pb-14'>
                <div className='w-1/2'>
                  <Button
                    onClick={() => {
                      setContext({
                        type: ActionType.Playing,
                        state: {
                          openRanking: true,
                          openMyAward: false,
                          openAnnouncement: false,
                          openDescription: false,
                          openProcedures: false,
                        },
                      });
                    }}
                  >
                    <Button.large>
                      <div className='btn-ranking' />
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
          </div>
        </div>
      </div>
    </div>
  );
});
export default MyAward;
