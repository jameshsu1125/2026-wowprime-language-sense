export const getDetailsByMedals = (medals: string) => {
  switch (medals) {
    case 'gold':
      return (
        <>
          看來最大獎將會是我的了!
          <br />
          放膽來贏過我吧!
        </>
      );
    case 'silver':
      return (
        <>
          身為語感天才900點小意思!
          <br />
          但抱歉，我會搶下17,000點的!
        </>
      );
    case 'bronze':
      return (
        <>
          看來我品學兼優又懂事懂吃!
          <br />
          休想來擠掉我的排名!
        </>
      );
    case 'iron':
      return (
        <>
          同學們快來拚分拿點數囉!
          <br />
          我們下次聚餐就靠大家了!
        </>
      );
    default:
      return (
        <>
          一定是學習太孤單了!
          <br />
          徵求學伴和我一起加油!
        </>
      );
  }
};
