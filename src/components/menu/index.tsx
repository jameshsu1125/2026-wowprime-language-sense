import { memo, useEffect } from 'react';
import './index.less';

const Menu = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Menu'>
      <button className='burger' />
    </div>
  );
});
export default Menu;
