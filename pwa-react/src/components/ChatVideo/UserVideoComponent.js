import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";

export default function UserVideoComponent({ streamManager, type }) {
  return (
    <div>
      {streamManager !== undefined ? (
        <div>
          <OpenViduVideoComponent
            streamManager={streamManager}
            type={type}
          />
        </div>
      ) : null}
    </div>
  );
}
