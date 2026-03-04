const char = `
0123456789
abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ
+-~!@#$%^&*|}{}][]';":?><>/.,
最懂吃的你，能「一起好好吃」嗎？ 
開始測驗
`;

export const extractedCharacters = () => [...new Set(char)].join('');
