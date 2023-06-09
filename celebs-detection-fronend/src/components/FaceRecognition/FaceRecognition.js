import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  if (box && imageUrl) {
    return (
      <div className='center ma'>
        <div className='absolute mt2'>
          <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto' />
          <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
          <div
            className="name-container"
            style={{
              position: 'absolute',
              top: box.topRow ? box.topRow - 30 : 0,
              right: box.rightCol - 30,
            }}>{box.name} {box.per && '|'} {box.per}</div>
        </div>
      </div>
    );
  }
  else {
    return null;
  }
}

export default FaceRecognition;