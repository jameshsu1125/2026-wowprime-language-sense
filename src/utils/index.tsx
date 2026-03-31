type TShareProps = {
  image: string;
  score: number;
  nickname: string;
  url: string;
  onError?: () => void;
};

export function shareImage({ image, onError, score, nickname, url }: TShareProps) {
  if (navigator.share && navigator.canShare({ files: [new File([], 'share')] })) {
    fetch(image)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], 'WOW_PRIME.jpg', { type: 'image/jpeg' });
        const filesArray = [file];

        const shareData = {
          files: filesArray,
          title: `${nickname}已獲得${score}分，你能超越他嗎？`,
          text: `${nickname}已獲得${score}分，你能超越他嗎？\n加入「全民一起好好吃語感大會考」看看你能得幾分？`,
          url: url,
        };

        navigator
          .share(shareData)
          .then(() => console.log('Image shared successfully'))
          .catch((error) => console.error('Error sharing image:', error));
      })
      .catch((error) => console.error('Error fetching image:', error));
  } else {
    onError?.();
  }
}

export function shareURL({ onError }: { onError?: () => void }) {
  if (navigator.share) {
    const shareData = {
      title: '快來挑戰看看！',
      text: '你能打敗我嗎？',
      url: window.location.href,
    };
    navigator
      .share(shareData)
      .then(() => console.log('URL shared successfully'))
      .catch((error) => console.error('Error sharing URL:', error));
  } else {
    onError?.();
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getMedalsIDByRanking(ranking: string): string {
  if (ranking === '未上榜') return 'wood';
  const rank = Number(ranking);
  if (rank === 1) return 'gold';
  if (rank > 1 && rank <= 10) return 'silver';
  if (rank > 10 && rank <= 50) return 'bronze';
  if (rank > 50 && rank <= 100) return 'iron';
  return 'wood';
}

export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}
