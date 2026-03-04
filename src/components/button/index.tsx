import { IReactProps } from '@/settings/type';
import Large from './large';
import { twMerge } from 'tailwind-merge';
import { useEffect, useId } from 'react';
import './index.less';
import Click from 'lesca-click';

type TRegularProps = IReactProps & {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const Button = ({ children, className, style, onClick }: TRegularProps) => {
  const id = useId();

  useEffect(() => {
    if (onClick) Click.add(`#${id}`, onClick);
    return () => {
      if (onClick) Click.remove(`#${id}`);
    };
  }, [id]);

  return (
    <button id={id} className={twMerge('btn w-full cursor-pointer', className)} style={style}>
      {children}
    </button>
  );
};

Button.large = Large;

export default Button;
