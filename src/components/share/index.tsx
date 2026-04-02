import useShare from '@/hooks/useShare';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { preloadImage } from '@/utils';
import { memo, useContext, useEffect, useMemo, useRef } from 'react';
import { SHARE_SIZE } from './config';
import bg from './img/bg.jpg';
import bronze from './img/bronze.png';
import gold from './img/gold.png';
import iron from './img/iron.png';
import silver from './img/silver.png';
import wood from './img/wood.png';

type TShareProps = {
  medalsID: string;
  ranking: string;
  score: number;
  nickname: string;
  onUploaded: (shareUrl: string, base64: string) => void;
};

const Share = memo(({ onUploaded, medalsID, ranking, score, nickname }: TShareProps) => {
  const [, setContext] = useContext(Context);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shareRes, share] = useShare();
  const captureRef = useRef<string>('');

  const medalsImage = useMemo(() => {
    switch (medalsID) {
      case 'gold':
        return gold;
      case 'silver':
        return silver;
      case 'bronze':
        return bronze;
      case 'iron':
        return iron;
      default:
        return wood;
    }
  }, [medalsID]);

  useEffect(() => {
    if (shareRes) {
      if (shareRes.status === 'success') {
        const { shareUrl } = shareRes;
        onUploaded(shareUrl, captureRef.current);
      }
    }
  }, [shareRes, onUploaded]);

  const onCapture = (base64: string | undefined) => {
    captureRef.current = base64 || '';

    // TODO: 這裡的 host 需要根據實際部署環境調整
    const host =
      window.location.hostname === 'localhost'
        ? 'https://wowprime-eattogether.netlify.app' // ? 'https://www.wowfms.com/event/eattogether/'
        : window.location.origin;

    // const host =
    //   window.location.hostname === 'localhost'
    //     ? 'https://www.wowfms.com/event/eattogether/' // 'https://wowprime-eattogether.netlify.app' // ? 'https://www.wowfms.com/event/eattogether/'
    //     : window.location.origin;

    const imageUrl = `${host}/img/meta-img.jpg`;
    const meta = {
      title: `${nickname}已獲得${score}分，你能超越他嗎？`,
      description: '加入「全民一起好好吃語感大會考」看看你能得幾分？',
      imageUrl,
    };
    share(meta);
  };

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });

    const ctx = canvasRef.current?.getContext('2d');
    const drawShareImage = async (imgs: HTMLImageElement[]) => {
      if (!ctx) return;
      imgs.forEach((img, index) => {
        if (index === 0) {
          ctx.drawImage(img, 0, 0, SHARE_SIZE.width, SHARE_SIZE.height);
        } else {
          const top = 281;
          const left = (SHARE_SIZE.width - img.width) / 2;
          ctx.drawImage(img, left, top, img.width, img.height);
        }
      });

      ctx.textAlign = 'left';
      // 考生：
      ctx.font = '56px line-bold';
      ctx.fillStyle = '#fff';
      ctx.letterSpacing = '0px';
      ctx.fillText(`考生：`, 210, 630);

      ctx.fillText(`你的分數：`, 210, 720);
      ctx.fillText(`目前排名：`, 210, 810);

      // nickname：
      ctx.font =
        '900 56px Noto Sans TC, "Microsoft JhengHei", "PingFang TC", "Helvetica Neue", Arial, sans-serif';
      ctx.fillText(`${nickname}`, 380, 630);

      // 名
      if (ranking !== '未上榜') {
        const rankingCharLength = String(ranking).length;
        const rankingOffset = rankingCharLength * 64;
        ctx.fillText(`名`, 492 + rankingOffset, 810);
      }

      // 分數：
      ctx.font = '78px line-bold';
      ctx.fillStyle = '#df032e';
      ctx.letterSpacing = '8px';
      ctx.fillText(`${score}`, 490, 728);

      // 排名：
      ctx.fillText(`${ranking}`, 490, 818);

      const base64 = canvasRef.current?.toDataURL('image/jpg', 1.0);
      onCapture(base64);
    };

    const imagesToPreload = [bg, medalsImage];
    Promise.all(imagesToPreload.map((src) => preloadImage(src)))
      .then((imgs) => {
        drawShareImage(imgs);
      })
      .catch((err) => {
        console.error('Error preloading images:', err);
      });

    return () => {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
    };
  }, []);

  return (
    <div className='invisible fixed top-0 left-0 z-20'>
      <canvas
        style={{ transform: `scale(0.45)`, transformOrigin: 'top left' }}
        ref={canvasRef}
        id='canvas'
        width={SHARE_SIZE.width}
        height={SHARE_SIZE.height}
      />
    </div>
  );
});
export default Share;
