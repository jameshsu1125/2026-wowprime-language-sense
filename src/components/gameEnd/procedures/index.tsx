import Button from '@/components/button';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useContext, useEffect, useId } from 'react';
import './index.less';
import Click from 'lesca-click';
import { LINKS } from '@/settings/config';

const Procedures = memo(() => {
  const id = useId();
  const [, setContext] = useContext(Context);

  useEffect(() => {
    Click.addPreventExcept(`#${id}`);
  }, [id]);

  return (
    <div className='Procedures'>
      <div className='bg' />
      <div className='ctx'>
        <div className='content'>
          <div className='header'>
            領獎辦法
            <Button
              className='back'
              onClick={() => {
                setContext({
                  type: ActionType.Playing,
                  state: {
                    openRanking: false,
                    openMyAward: false,
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
          <div id={id} className='dialog'>
            <div>
              <div className='text-justify'>
                參加並完成測驗即可獲得考生福利－參加獎，每週排行榜前100名可獲得百大排名獎！每週排行榜公佈前，可持續重新挑戰測驗，力拚高分！
              </div>
              <div className='font-default text-justify text-lg font-light'>
                *溫馨提醒：凡參與全民一起好好吃語感大會考之考生，皆可獲得參加獎瘋美食點數50點，因此需於作答開始前填寫考生資料以領取參加獎。
              </div>
            </div>
            <div>
              <div className='bg-primary font-line-extraBold px-4 py-2 text-2xl tracking-widest text-white'>
                活動期間
              </div>
              <div className='flex flex-col items-start justify-start gap-1'>
                <div>2026/04/13-2026/05/17</div>
                <div className='font-line-regular'>
                  參加獎：即玩即領，兌完為止
                  <br />
                  百大排名獎：每週日23:59結算排名，並於每週一上午11:00公布得獎名單
                </div>
              </div>
              <div className='w-full'>
                <div className='d1' />
              </div>
            </div>

            <div>
              <div className='bg-primary font-line-extraBold px-4 py-2 text-2xl tracking-widest text-white'>
                活動獎項
              </div>
              <div className='w-full'>
                <div className='d2' />
              </div>
              <div className='font-default text-justify text-lg font-light'>
                *同分以先取得該分數者優先排名，舉例：小明取得988分排名第12名，小華在小明之後同樣取得988分，則小華的排名則為第13名。
              </div>
            </div>

            <div className='w-full'>
              <div className='flex w-full flex-col gap-2'>
                {/* 考生福利－參加獎 */}
                <div className='flex w-full flex-col items-start justify-start gap-0'>
                  <div className='flex w-full flex-row'>
                    <div className='bg-primary font-line-extraBold px-4 py-2 text-2xl tracking-widest text-white'>
                      領獎辦法
                    </div>
                    <div className='arrow'>考生福利－參加獎</div>
                  </div>
                  <div className='bg-quaternary flex flex-col gap-5 p-4'>
                    <div>獎項內容：考生完成遊戲後即可獲得50點(1點=1元)王品瘋美食點數。</div>
                    <div>
                      領獎資格：
                      <br />
                      考生須為王品瘋美食會員，完成遊戲三大題後即可領取點數（每人限領1次），限量33,000名，送完為止。
                    </div>
                    <div>
                      領獎方式：
                      <ol>
                        <li className='before:content-["①"]'>
                          遊戲結束後，可於活動頁面領取專屬序號。登入狀態下點擊menu可查找「我的參加獎」。
                        </li>
                        <li className='before:content-["②"]'>
                          <div>
                            複製序號後，至
                            <a target='_blank' href={LINKS.瘋點數兌領網站}>
                              「瘋點數兌領網站」
                            </a>
                            進行兌換，兌換前需先成為
                            <a target='_blank' href={LINKS.立即註冊王品瘋美食會員}>
                              王品瘋美食會員
                            </a>
                            ，點數歸戶將以會員註冊手機門號為主。
                          </div>
                        </li>
                        <li className='before:content-["③"]'>
                          <div>輸入王品瘋美食會員手機號碼+專屬序號，完成兌獎！</div>
                        </li>
                      </ol>
                    </div>
                    <div>
                      <ol>
                        <li className='before:content-["▶"]'>
                          <div>
                            <a target='_blank' href={LINKS.瘋點數兌領網站}>
                              瘋點數兌領網站
                            </a>
                          </div>
                        </li>
                      </ol>
                    </div>
                    <div>
                      <ol>
                        <li className='before:content-["▶"]'>
                          <div>
                            <a target='_blank' href={LINKS.立即註冊王品瘋美食會員}>
                              立即註冊王品瘋美食會員
                            </a>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                {/* 百大排名獎 */}
                <div className='flex w-full flex-col items-start justify-start gap-0'>
                  <div className='flex w-full flex-row'>
                    <div className='bg-primary font-line-extraBold px-4 py-2 text-2xl tracking-widest text-white'>
                      領獎辦法
                    </div>
                    <div className='arrow'>百大排名獎</div>
                  </div>
                  <div className='bg-quaternary flex flex-col gap-5 p-4'>
                    <div>
                      <div>獎項內容：考生完成遊戲後即可獲得50點(1點=1元)王品瘋美食點數。</div>
                      <div className='font-line-regular text-justify text-lg'>
                        ※遊戲排名將於每週日晚間 23:59:59 結算當週排名。排名將於 每週一 00:00:00
                        重新計算。
                        <br />
                        ※若玩家於不同週次皆有上榜，可依各週排名重複領獎。
                      </div>
                    </div>
                    <div>
                      <span className='text-primary'>〈第1名〉</span>領獎資格：
                      <br />
                      考生須為王品瘋美食會員，並於排行榜結算時名列第一名者將收到系統發送簡訊，依據簡訊指示與小編聯繫並提供下列資料後，方可完成領獎。
                    </div>
                    <div className='text-justify'>
                      資料提供：
                      <br />
                      因第1名獎項價值17,000點高於新臺幣1,000元，依中華民國相關法令規定，得獎者需：
                    </div>
                    <div>
                      <ol>
                        <li className='before:content-["①"]'>
                          <div>
                            <span className='font-line-bold'>
                              於排名公布7天內私訊
                              <a target='_blank' href={LINKS.王品瘋美食Facebook官方粉絲專頁}>
                                王品瘋美食FB官方粉絲專頁
                              </a>
                              ，並提供：得獎收件資料
                              —【姓名】、【遊戲登入電話】、【遊戲登入暱稱】及【Email】
                            </span>
                            ，由活動主辦方進行身分核對。
                          </div>
                        </li>
                        <li className='before:content-["②"]'>
                          <div>
                            得獎者身分核對無誤後，活動主辦方將於收到回覆後5個工作天以電子郵件方式提供領獎憑證；
                            <span className='font-line-bold'>
                              得獎者需於收到憑證後14天內將領獎相關憑證資料以郵寄掛號方式寄回指定地址(以郵寄當日郵戳為憑)。
                            </span>
                          </div>
                        </li>
                        <li className='before:content-["③"]'>
                          <div>
                            活動主辦方將於收到郵寄掛號信件，確認無誤後，將於14個工作天內發送17,000點至得獎者的王品瘋美食會員帳戶。
                          </div>
                        </li>
                        <li className='before:content-["④"]'>
                          <div>
                            本活動規範領奬資料未寄回、逾期寄回或資料不完整者，將視同自動放棄得奬權益，喪失得獎資格，且不再進行得獎名單遞補。
                          </div>
                        </li>
                      </ol>
                    </div>
                    <div>
                      <ol>
                        <li className='before:content-["▶"]'>
                          <div>
                            <a target='_blank' href={LINKS.立即註冊王品瘋美食會員}>
                              立即註冊王品瘋美食會員
                            </a>
                          </div>
                        </li>
                      </ol>
                    </div>
                    <div>
                      <span className='text-primary'>〈第2-100名〉</span>領獎資格：
                      <br />
                      考生須為王品瘋美食會員，並於排行榜結算時名列第2-100名者將收到系統發送提醒簡訊，依據下列指示完成後，方可完成領獎。
                    </div>

                    <div>
                      領獎方式：
                      <ol>
                        <li className='before:content-["①"]'>
                          <div>
                            每週一得獎者將收到簡訊通知，請得獎者同步檢核是否已成為王品瘋美食會員。
                          </div>
                        </li>
                        <li className='before:content-["②"]'>
                          <div>點數將於每週四下午14:00前，發送至符合資格之得獎者會員帳號。</div>
                        </li>
                        <li className='before:content-["③"]'>
                          <div>
                            <span className='font-line-bold'>
                              得獎者須於每週四下午14:00前完成王品瘋美食會員註冊，始具領獎資格
                            </span>
                            ，若未於點數發送前完成會員註冊，導致點數無法成功匯入者，將視同自動放棄得奬權益，喪失得獎資格，且不再進行得獎名單遞補。
                          </div>
                        </li>
                      </ol>
                    </div>
                    <div>
                      <ol>
                        <li className='before:content-["▶"]'>
                          <div>
                            <a target='_blank' href={LINKS.立即註冊王品瘋美食會員}>
                              立即註冊王品瘋美食會員
                            </a>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                {/* FAQ */}
                <div className='flex w-full flex-col items-start justify-start gap-0'>
                  <div className='flex w-full flex-row'>
                    <div className='bg-primary font-line-extraBold flex-1 px-4 py-2 text-2xl tracking-widest text-white'>
                      FAQ
                    </div>
                    <div className='arrow-2' />
                  </div>
                  <div className='bg-quaternary flex flex-col gap-5 p-4'>
                    <div>
                      <div>獎項內容：考生完成遊戲後即可獲得50點(1點=1元)王品瘋美食點數。</div>
                    </div>
                    <div>
                      <div>
                        <div className='text-primary text-xl'>
                          Q：我不是王品瘋美食會員，可以領獎嗎？
                        </div>
                        <div className='mb-5'>
                          A：需成為王品瘋美食會員才可完成領獎。建議先完成會員註冊，再進行兌獎或確認排行榜得獎資格。
                        </div>
                      </div>
                      <div>
                        <div className='text-primary text-xl'>Q：考生福利－參加獎可以領幾次？</div>
                        <div className='mb-5'>A：每人限領1次。</div>
                      </div>

                      <div>
                        <div className='text-primary text-xl'>Q：排行榜每週都會重算嗎？</div>
                        <div className='mb-5'>
                          A：會。每週日晚間23:59:59結算，週一00:00:00重新計算。若不同週次皆有上榜，可重複領獎。
                        </div>
                      </div>

                      <div>
                        <div className='text-primary text-xl'>
                          Q：第2–100名如果每週四下午14:00前沒註冊會員怎麼辦？
                        </div>
                        <div className='mb-5'>
                          A：若派點當下仍非王品瘋美食會員，將視同放棄領獎，恕不補發。
                        </div>
                      </div>

                      <div>
                        <div className='text-primary text-xl'>Q：第1名為什麼要提供身分證件？</div>
                        <div className='mb-5'>
                          A：因獎項價值高於新臺幣1,000元，需依中華民國相關法令辦理領獎程序。
                        </div>
                      </div>

                      <div>
                        <div className='text-primary text-xl'>
                          Q：為什麼我在排行榜上，但沒收到通知簡訊？
                        </div>
                        <div className='mb-5'>
                          A：請依照步驟調整相關設定
                          <br />
                          {'iOS手機：設定>APP>訊息>關閉「過濾未知的寄件人」。'}
                          <br />
                          {
                            'Android手機：Google訊息>點擊右上角頭像>訊息設定>保護與安全>關閉垃圾訊息阻擋。'
                          }
                          <br />
                          如仍未收到通知簡訊，可於每週一到週五10:00-18:00來電聯繫活動小組查詢(02）2517-6608#865。
                        </div>
                      </div>

                      <div>
                        <div className='text-primary text-xl'>
                          Q：要如何確認我有順利完成兌領50點參加獎？
                        </div>
                        <div className='mb-5'>
                          {'A：請在完成序號兌換24小時後，前往瘋美食app>瘋點數，查看累點紀錄。'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 注意事項 */}
                <div className='flex w-full flex-col items-start justify-start gap-0'>
                  <div className='flex w-full flex-row'>
                    <div className='bg-primary font-line-extraBold flex-1 px-4 py-2 text-2xl tracking-widest text-white'>
                      注意事項
                    </div>
                    <div className='arrow-2' />
                  </div>
                  <div className='bg-quaternary flex flex-col gap-5 p-4'>
                    <div>
                      <div>獎項內容：考生完成遊戲後即可獲得50點(1點=1元)王品瘋美食點數。</div>
                    </div>
                    <div>
                      領獎方式：
                      <ol>
                        <li className='before:content-["①"]'>
                          本活動獎項不得要求更換、轉讓或折換現金。
                        </li>
                        <li className='before:content-["②"]'>
                          領獎相關資料(包括但不限於姓名、電話、email等)，將作為本活動之聯繫、公告、領獎、後續處理、統計分析及紀錄等目的使用。為行銷、進行本活動及提供各項抽獎商品訊息之目的範圍內，將依法令規定蒐集、處理及利用參加本活動者之個人資料。
                        </li>
                        <li className='before:content-["③"]'>
                          依中華民國稅法規定，中獎者若為中華民國境內居住之個人，中獎價值超過新台幣1
                          ,000
                          元者，需繳交身分證正反面影本供報稅使用，年度報稅時將計個人所得，次年初執行單位將依稅法相關規定辦理開立扣繳憑單。
                        </li>
                        <li className='before:content-["④"]'>
                          中獎者若非中華民國境內居住之個人，不論中獎金額，須先就中獎所得扣繳20%機會中獎稅後，始發予中獎獎項，執行單位皆會開立扣繳憑單。中獎者若為未成年，應檢附戶籍謄本並提出法定代理人同意書。若中獎者不願提供資料或未依法預先繳納稅額，即視為放棄中獎資格，不得異議。前述稅法如有變動者，依當時之最新稅法規定辦理。
                        </li>
                        <li className='before:content-["⑤"]'>
                          瘋美食點數可用於王品集團旗下實體餐廳。
                        </li>
                        <li className='before:content-["⑥"]'>
                          活動贈送王品瘋美食點數使用效期為領取日期+45天。
                        </li>
                        <li className='before:content-["⑦"]'>
                          有效期間屆滿，未使用的點數將於到期日 23:59:59
                          自動失效，失效的點數恕不提供展延服務。
                        </li>
                        <li className='before:content-["⑧"]'>
                          若提供不實或錯誤資料、採用不正當手法（包含但不限於以機器人程式或其他影響公平機會獲獎），或有其他違反本活動辦法者，主辦單位有權取消其抽獎或中獎資格。獎項如已寄發，中獎者應自費返還主辦單位，並承擔相關法律責任。
                        </li>
                        <li className='before:content-["⑨"]'>
                          如遇不可抗力因素，主辦單位保有隨時修改活動辦法及獎項、終止本活動或變更同等價值商品等權利，且不須作出任何事前通知。其它未盡事宜，悉以本活動網站公告及主辦單位規定為準，王品瘋美食保留本活動之最終解釋權利。
                        </li>
                        <li className='before:content-["⑩"]'>
                          凡參加活動者，均視為遵守本領獎須知之各項規定。
                        </li>
                        <li className='before:content-["⑪"]'>
                          主辦單位擁有保留修改活動內容之權利，主辦單位得於粉絲專頁及官網公告調整活動內容，不另行通知。其他未盡事宜，以主辦單位解釋為準。
                        </li>
                        <li className='before:content-["⑫"]'>
                          瘋美食點數折抵辦法、折抵限制、餐點退貨後瘋點數計算辦法，請詳見2026瘋點數回饋活動內注意事項。
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Procedures;
