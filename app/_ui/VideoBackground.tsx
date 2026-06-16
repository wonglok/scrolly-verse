// @ts-nocheck
"use client";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

/* The encoding is super important here to enable frame-by-frame scrubbing. */

// GOOD QUALITY
// ffmpeg -i ./input.mp4 -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4

// LOWER QUALITY
// ffmpeg -i ./input.mp4 -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output_960.mp4

// first frame
// ffmpeg -i output.mp4 -frames:v 1 first.jpg

// last frame
// ffmpeg -sseof -1 -i output.mp4 -update 1 -q:v 2 last.jpg

//
export function VideoBackground({
  containerID = "#my-container",
  adsID = "",
  content,
}: {
  adsID: string;
  containerID: string;
  content?: ReactNode | null;
}) {
  const [url, setURL] = useState("");
  const [tl, setTimeline] = useState(false);
  // const refVideo = useRef<HTMLVideoElement>(null);
  // const refContainer = useRef(null);
  useEffect(() => {
    // if (!refVideo?.current) {
    //   return;
    // }

    function once(
      el: HTMLElement,
      event: Record<string, any>,
      fn: () => void,
      opts?: any,
    ) {
      var onceFn = function (e) {
        el.removeEventListener(event, onceFn);
        fn.apply(this, arguments);
      };

      el.addEventListener(event, onceFn, opts);
      return onceFn;
    }

    once(document.documentElement, "touchstart", async function (e) {
      let ttt = setInterval(() => {
        let video = document.querySelector("#vid");
        if (video) {
          clearInterval(ttt);
          video.play();
          setTimeout(() => {
            video.pause();
          });
        }
      }, 1);
    });

    {
      let ttt = setInterval(() => {
        let video = document.querySelector("#vid");
        if (video) {
          clearInterval(ttt);

          once(video, "play", async function (e) {
            //

            video.pause();

            //
            //
          });
        }
      }, 1);
    }

    {
      let ttt = setInterval(() => {
        let container = document.querySelector(containerID) as HTMLDivElement;

        let video = document.querySelector("#vid");
        let ads = document.querySelector(adsID);
        if (video && ads && container && video.duration) {
          clearInterval(ttt);
          //
          container.addEventListener("scroll", (ev) => {
            let scrollTop = container.scrollTop;
            let winHeight = window.innerHeight;

            let scrollHeight = container.scrollHeight;

            let adsHeight = ads.clientHeight;
            let total = scrollHeight - winHeight - adsHeight;

            let progress = scrollTop / total;

            if (progress >= 0.995) {
              progress = 0.995;
            }
            // console.log(scrollTop / total);

            video.currentTime = (video.duration || 1) * progress;
          });
          //
        }
      }, 1);
    }

    /* ---------------------------------- */
    /* Scroll Control! */

    gsap.registerPlugin(ScrollTrigger);

    let container = setInterval(() => {
      let video = document.querySelector(containerID);
      if (video) {
        clearInterval(container);

        const timeline = gsap.timeline({
          defaults: { duration: 1 },
          scrollTrigger: {
            trigger: containerID,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
          onComplete: (ev) => {},
        });

        setTimeline(timeline);
      }
    }, 1);

    fetch("/vids/output.mp4")
      .then((response) => response.blob())
      .then((response) => {
        var blobURL = URL.createObjectURL(response);
        setURL(blobURL);
      });

    // once(document.documentElement, "touchstart", function (e) {
    //   video.play();
    //   setTimeout(() => {
    //     video.pause();
    //   });
    // });

    // var t = video.currentTime;
    // // video.setAttribute("src", blobURL);
    // video.currentTime = t + 0.01;

    // /* When first coded, the Blobbing was important to ensure the browser wasn't dropping previously played segments, but it doesn't seem to be a problem now. Possibly based on memory availability? */
    // if (window["fetch"]) {
    //   setTimeout(() => {}, 1000);
    // }
    /* ---------------------------------- */
  }, []);

  return (
    <>
      {/*  */}

      {/* <img
        className=" z-[1] absolute top-0 left-0 object-cover w-full h-full select-none"
        src={"/vids/first.jpg"}
      ></img> */}

      {tl && url && (
        <video
          className=" z-[15] absolute top-0 left-0 object-contain w-full h-full select-none"
          id="vid"
          src={url}
          preload="auto"
          autoFocus
          muted
          playsInline={true}
          autoPlay={false}
          onLoadedMetadata={(ev) => {
            tl.fromTo(
              ev.target,
              {
                currentTime: 0,
              },
              {
                currentTime: ev.target.duration || 1,
              },
            );
          }}
        ></video>
      )}

      {/* <div id="mycontainer" className="z-10 absolute top-0 left-0 w-full">
        <>{content}</>
      </div> */}
    </>
  );
}
