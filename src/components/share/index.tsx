import useShare from '@/hooks/useShare';
import useUpload from '@/hooks/useUpload';
import { memo, useEffect, useRef } from 'react';

const Share = memo(({ onUploaded }: { onUploaded: (shareUrl: string) => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [uploadRes, upload] = useUpload();
  const [shareRes, share] = useShare();

  useEffect(() => {
    if (shareRes) {
      if (shareRes.status === 'success') {
        const { shareUrl } = shareRes;
        onUploaded(shareUrl);
      }
    }
  }, [shareRes, onUploaded]);

  useEffect(() => {
    if (uploadRes) {
      if (uploadRes.status === 'success') {
        const imageUrl = uploadRes.url || 'https://domain.com/uploads/xxx.png';
        const meta = {
          title: '我獲得了 2000 分！',
          description: '快來跟我一起玩遊戲拿大獎',
          imageUrl,
        };
        share(meta);
      }
    }
  }, [uploadRes]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    const drawShareImage = async () => {};
    if (!ctx) return;
    // 在 canvas 上繪製分享圖示
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, 1280, 720);
    ctx.fillStyle = '#333';
    ctx.font = '48px Arial';
    ctx.fillText('分享你的成績！', 400, 360);

    canvasRef.current?.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'share-image.png', { type: 'image/png' });
        const formData = new FormData();
        formData.append('file', file);
        upload(formData);
      }
    });

    drawShareImage();
  }, [upload]);

  return (
    <div className='fixed top-0 left-0'>
      <canvas
        style={{ transform: `scale(0.6)`, transformOrigin: 'top left' }}
        ref={canvasRef}
        id='canvas'
        width={1280}
        height={720}
      />
    </div>
  );
});
export default Share;
