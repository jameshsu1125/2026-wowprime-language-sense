import { IReactProps } from '@/settings/type';
import Click from 'lesca-click';
import { useEffect, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';
import Large from './large';
import Rounded from './rounded';
import Skip from './skip';

type TRegularProps = IReactProps & {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ children, className, style, onClick, disabled }: TRegularProps) => {
  const id = useId();

  useEffect(() => {
    if (onClick) Click.add(`#${id}`, onClick);
    return () => {
      if (onClick) Click.remove(`#${id}`);
    };
  }, [id, onClick]);

  return (
    <button
      id={id}
      disabled={disabled}
      className={twMerge('btn w-full cursor-pointer', className)}
      style={style}
    >
      {children}
    </button>
  );
};

Button.large = Large;
Button.rounded = Rounded;
Button.Skip = Skip;

export default Button;
