import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion as Motion } from 'framer-motion';

const Banner = () => {
  const bannerStyle = {
    backgroundImage: 'url(/banner.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '400px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    color: '#fff',
    textAlign: 'center',
    overflow: 'hidden',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    background: 'rgba(0, 0, 0, 0.4)', // semi-transparent black overlay
    zIndex: 1,
  };

  const headingStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    zIndex: 2, // ensures it's above the overlay
    padding: '0 20px',
  };

  return (
    <div style={bannerStyle}>
      <div style={overlayStyle}></div>

      <Motion.h1
        style={headingStyle}
        animate={{
          textShadow: [
            "0 0 10px rgba(255, 192, 203, 0.6)", 
            "0 0 20px rgba(255, 105, 180, 1)",  
            "0 0 10px rgba(255, 192, 203, 0.6)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <TypeAnimation
          sequence={["Welcome to BlogShare!", 2000]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{ display: "inline-block" }}
        />
      </Motion.h1>
    </div>
  );
};

export default Banner;
