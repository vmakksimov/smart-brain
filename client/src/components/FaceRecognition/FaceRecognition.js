import React from 'react';
import './FaceRecognition.css';
import Faces from './Faces';

const FaceRecognition = ({ imageUrl, box }) => {
  console.log("face recognition", box)
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        {box.map(faces => <Faces key={faces.topRow} box={faces}/>)}
      </div>
    </div>
  );
}

export default FaceRecognition;