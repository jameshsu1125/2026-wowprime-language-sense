import { memo, useContext, useEffect } from 'react';
import './index.less';
import Button from '@/components/button';
import { HomeContext, HomePageType } from '../home/config';

const Landing = memo(() => {
  const [, setState] = useContext(HomeContext);
  useEffect(() => {}, []);
  return (
    <>
      <div className='Landing'>
        <div className='heading' />
        <div className='logo' />
        <div className='btn flex justify-center'>
          <div className='w-7/12'>
            <Button
              onClick={() => {
                setState((S) => ({ ...S, page: HomePageType.Examiner }));
              }}
            >
              <Button.large>
                <div className='btn-start' />
              </Button.large>
            </Button>
          </div>
        </div>
      </div>
      <div className='Pen' />
    </>
  );
});
export default Landing;
