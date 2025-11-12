import React, { useEffect, useMemo, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

const ProjectImageCarousel = ({
  images = [],
  alt = '',
  aspectRatio,
  height = 'auto',
  sx = {},
  imageSx = {},
  showCounter = true,
}) => {
  const slides = useMemo(() => (images || []).filter(Boolean), [images]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
  }, [slides]);

  if (slides.length === 0) {
    return null;
  }

  const hasMultiple = slides.length > 1;

  const handlePrev = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        height,
        ...(aspectRatio ? { aspectRatio } : {}),
        ...sx,
      }}
    >
      <Box
        component="img"
        src={slides[current]}
        alt={`${alt}${hasMultiple ? ` (slide ${current + 1} of ${slides.length})` : ''}`}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          transition: 'opacity 0.4s ease',
          ...imageSx,
        }}
      />

      {hasMultiple && (
        <>
          <IconButton
            aria-label="Previous image"
            size="small"
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 12,
              transform: 'translateY(-50%)',
              color: '#FFFFFF',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
              },
            }}
          >
            <ArrowBackIosNew fontSize="inherit" />
          </IconButton>

          <IconButton
            aria-label="Next image"
            size="small"
            onClick={handleNext}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 12,
              transform: 'translateY(-50%)',
              color: '#FFFFFF',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
              },
            }}
          >
            <ArrowForwardIos fontSize="inherit" />
          </IconButton>
        </>
      )}

      {showCounter && hasMultiple && (
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            bottom: 12,
            right: 16,
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            color: '#FFFFFF',
            px: 1,
            py: 0.25,
            borderRadius: 1,
            letterSpacing: 0.5,
          }}
        >
          {current + 1} / {slides.length}
        </Typography>
      )}
    </Box>
  );
};

export default ProjectImageCarousel;
