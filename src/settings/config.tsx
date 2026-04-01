export const PAGE = {
  home: 'home',
};

export const REST_PATH = {
  login: 'auth/login',
  verify: 'auth/verify',
  down: 'event/done',
  weeks: 'event/weeks',
  ranking: 'event/ranking',
  upload: 'upload',
  share: 'share/create',
  status: 'auth/status',
};

export const SETTING = {
  checkAnswerReactDuration: 2000,
};

export const IS_TEST = false;

export const LOGIN_SECTION_DURATION = 24 * 60 * 60 * 1000; // 1 day
export const SMS_RESEND_DURATION = {
  relaxed: 2 * 60 * 1000, // 2 minutes
  strict: 3 * 60 * 1000, // 3 minutes
};

export const CONTAIN_RATIO = { width: 490, height: 790 };
export const MINI_HEIGHT = { mobile: 900, desktop: 700 };

export const ANNOUNCEMENT_TIMES = [
  new Date('2026-03-29T10:00:00+08:00'),
  new Date('2026-04-20T10:00:00+08:00'),
  new Date('2026-04-27T10:00:00+08:00'),
  new Date('2026-05-04T10:00:00+08:00'),
  new Date('2026-05-11T10:00:00+08:00'),
  new Date('2026-05-18T10:00:00+08:00'),
];

export const PARTICIPATION_AWARD_HAVE_ALL_BEEN_SENT_OUT_MESSAGE = (
  <>
    <p className='py-2'>
      感謝支持！🎉
      <br />
      本會考的參加獎50點瘋點數
      <br />
      已全數發送完畢
    </p>
    <p className='py-2'>
      週百大排名獎持續進行中！
      <br />
      敬請繼續拚積分拿點數💪
    </p>
  </>
);
