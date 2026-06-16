"use client";

import { useEffect, useState } from "react";
import { VideoBackground } from "./_ui/VideoBackground";

export default function Page() {
  return (
    <>
      <div className=" absolute top-0 left-0 w-full h-full select-none">
        <VideoBackground
          adsID={"#ads"}
          containerID={"#my-container"}
        ></VideoBackground>
      </div>

      <div
        id="my-container"
        className=" absolute top-0 left-0 w-full h-full z-20 overflow-scroll"
      >
        <Padding></Padding>
        <div id="ads">
          {/*  */}
          <div className="bg-white h-screen w-full">hi hello</div>
        </div>
      </div>
    </>
  );
}

function Padding({}) {
  let [height, setHeight] = useState("100vh");
  useEffect(() => {
    setHeight(`${window.innerHeight}px`);
    let tt = () => {
      setHeight(`${window.innerHeight}px`);
    };
    window.addEventListener("resize", tt);
    return () => {
      window.removeEventListener("resize", tt);
    };
  }, []);

  return (
    <>
      <div className="w-full select-none" style={{ height: height }}></div>
      <div className="w-full select-none" style={{ height: height }}></div>
      <div className="w-full select-none" style={{ height: height }}></div>
      <div className="w-full select-none" style={{ height: height }}>
        <div className="flex items-center justify-center h-full w-full"></div>
      </div>
      <div className="w-full select-none" style={{ height: height }}>
        <div className="flex items-center justify-center h-full w-full"></div>
      </div>
      <div className="w-full select-none" style={{ height: height }}></div>
    </>
  );
}
