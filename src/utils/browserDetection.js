/**
 * Browser Detection Utility
 * Detects browser type for optimal video format selection
 */
export const detectBrowser = () => {
  const userAgent = navigator.userAgent;

  // iOS Safari detection
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

  // iOS Safari detection (including desktop Safari on iOS devices)
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);

  // Android Chrome detection
  const isAndroid = /Android/i.test(userAgent);
  const isChrome = /Chrome/i.test(userAgent) && /Android/i.test(userAgent);

  // Desktop Chrome detection
  const isDesktopChrome = /Chrome/i.test(userAgent) && !/Android/i.test(userAgent);

  return {
    isIOS,
    isSafari,
    isAndroid,
    isChrome,
    isDesktopChrome,
    // Determine which video format to use
    videoFormat: isIOS || isSafari ? 'mp4' : 'mov',
    // Fallback to mp4 for any undetected browsers
    fallbackFormat: 'mp4'
  };
};
