import Button from '@/components/button';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useContext, useEffect, useId } from 'react';
import './index.less';
import Heading from '@/components/heading';
import Click from 'lesca-click';

const Description = memo(() => {
  const id = useId();
  const [, setContext] = useContext(Context);

  useEffect(() => {
    Click.addPreventExcept(`#${id}`);
  }, [id]);

  return (
    <div className='Description'>
      <div className='bg' />
      <div className='ctx'>
        <div className='content'>
          <div className='header'>
            玩法說明
            <Button
              className='back'
              onClick={() => {
                setContext({
                  type: ActionType.Playing,
                  state: {
                    openAnnouncement: false,
                    openMyAward: false,
                    openRanking: false,
                    openDescription: false,
                    openProcedures: false,
                  },
                });
              }}
            >
              <div />
            </Button>
          </div>
          <div id={id} className='dialog'>
            <div>
              歡迎參加王品集團｜全民一起好好吃語感大會考本次測驗以多元難度的語境辨認與音調變化，挑戰考生的語感敏銳度。
              <br />
              測驗共有三大題，音調、語境與最後挑戰題。
            </div>
            <div>
              <Heading.LI listItem='壹、'>暖身音調題</Heading.LI>
              <div>
                <span>小試身手，不計分。</span>
              </div>
              <div className='text-[#333]'>
                本試題為選擇題，請在題目句子中，點擊紅色空格，選擇「好」字注音的正確聲調。
              </div>
              <div className='w-full'>
                <div className='d1' />
              </div>
            </div>
            <div>
              <Heading.LI listItem='貳、'>聽力語境題</Heading.LI>
              <div>
                <span>先抓感覺，不計分。</span>
              </div>
              <div className='text-[#333]'>
                本試題為語音題，需請開啟手機聲音聆聽題目，並根據題目語境選擇正確答案。
              </div>
              <div className='w-full'>
                <div className='d2' />
              </div>
            </div>
            <div>
              <Heading.LI listItem='參、'>綜合挑戰題</Heading.LI>
              <div>
                <span>三次Miss即結束測驗，刷分加油！</span>
              </div>
              <div className='text-[#333]'>
                本試題為手、耳、眼綜合能力挑戰題，需請開啟手機聲音依照節奏提示，點擊畫面中的「一起」「好」「好」「吃」賺積分拚排名。
              </div>
              <div className='w-full'>
                <div className='d3' />
              </div>
            </div>
            <div className='w-full'>
              <div className='flex w-full flex-col items-start justify-start gap-0'>
                <div className='flex w-full flex-row'>
                  <div className='font-line-extraBold bg-primary flex flex-1 items-center justify-start px-4 text-2xl text-white'>
                    作答相關FAQ
                  </div>
                  <div className='arrow' />
                </div>
                <div className='bg-quaternary w-full p-4'>
                  <div className='text-primary text-xl'>Q：為什麼我收不到驗證碼簡訊？</div>
                  <div className='mb-5'>
                    A：請依照步驟調整相關設定
                    <br />
                    {'iOS手機：設定>APP>訊息>關閉「過濾未知的寄件人」。'}
                    <br />
                    {
                      'Android手機：Google訊息>點擊右上角頭像>訊息設定>保護與安全>關閉垃圾訊息阻擋。'
                    }
                    <br />
                    {'或可於「垃圾訊息」查看。'}
                  </div>
                  <div className='text-primary text-xl'>Q：手機聽不到聲音怎麼辦？</div>
                  <div className='mb-5'>
                    A：除了使用音量鍵控制聲音大小外，也請關閉手機靜音功能，就可以聽到聲音囉！
                  </div>
                  <div className='text-primary text-xl'>Q：為什麼我玩起來會有點卡卡的？</div>
                  <div className='mb-5'>
                    A：網路狀態會影響遊戲體驗，建議於網路順暢的地方開啟遊戲唷！
                  </div>
                  <div className='text-primary text-xl'>
                    Q：為什麼系統顯示我的暱稱不正確不能進行遊戲？
                  </div>
                  <div className='mb-5'>
                    A：系統會於您第一次登錄遊戲時紀錄您的暱稱與手機號碼，一組手機號碼僅能綁定一組暱稱，不得修改。派送驗證碼簡訊時，會同時紀錄您的暱稱，如遺忘可查找；可於每週一到週五10:00-18:00來電聯繫活動小組查詢(02)2517-6608#865。
                  </div>
                  <div className='text-primary text-xl'>Q：請問獲得高分的秘密？</div>
                  <div>A：持續練習，一定會有回報的！</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Description;
