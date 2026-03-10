import { memo, useEffect, useId } from 'react';
import img from './img/share.png';
import './index.less';
import Click from 'lesca-click';
import { shareImage } from '@/utils';

const Taiko = memo(() => {
  const id = useId();
  useEffect(() => {
    Click.add(`#${id}`, () => {
      shareImage(img);
    });
  }, []);
  return (
    <div className='Taiko flex h-full w-full items-center justify-center'>
      <img id={id} src={img} />
    </div>
  );
});
export default Taiko;
