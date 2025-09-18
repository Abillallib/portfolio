import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const ShineText = styled(motion.span)({
  display: 'inline-block',
  position: 'relative',
  background: 'linear-gradient(90deg, #FFF 0%, #FFB74D 20%, #FF9800 40%, #FFB74D 60%, #FFF 80%)',
  backgroundSize: '200% auto',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'shine 10s linear infinite',
  '@keyframes shine': {
    '0%': {
      backgroundPosition: '300% center',
    },
    '100%': {
      backgroundPosition: '-300% center',
    },
  },
});

const Spark = styled('span')({
  position: 'absolute',
  display: 'block',
  width: '4px',
  height: '4px',
  background: '#FFD700',
  borderRadius: '50%',
  pointerEvents: 'none',
  opacity: 0,
  filter: 'drop-shadow(0 0 4px #FFA500)',
  animation: 'spark 2s ease-out infinite',
  '@keyframes spark': {
    '0%': {
      transform: 'scale(0.5)',
      opacity: 0,
    },
    '10%': {
      opacity: 1,
    },
    '30%': {
      transform: 'scale(1.2)',
    },
    '100%': {
      transform: 'translate(var(--tx, 0), var(--ty, 0)) scale(0.2)',
      opacity: 0,
    },
  },
});

const AnimatedTitle = ({ children, variant = 'h2', component = 'h2', sx = {} }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [sparks, setSparks] = React.useState([]);
  const hasAnimated = React.useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      controls.start('visible');
      
      // Create spark elements periodically
      const interval = setInterval(() => {
        const newSpark = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          tx: (Math.random() - 0.5) * 100,
          ty: (Math.random() - 0.5) * 100,
          delay: Math.random() * 2,
          duration: 1 + Math.random() * 2,
        };
        
        setSparks(prev => [...prev, newSpark]);
        
        // Remove spark after animation
        setTimeout(() => {
          setSparks(prev => prev.filter(spark => spark.id !== newSpark.id));
        }, 3000);
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: {
      opacity: 0,
      x: 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.45,
        type: 'spring',
        stiffness: 140,
        damping: 18,
        mass: 1.0,
      },
    },
  };
  
  const textShadow = '0 4px 8px rgba(0,0,0,0.3), 0 6px 12px rgba(0,0,0,0.2)';

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      style={{
        display: 'inline-block',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <Typography
        variant={variant}
        component={component}
        sx={{
          ...sx,
          display: 'inline-block',
          transformStyle: 'preserve-3d',
          textTransform: 'uppercase',
          position: 'relative',
          textShadow: textShadow,
          '&:hover': {
            transform: 'translateZ(20px)',
            '& .shine-text': {
              textShadow: '0 0 15px rgba(255, 200, 0, 0.7)'
            }
          },
          transition: 'all 0.3s ease-out',
        }}
      >
        <div style={{ 
          position: 'relative', 
          display: 'inline-block',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}>
          <ShineText
            className="shine-text"
            style={{
              display: 'inline-block',
              transform: 'translateZ(30px)',
              position: 'relative',
              zIndex: 1,
              transition: 'all 0.4s ease-out',
              textShadow: '0 0 10px rgba(255, 200, 0, 0.5)',
            }}
          >
            {children}
          </ShineText>
          {sparks.map((spark) => (
            <Spark
              key={spark.id}
              style={{
                left: `${spark.x}%`,
                top: `${spark.y}%`,
                '--tx': `${spark.tx}px`,
                '--ty': `${spark.ty}px`,
                animationDelay: `${spark.delay}s`,
                animationDuration: `${spark.duration}s`,
              }}
            />
          ))}
        </div>
      </Typography>
    </motion.div>
  );
};

export default AnimatedTitle;
