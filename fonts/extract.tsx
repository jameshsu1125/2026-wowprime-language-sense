const char = `
0123456789
abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ
+-~!@#$%^&*|}{}][]';":?><>/.,
最懂吃的你，能「一起好好吃」嗎？ 
開始測驗考生：
考生：松山蔡依林
你的分數：
目前排行：     名分數揭曉恭喜你獲得瘋美食點數
快分享結果並依步驟領取獎勵!點分享結果領取獎勵週週關注榜單，每週名次最高
可直接獲得瘋美食點數領取獎勵恭喜松山蔡依林獲得
參加獎瘋美食點數
您的專屬兌換序號加下：
複製
請到王品瘋美食輸入序號兌換
`;

export const extractedCharacters = () => [...new Set(char)].join('');
