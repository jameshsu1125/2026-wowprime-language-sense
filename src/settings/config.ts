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

export const LOGIN_SECTION_TIME = 24 * 60 * 60 * 1000; // 1 day
export const SMS_RESEND_TIME = 2 * 60 * 1000; // 2 minutes

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
