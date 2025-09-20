import { useState, useEffect, useRef, useCallback } from 'react';

// Video quality presets based on device capabilities
const VIDEO_QUALITIES = {
  ultra: { width: 1920, height: 1080, bitrate: '4M', suffix: '_4k' },
  high: { width: 1280, height: 720, bitrate: '2M', suffix: '_hd' },
  medium: { width: 854, height: 480, bitrate: '1M', suffix: '_sd' },
  low: { width: 640, height: 360, bitrate: '500k', suffix: '_mobile' }
};

const CONNECTION_SPEEDS = {
  slow: 'slow',    // < 1 Mbps
  medium: 'medium', // 1-5 Mbps
  fast: 'fast',    // > 5 Mbps
  unknown: 'unknown'
};

const useVideoOptimization = (baseVideoSrc) => {
  const [videoQuality, setVideoQuality] = useState('medium');
  const [connectionSpeed, setConnectionSpeed] = useState(CONNECTION_SPEEDS.unknown);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [bufferHealth, setBufferHealth] = useState(0);

  const videoRef = useRef(null);
  const qualityCheckTimeoutRef = useRef(null);
  const bufferMonitorRef = useRef(null);
  const retryCountRef = useRef(0);
  const hasInitializedRef = useRef(false); // Prevent quality switching after initial load
  const maxRetries = 3;

  // Memoized video ready callback with guard to prevent double-triggering
  const handleVideoReady = useCallback(() => {
    console.log('Video optimization system reports ready');
    // Only set loading to false if currently loading (prevents double-triggering)
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [isLoading]);

  // Detect device capabilities and connection speed
  const detectCapabilities = useCallback(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    let detectedConnection = CONNECTION_SPEEDS.unknown;

    if (connection) {
      // Detect connection speed
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        detectedConnection = CONNECTION_SPEEDS.slow;
      } else if (connection.effectiveType === '3g') {
        detectedConnection = CONNECTION_SPEEDS.medium;
      } else if (connection.effectiveType === '4g') {
        detectedConnection = CONNECTION_SPEEDS.fast;
      }

      setConnectionSpeed(detectedConnection);
    }

    // Detect device capabilities
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const devicePixelRatio = window.devicePixelRatio || 1;

    let detectedQuality = 'medium';

    // Ultra high quality for high-end devices with fast connection
    if (screenWidth >= 1920 && devicePixelRatio >= 2 && detectedConnection === CONNECTION_SPEEDS.fast) {
      detectedQuality = 'ultra';
    }
    // High quality for decent devices
    else if (screenWidth >= 1280 && devicePixelRatio >= 1.5 && detectedConnection !== CONNECTION_SPEEDS.slow) {
      detectedQuality = 'high';
    }
    // Low quality for slow connections or small devices
    else if (detectedConnection === CONNECTION_SPEEDS.slow || screenWidth < 768) {
      detectedQuality = 'low';
    }

    setVideoQuality(detectedQuality);
    return { connection: detectedConnection, quality: detectedQuality };
  }, []);

  // Generate video source based on quality
  const getVideoSrc = useCallback((quality) => {
    if (!baseVideoSrc) return '';

    const basePath = baseVideoSrc.replace(/\.[^/.]+$/, ''); // Remove extension
    const extension = baseVideoSrc.split('.').pop();

    // For now, return base video - in production you'd have multiple quality versions
    return baseVideoSrc;
  }, [baseVideoSrc]);

  // Monitor buffer health
  const monitorBuffer = useCallback(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const buffered = video.buffered;
    const currentTime = video.currentTime;
    const duration = video.duration;

    if (buffered.length > 0 && duration > 0) {
      // Find the buffer range that contains current time
      for (let i = 0; i < buffered.length; i++) {
        if (currentTime >= buffered.start(i) && currentTime <= buffered.end(i)) {
          const bufferedAhead = buffered.end(i) - currentTime;
          const bufferHealthScore = Math.min(100, (bufferedAhead / 10) * 100); // 10 seconds buffer = 100%
          setBufferHealth(bufferHealthScore);
          break;
        }
      }
    }
  }, []);

  // Smart retry mechanism
  const retryWithFallback = useCallback(() => {
    if (retryCountRef.current >= maxRetries) {
      setLoadError('Video failed to load after multiple attempts');
      setIsLoading(false);
      return;
    }

    retryCountRef.current++;
    console.log(`Retrying video load (attempt ${retryCountRef.current}/${maxRetries})`);

    // Try lower quality on retry
    const qualities = ['ultra', 'high', 'medium', 'low'];
    const currentQualityIndex = qualities.indexOf(videoQuality);
    if (currentQualityIndex < qualities.length - 1) {
      setVideoQuality(qualities[currentQualityIndex + 1]);
    }

    // Reset states
    setLoadError(null);
    setIsLoading(true);
  }, [videoQuality]);

  // Initialize video with optimization
  const initializeVideo = useCallback(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const capabilities = detectCapabilities();

    console.log('Video optimization initialized:', {
      connection: capabilities.connection,
      quality: capabilities.quality,
      videoSrc: getVideoSrc(capabilities.quality)
    });

    // Set video source based on detected quality
    const optimizedSrc = getVideoSrc(capabilities.quality);
    if (optimizedSrc) {
      video.src = optimizedSrc;
    }

    // Sophisticated loading phases
    const handleLoadStart = () => {
      console.log('Video loading started');
      // Only set loading if not already loading to prevent flickering
      if (!isLoading) {
        setIsLoading(true);
      }
      setLoadError(null);
      retryCountRef.current = 0;
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const buffered = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          const progressPercent = (buffered / duration) * 100;
          // Progress is handled by VideoLoadingOverlay
        }
      }
    };

    const handleCanPlay = () => {
      console.log('Video can play');
      // Start buffer monitoring
      if (bufferMonitorRef.current) {
        clearInterval(bufferMonitorRef.current);
      }
      bufferMonitorRef.current = setInterval(monitorBuffer, 1000);
    };

    const handleCanPlayThrough = () => {
      console.log('Video can play through completely');
      handleVideoReady(); // Call the hook-level callback
    };

    const handleError = (error) => {
      console.error('Video loading error:', error);
      setLoadError(`Video failed to load (attempt ${retryCountRef.current + 1})`);

      // Try fallback strategy
      setTimeout(() => {
        retryWithFallback();
      }, 1000);
    };

    const handleStalled = () => {
      console.log('Video stalled, monitoring buffer...');
      // Buffer monitoring will handle this
    };

    const handleWaiting = () => {
      console.log('Video waiting for data...');
      // Monitor buffer health and potentially pause other operations
    };

    // Add event listeners
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('error', handleError);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('waiting', handleWaiting);

    // Start loading
    video.load();

    // Cleanup function
    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('error', handleError);
      video.removeEventListener('stalled', handleStalled);
      video.removeEventListener('waiting', handleWaiting);

      if (bufferMonitorRef.current) {
        clearInterval(bufferMonitorRef.current);
      }
    };
  }, [detectCapabilities, getVideoSrc, monitorBuffer, retryWithFallback]);

  // Initialize on mount - use ref to prevent double initialization
  useEffect(() => {
    if (!hasInitializedRef.current && videoRef.current) {
      hasInitializedRef.current = true;
      const cleanup = initializeVideo();
      return cleanup;
    }
  }, [initializeVideo]); // Keep original dependencies but use ref guard

  // Handle quality changes - DISABLED after initial load to prevent flickering
  useEffect(() => {
    // Only allow quality changes if not yet initialized (prevents post-load switching)
    if (videoRef.current && !isLoading && !hasInitializedRef.current) {
      const video = videoRef.current;
      const newSrc = getVideoSrc(videoQuality);
      if (newSrc && newSrc !== video.src) {
        console.log(`Switching video quality to: ${videoQuality}`);
        setIsLoading(true);
        video.src = newSrc;
        video.load();
      }
    }
  }, [videoQuality, getVideoSrc, isLoading]);

  return {
    videoRef,
    videoQuality,
    connectionSpeed,
    isLoading,
    loadError,
    bufferHealth,
    getVideoSrc: (quality) => getVideoSrc(quality),
    retryLoad: retryWithFallback,
    handleVideoReady
  };
};

export default useVideoOptimization;
