import React from 'react';
import Particles from 'react-tsparticles';

function ParticlesTest() {
  return (
    <div>
      <Particles
        id="tsparticles"
        options={{
          particles: {
            number: {
              value: 50,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: 3,
            },
            opacity: {
              value: 0.5,
            },
            move: {
              enable: true,
              speed: 1,
              direction: 'none',
              random: true,
            },
          },
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export default ParticlesTest;
