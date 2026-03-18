export function shareImage(image: string) {
  if (navigator.share && navigator.canShare({ files: [new File([], 'share')] })) {
    // Fetch the image and convert to a File object
    fetch(image)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], 'picture.jpg', { type: 'image/jpeg' });
        const filesArray = [file];

        // Data to be shared
        const shareData = {
          files: filesArray,
          title: 'Check out this image!',
          text: 'Some additional text',
          url: window.location.href,
        };

        // Call the share method
        navigator
          .share(shareData)
          .then(() => console.log('Image shared successfully'))
          .catch((error) => console.error('Error sharing image:', error));
      })
      .catch((error) => console.error('Error fetching image:', error));
  } else {
    // Fallback for browsers that do not support the API or file sharing
    console.log('Web Share API not supported or cannot share files.');
  }
}

export function shareURL() {
  if (navigator.share) {
    // Data to be shared
    const shareData = {
      title: 'this is a title',
      text: 'Some additional text',
      url: window.location.href,
    };
    navigator
      .share(shareData)
      .then(() => console.log('Image shared successfully'))
      .catch((error) => console.error('Error sharing image:', error));
  } else {
    alert('我們目前只支援行動裝置的分享功能，請使用手機開啟此頁面進行分享！');
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
  const rank = Number(ranking);
  if (rank === 1) return 'gold';
  if (rank > 1 && rank <= 10) return 'silver';
  if (rank > 10 && rank <= 50) return 'bronze';
  if (rank > 50 && rank <= 100) return 'iron';
  return 'wood';
}
