import { HomeContext, HomePageType } from '@/pages/home/config';
import { memo, useContext } from 'react';
import './moreInfo.less';

const MoreInfo = memo(({ scale }: { scale: number }) => {
  const [{ page }] = useContext(HomeContext);

  if (page !== HomePageType.Examiner && page !== HomePageType.Login) return null;

  return (
    <div className='MoreInfo'>
      <div style={{ transform: `scale(${scale})` }}>
        <div>2026/5/3為止</div>
        <div>
          每週分數最高
          <div>
            獨得<span>17,000</span>
          </div>
          點
        </div>
        <div>(瘋美食點數1點=1元，成為王品瘋美食會員即可領取點數，詳情請見活動說明)</div>
      </div>
    </div>
  );
});
export default MoreInfo;
