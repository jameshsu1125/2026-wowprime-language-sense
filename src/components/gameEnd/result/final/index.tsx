import Button from '@/components/button';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect } from 'react';
import { GameEndContext, GameEndFinalType } from '../../config';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import './index.less';

const Final = memo(() => {
  const [copiedText, copy] = useCopyToClipboard();
  const [{ result }, setState] = useContext(GameEndContext);

  useEffect(() => {
    if (copiedText) {
      alert('專屬兌換序號已複製成功');
    }
  }, [copiedText]);

  return (
    <OnloadProvider>
      <div className='Final'>
        <div>
          <div>
            <div>恭喜松山蔡依林獲得</div>
            <div>
              參加獎瘋美食點數<span>50點</span>
            </div>
            <div>您的專屬兌換序號加下：</div>
            <div>
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
            </div>
            <div className='mt-7'>
              請到
              <a href='#'>王品瘋美食</a>
              輸入序號兌換
            </div>
          </div>
          <div>
            <p>※一名玩家限領一次，不得重複領取</p>
            <p>※玩家需要有王品瘋美食帳號</p>
            <p>※一組序號僅限兌換一次，不得重複使用</p>
            <div className='flex w-full flex-row items-center justify-between gap-4 pb-14'>
              <div className='w-1/2'>
                <Button
                  onClick={() => {
                    setState((prev) => ({ ...prev, final: GameEndFinalType.ranking }));
                  }}
                >
                  <Button.large>
                    <div className='btn-ranking' />
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
        </div>
      </div>
    </OnloadProvider>
  );
});
export default Final;
