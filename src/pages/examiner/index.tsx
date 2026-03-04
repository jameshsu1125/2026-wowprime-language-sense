import { memo, useContext, useEffect } from 'react';
import { HomeContext, HomePageType } from '../home/config';
import './index.less';

const Examiner = memo(() => {
  const [, setState] = useContext(HomeContext);
  useEffect(() => {}, []);
  return (
    <div className='Examiner'>
      <div className='video'>
        <div>
          <div>
            <div className='cover' />
          </div>
        </div>
      </div>
      <div className='frame'>
        <div>
          <div>
            <div className='subtitle' />
            <button
              className='play-button'
              onClick={() => {
                setState((S) => ({ ...S, page: HomePageType.Game }));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
export default Examiner;
