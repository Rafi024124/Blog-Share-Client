import React from 'react';
import { TypeAnimation } from 'react-type-animation';

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
        overflow: 'hidden'
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        background: 'rgba(0, 0, 0, 0.4)', // semi-transparent black overlay
        zIndex: 1
    };

    const headingStyle = {
        fontSize: '3rem',
        fontWeight: 'bold',
        zIndex: 2,  // ensures it's above the overlay
        padding: '0 20px'
    };

    return (
        <div style={bannerStyle}>
            <div style={overlayStyle}></div>
            <h1 style={headingStyle}>
                <TypeAnimation
                    sequence={[
                        'Welcome to BlogShare!',
                        2000  // delay in ms
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={0}
                    style={{ display: 'inline-block' }}
                />
            </h1>
        </div>
    );
};

export default Banner;
