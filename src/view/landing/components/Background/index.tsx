import React from "react";
import "./background.scss";
import BlobsTop from "@assets/images/icons/landing-blobs-top.png";

function Background() {
  return (
    <div className="landing-background">
      <div className="landing-background-blobs-top">
        <img alt="" src={BlobsTop} />
      </div>
    </div>
  );
}

export default Background;
