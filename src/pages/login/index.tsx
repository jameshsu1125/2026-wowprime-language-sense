import { memo, useCallback, useContext, useMemo, useState } from 'react';
import './index.less';
import Button from '@/components/button';
import { ValidatePhone } from 'lesca-validate';
import { twMerge } from 'tailwind-merge';
import { HomeContext, HomePageType } from '../home/config';

const TelValidate = memo(
  ({
    onChange,
    onAgree,
  }: {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAgree?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
    return (
      <div className='flex w-full flex-col items-center gap-2 px-5'>
        <div className='flex w-full justify-end pb-3'>
          <div>
            <button className='active:bg-primary w-full cursor-pointer rounded-lg bg-black px-4 py-2 text-white select-none hover:bg-gray-800'>
              發送驗證碼
            </button>
          </div>
        </div>
        <Group name='tel-validate' onChange={onChange} maxLength={6} />
        <div className='flex w-full justify-end'>
          <div>
            <button className='active:bg-primary w-full cursor-pointer rounded-lg bg-black px-4 py-2 text-white select-none hover:bg-gray-800'>
              重發驗證碼
            </button>
          </div>
        </div>
        <div className='flex w-full justify-center py-3'>
          <div className='flex flex-row gap-2 text-base whitespace-nowrap'>
            <input type='checkbox' id='agree' name='agree' onChange={onAgree} />
            我已詳閱並同意
            <a href='#' className='text-blue-500 underline underline-offset-2'>
              《個資告知事項暨同意書》
            </a>
          </div>
        </div>
      </div>
    );
  },
);

const Group = memo(
  ({
    name,
    defaultValue,
    onChange,
    maxLength = 10,
  }: {
    name: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxLength?: number;
  }) => {
    const labelName = useMemo(() => {
      switch (name) {
        default:
        case 'nickname':
          return '你的暱稱：';
        case 'tel':
          return '手機號碼：';
        case 'tel-validate':
          return '驗證碼：';
      }
    }, [name]);
    return (
      <div className='relative flex w-full flex-row items-center justify-center gap-2 px-5'>
        <label>{labelName}</label>
        <input
          type='text'
          placeholder={name === 'tel-validate' ? '請輸入簡訊驗證碼(OTP)' : ''}
          name={name}
          defaultValue={defaultValue || ''}
          onChange={onChange}
          maxLength={maxLength}
        />
      </div>
    );
  },
);

const Login = memo(() => {
  const [, setState] = useContext(HomeContext);
  const [userData, setUserData] = useState({ nickname: '', tel: '', code: '', isAgree: false });
  const [passed, setPassed] = useState(false);

  const checkValidate = useCallback(() => {
    if (userData.nickname === 'james') {
      setState((S) => ({ ...S, page: HomePageType.Game }));
      return;
    }
    if (!passed) {
      const isPhoneNumber = ValidatePhone(userData.tel);
      if (!isPhoneNumber) {
        alert('請輸入正確的手機號碼');
        return;
      }
      setPassed(true);
    } else {
      if (userData.code !== '' && userData.isAgree) {
        setState((S) => ({ ...S, page: HomePageType.Game }));
      } else {
        alert('請輸入驗證碼並同意相關條款');
      }
    }
  }, [userData, passed, setState]);

  return (
    <div className='Login'>
      <div className='flex w-full flex-col items-center justify-center gap-4'>
        <div className='heading pb-2' />
        <Group
          name='nickname'
          defaultValue={userData.nickname}
          onChange={(e) => {
            setUserData((S) => ({ ...S, nickname: e.target.value }));
          }}
          maxLength={10}
        />
        <Group
          name='tel'
          defaultValue={userData.tel}
          onChange={(e) => {
            setUserData((S) => ({ ...S, tel: e.target.value }));
          }}
          maxLength={10}
        />
        {passed && (
          <TelValidate
            onChange={(e) => {
              setUserData((S) => ({ ...S, code: e.target.value }));
            }}
            onAgree={(e) => {
              setUserData((S) => ({ ...S, isAgree: e.target.checked }));
            }}
          />
        )}
        <div className={twMerge('btn flex justify-center', !passed && 'mt-20')}>
          <div className='w-7/12'>
            <Button onClick={checkValidate}>
              <Button.large>
                <div className='btn-start' />
              </Button.large>
            </Button>
          </div>
        </div>
        <div className='flex w-full flex-col gap-4 px-5 text-base'>
          <p>
            ※參與本活動即可獲得參加獎－瘋美食50點序號一組手機號碼限領一次。限量33,000名，送完為止。
          </p>
          <p>{'※排行榜每週更新，前100名可獲得限定獎項一起爭取最高榮耀吧！'}</p>
        </div>
      </div>
    </div>
  );
});
export default Login;
