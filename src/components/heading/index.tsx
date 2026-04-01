import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import './index.less';

const H2 = memo(({ children, style }: IReactProps & { style?: React.CSSProperties }) => (
  <div className='HeadingH2' style={style}>
    <div>
      <div>
        <div>{children}</div>
      </div>
    </div>
  </div>
));

const H1 = memo(({ children, style }: IReactProps & { style?: React.CSSProperties }) => (
  <div className='HeadingH1' style={style}>
    <div>
      <div>
        <div>{children}</div>
      </div>
    </div>
  </div>
));

const LI = memo(
  ({
    children,
    style,
    listItem,
  }: IReactProps & { style?: React.CSSProperties; listItem?: string }) => (
    <div className='HeadingLI' style={style}>
      <div>{listItem}</div>
      <div>{children}</div>
    </div>
  ),
);

const Heading = {
  H1,
  H2,
  LI,
};

export default Heading;
