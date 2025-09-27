import { useState, useEffect, useRef, useCallback } from 'react';

// Global flag to prevent double initialization in StrictMode
let globalInitialized = false;
let globalCleanup = null;

/**
 * Unified Loading Manager - Single Source of Truth
 * Handles all loading states, progress, and transitions in one place
 * Eliminates timing conflicts and double-triggering issues
 * Resilient to React StrictMode double-rendering
 */
const useLoadingManager = (videoSrc) => {
  // Core loading states
  const [phase, setPhase] = useState('initializing');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  // Refs for stable references
  const videoRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const hasStartedRef = useRef(false);
  const isCompleteRef = useRef(false);
  const setProgressRef = useRef(null);
  const maxProgressRef = useRef(0); // Track highest progress to prevent going backwards
  const currentStageRef = useRef('initial'); // Track current loading stage
  const heroReadyDispatchedRef = useRef(false);

  // Keep setProgress ref updated
  useEffect(() => {
    setProgressRef.current = setProgress;
  }, [setProgress]);

  // Progressive loading with real video progress tracking
  const updateProgress = useCallback((newProgress, stage = null) => {
    // Ensure progress never goes backwards (monotonic)
    if (newProgress > maxProgressRef.current) {
      maxProgressRef.current = newProgress;
      
      if (setProgressRef.current) {
        setProgressRef.current(newProgress);
      }
      
      if (stage) {
        currentStageRef.current = stage;
      }
      
      // Reduced logging - only log major milestones
      // if (newProgress % 10 === 0 || newProgress >= 85) {
      //   console.log(`📊 PROGRESS: ${newProgress.toFixed(1)}% (${currentStageRef.current})`);
      // }
    }
  }, []);

  // Stage 3: Final completion (85% → 100%) - MOVED UP FIRST
  const handleVideoReady = useCallback(() => {
    if (isCompleteRef.current) return;
    
    // console.log('🏁 STAGE 3: Final completion sequence (85% → 100%)');
    isCompleteRef.current = true;
    
    // Clear any existing timeouts
    if (progressIntervalRef.current) {
      clearTimeout(progressIntervalRef.current);
    }

    // Smooth completion to 100%
    let currentProgress = maxProgressRef.current;
    const targetProgress = 100;
    const steps = 10;
    const increment = (targetProgress - currentProgress) / steps;
    const stepDuration = 50; // Fast completion

    const animateCompletion = () => {
      currentProgress += increment;
      
      if (currentProgress >= targetProgress) {
        updateProgress(100, 'complete');
        setPhase('completing');
        
        // Show 100% briefly, then transition
        setTimeout(() => {
          setPhase('complete');
          
          setTimeout(() => {
            setPhase('hidden');
          }, 800);
        }, 600);
        return;
      }

      updateProgress(currentProgress, 'completing');
      setTimeout(animateCompletion, stepDuration);
    };

    animateCompletion();
  }, [updateProgress]);

  // Stage 2: Real video progress tracking (30% → 70%) - NOW AFTER handleVideoReady
  const trackVideoProgress = useCallback((video) => {
    // console.log('🎬 STAGE 2: Starting real video progress tracking (30% → 70%)');
    // console.log('📹 Video readyState:', video.readyState, 'networkState:', video.networkState);
    
    // Check if video is already loaded when we set up tracking
    if (video.readyState >= 3) { // HAVE_FUTURE_DATA or better
      // console.log('⚡ Video already loaded - fast-tracking to completion');
      updateProgress(70, 'video_ready');
      
      setTimeout(() => {
        updateProgress(85, 'video_complete');
        setTimeout(() => {
          handleVideoReady();
        }, 300);
      }, 500); // Small delay to show progress
      
      return () => {}; // No cleanup needed for fast path
    }
    
    const handleProgress = () => {
      if (video.buffered.length > 0 && video.duration) {
        const buffered = video.buffered.end(0);
        const duration = video.duration;
        const loadedPercent = (buffered / duration) * 100;
        
        // Map real progress (0-100%) to our stage range (30-70%)
        const stageProgress = 30 + (loadedPercent * 0.4); // 40% of total range
        
        updateProgress(stageProgress, 'video_loading');
      }
    };

    const handleLoadStart = () => {
      // console.log('🚀 Video started loading');
    };

    const handleCanPlay = () => {
      // console.log('🎯 Video can play - advancing to 70%');
      updateProgress(70, 'video_ready');
    };

    const handleCanPlayThrough = () => {
      // console.log('🎯 Video can play through - advancing to 85%');
      updateProgress(85, 'video_complete');
      
      // Start final completion sequence
      setTimeout(() => {
        handleVideoReady();
      }, 300); // Small delay to show 85%
    };

    const handleError = (e) => {
      // console.error('❌ VIDEO ERROR:', e);
      // Don't show error to user - just complete the loading sequence
      // Instead, complete the loading animation and show Hero without video
      // console.warn('Video failed to load - completing without video');
      updateProgress(85, 'video_complete');
      setTimeout(() => {
        handleVideoReady();
      }, 500);
    };

    // Add event listeners
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('error', handleError);
    };
  }, [updateProgress, handleVideoReady]);

  // Stage 1: Initial smooth animation (0% → 30%) - MOVED DOWN
  const startInitialProgress = useCallback(() => {
    if (progressIntervalRef.current) {
      clearTimeout(progressIntervalRef.current);
    }

    // console.log('🚀 STAGE 1: Starting initial progress animation (0% → 30%)');
    currentStageRef.current = 'initial';
    
    let currentProgress = 0;
    const targetProgress = 30;
    const duration = 1000; // 1 second to reach 30%
    const steps = 20;
    const increment = targetProgress / steps;
    const stepDuration = duration / steps;

    const animateInitial = () => {
      currentProgress += increment;
      
      if (currentProgress >= targetProgress) {
        updateProgress(targetProgress, 'initial_complete');
        // console.log('✅ STAGE 1 COMPLETE: Initial animation finished - Setting up video tracking');
        
        // NOW set up video tracking after Stage 1 completes
        if (videoRef.current) {
          const cleanupVideoTracking = trackVideoProgress(videoRef.current);
          // Store cleanup function for later use
          videoRef.current._cleanupTracking = cleanupVideoTracking;
        }
        return;
      }

      updateProgress(currentProgress, 'initial');
      progressIntervalRef.current = setTimeout(animateInitial, stepDuration);
    };

    animateInitial();
  }, [updateProgress, trackVideoProgress]);

  // Initialize video with progressive loading stages - STRICTMODE SAFE
  const initializeVideo = useCallback(() => {
    if (!videoRef.current || hasStartedRef.current) return;
    
    // Prevent double initialization in StrictMode
    if (globalInitialized) {
      console.log('🛡️ STRICTMODE PROTECTION: Skipping duplicate initialization');
      return globalCleanup;
    }
    
    globalInitialized = true;
    hasStartedRef.current = true;
    const video = videoRef.current;

    // console.log('🎬 Initializing video with progressive loading:', videoSrc);

    // Reset progress tracking
    maxProgressRef.current = 0;
    currentStageRef.current = 'initial';

    // Start loading sequence
    setPhase('loading');
    
    // Stage 1: Start initial progress animation (0% → 30%)
    // Video tracking will be set up AFTER Stage 1 completes
    startInitialProgress();

    // Error handling (set up immediately)
    const handleError = (e) => {
      // console.error('Video error:', e);
      // Don't show error to user - just complete the loading sequence
      // setError('Video failed to load');
      // setPhase('error');
      
      // Instead, complete the loading animation and show Hero without video
      // console.warn('Video failed to load - completing without video');
      updateProgress(85, 'video_complete');
      setTimeout(() => {
        handleVideoReady();
      }, 500);
    };

    video.addEventListener('error', handleError);

    // Start video loading (but don't track progress yet)
    video.src = videoSrc;
    video.load();

    // Cleanup function
    const cleanup = () => {
      // console.log('🧹 CLEANING UP: Resetting global state');
      globalInitialized = false;
      globalCleanup = null;
      
      // Clean up video tracking if it was set up
      if (video._cleanupTracking) {
        video._cleanupTracking();
      }
      
      video.removeEventListener('error', handleError);
      
      if (progressIntervalRef.current) {
        clearTimeout(progressIntervalRef.current);
      }
    };
    
    globalCleanup = cleanup;
    return cleanup;
  }, [videoSrc, startInitialProgress]);

  // Initialize once when video ref is available
  useEffect(() => {
    if (videoRef.current && !hasStartedRef.current) {
      const cleanup = initializeVideo();
      return cleanup;
    }
  }, [initializeVideo]);

  // Retry function - STRICTMODE SAFE
  const retry = useCallback(() => {
    // Reset global state
    globalInitialized = false;
    if (globalCleanup) {
      globalCleanup();
    }
    
    hasStartedRef.current = false;
    isCompleteRef.current = false;
    maxProgressRef.current = 0;
    currentStageRef.current = 'initial';
    setPhase('initializing');
    setProgress(0);
    setError(null);

    if (progressIntervalRef.current) {
      clearTimeout(progressIntervalRef.current);
    }

    // Clean up any existing video tracking
    if (videoRef.current && videoRef.current._cleanupTracking) {
      videoRef.current._cleanupTracking();
      videoRef.current._cleanupTracking = null;
    }

    if (videoRef.current) {
      initializeVideo();
    }
  }, [initializeVideo]);

  // Computed states for components
  const isLoading = phase === 'initializing' || phase === 'loading' || phase === 'completing';
  const isVisible = phase !== 'hidden';
  const showHero = phase === 'complete' || phase === 'hidden';
  const isCompleting = phase === 'completing';

  useEffect(() => {
    if (phase === 'hidden' && !heroReadyDispatchedRef.current) {
      heroReadyDispatchedRef.current = true;

      if (typeof window !== 'undefined') {
        window.__heroReady = true;
        window.dispatchEvent(new Event('hero:ready'));
      }
    }
  }, [phase]);

  return {
    videoRef,
    isLoading,
    isVisible,
    showHero,
    isCompleting,
    progress,
    error,
    phase,
    retry,
    _debug: {
      hasStarted: hasStartedRef.current,
      isComplete: isCompleteRef.current,
      phase
    }
  };
};

export default useLoadingManager;
