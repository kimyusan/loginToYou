import React from 'react';
import OpenViduVideoComponent1 from './OvVideo1';

export default function UserVideoComponent1({ streamManager,zi }) {
  return (
    <div>
      {streamManager !== undefined ? (
        <div>
          <OpenViduVideoComponent1 streamManager={streamManager} zi={zi}/>
        </div>
      ) : null}
    </div>
  );
}