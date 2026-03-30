export function shareImage({ image, onError }: { image: string; onError?: () => void }) {
  if (navigator.share && navigator.canShare({ files: [new File([], 'share')] })) {
    fetch(image)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], 'WOW_PRIME.jpg', { type: 'image/jpeg' });
        const filesArray = [file];

        const shareData = {
          files: filesArray,
          title: 'Check out this image!',
          text: 'Some additional text',
          url: window.location.href,
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
