import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='black fw7 f3'>
        {`${name}, the number of celebrities you have identified so far is:`}
      </div>
      <div className='black f1 fw8'>
        {entries}
      </div>
    </div>
  );
}

export default Rank;