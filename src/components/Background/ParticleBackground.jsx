import React from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

const ParticleBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      backgroundColor: '#0a0e1a' // Dark blue background
    }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fpsLimit: 30,
          particles: {
            number: {
              value: 15, // Reduced number of particles for subtlety
              density: {
                enable: true,
                area: 800
              }
            },
            color: {
              value: '#2bd0bd' // Solid teal color
            },
            shape: {
              type: 'circle'
            },
            opacity: {
              value: 0.5,
              random: true,
              animation: {
                enable: true,
                speed: 3,
                minimumValue: 0.1,
                sync: false
              }
            },
            size: {
              value: { min: 1, max: 4 },
              random: true
            },
            links: {
              color: '#2bd0bd', // Teal connections
              opacity: 0.4,
              distance: 120,
              enable: true,
              opacity: 0.4,
              width: 1,
              warp: true,
              triangles: {
                enable: true,
                opacity: 0.1
              },
              type: 'cubic' // Cubic connections
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: 'none',
              random: false,
              straight: false,
              outModes: {
                default: 'bounce'
              }
            }
          },
          interactivity: {
            detectsOn: 'canvas',
            events: {
              onHover: {
                enable: false
              },
              onClick: {
                enable: false
              },
              resize: true
            }
          },
          detectRetina: true
        }}
      />
    </div>
  );
};

export default ParticleBackground;
