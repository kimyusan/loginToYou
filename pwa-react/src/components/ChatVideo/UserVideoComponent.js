import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";

export default function UserVideoComponent({ streamManager, zi, type }) {
  return (
    <div>
      {streamManager !== undefined ? (
        <div>
          <OpenViduVideoComponent
            streamManager={streamManager}
            zi={zi}
            type={type}
          />
        </div>
      ) : null}
    </div>
  );
}
