import { IReactProps } from '@/settings/type';

export type ContainProps = IReactProps & {
  imageURL: string;
  hidden?: boolean;
  IsHiddenDialogImage?: boolean;
  isMoreInfo?: boolean;
};
