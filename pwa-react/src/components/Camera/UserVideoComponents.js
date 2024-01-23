import React from 'react';
import OpenViduVideoComponent from './OvVideo';

export default function UserVideoComponent({ streamManager,zi }) {
  return (
    <div>
      {streamManager !== undefined ? (
        <div>
          <OpenViduVideoComponent streamManager={streamManager} zi={zi}/>
        </div>
      ) : null}
    </div>
  );
}