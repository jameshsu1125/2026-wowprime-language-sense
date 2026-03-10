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
