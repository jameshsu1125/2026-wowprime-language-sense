import { memo } from 'react';
import Burger from './burger';
import './index.less';

const Menu = memo(() => {
  return (
    <div className='Menu'>
      <Burger />
    </div>
  );
});
export default Menu;
