import { useEffect, useState } from 'react';

const getInitialHeroReady = () =>
  typeof window !== 'undefined' && Boolean(window.__heroReady);

const useHeroReady = () => {
  const [isReady, setIsReady] = useState(getInitialHeroReady);

  useEffect(() => {
    if (isReady) {
      return undefined;
    }

    const handleHeroReady = () => {
      setIsReady(true);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('hero:ready', handleHeroReady, { once: true });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('hero:ready', handleHeroReady);
      }
    };
  }, [isReady]);

  return isReady;
};

export default useHeroReady;
