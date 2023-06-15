import React from 'react';
import Tilt from 'react-parallax-tilt';
import face from './face-logo.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2" style={{ height: 150, width: 150 }} glareEnable={true} glareMaxOpacity={0.8} glareColor="#ffffff">
        <div className="Tilt-inner pa3">
          <img style={{paddingTop: '5px'}} alt='logo' src={face}/>
        </div>
      </Tilt>
      
    </div>
  );
}

export default Logo;