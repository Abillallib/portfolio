import { useEffect, useMemo } from 'react';

const uniqueUrls = (urls = []) => Array.from(new Set(urls.filter(Boolean)));

const preloadImages = (urls) => {
  urls.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const usePreloadImages = (urls = [], options = {}) => {
  const { delay = 0, enabled = true } = options;

  const memoizedUrls = useMemo(() => uniqueUrls(urls), [urls]);

  useEffect(() => {
    if (!enabled || memoizedUrls.length === 0) return undefined;

    const executePreload = () => {
      if (typeof window === 'undefined') return;

      const startPreload = () => preloadImages(memoizedUrls);

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(startPreload, { timeout: 1000 });
      } else {
        startPreload();
      }
    };

    const timeoutId = window.setTimeout(executePreload, delay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [memoizedUrls, delay, enabled]);
};

export default usePreloadImages;
