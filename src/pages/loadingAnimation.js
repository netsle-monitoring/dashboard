import React from "react";
import { ReactComponent as NetsleLogo } from "../logo.svg";
import "./loadingAnimation.css";

const LoadingAnimation = () => {
  return (
    <div class="flex h-screen bg-gray-800">
      <div className="m-auto">
        <div style={{marginRight: 150, marginBottom: "12vh"}}>
          <span
            class="first_dot"
            style={{
              position: "absolute",
              width: 110,
              marginTop: 20,
              marginLeft: 20,
              height: 110,
              borderRadius: "50%",
              backgroundColor: "#fff",
              zIndex: 2
            }}
          ></span>
          <span
            class="sec_dot"
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              backgroundColor: "#bbb",
              position: "absolute",
              zIndex: 1
            }}
          ></span>
        <NetsleLogo
          className="loading"
          style={{
            width: 140,
            height: 140,
            marginLeft: 5,
            marginTop: 5,
            color: "white",
            position: "absolute",
            zIndex: 3
          }}
        />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
