import React from 'react';

const Navigation = ( {onRouteChange} ) => {
  return(
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signin')} className="f3 dim underline pa3 white bg-gold">Sign Out</p>
      </nav>
  );
}

export default Navigation;