"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";

import { highlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";
import Image from "next/image";

const VideoCarousel = () => {
  // Refs
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  const ctrlRef = useRef();

  // video and indicator
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    // slider animation to move the video out of the screen and bring the next video in
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
    });

    // video animation to play the video when it is in the view
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // animation to move the indicator
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // get the progress of the video
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // set the width of the progress bar
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                  ? "10vw" // tablet
                  : "4vw", // laptop
            });

            // set the background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        // when the video is ended, replace the progress bar with the indicator and change the background color
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }

      // update the progress bar
      const animUpdate = () => {
        const videoElemenet = videoRef.current[videoId];
        anim.progress(
          videoElemenet.currentTime / highlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animUpdate);
      } else {
        // remove the ticker when the video is paused (progress bar is stopped)
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay, isPlaying]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // vd id is the id for every video until id becomes number 3
  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };
  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

  return (
    <>
      <div className="flex items-center">
        {highlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className=" relative sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh]">
              <div className="w-full h-full flex justify-center items-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline
                  className={`${
                    list.id === 2 && "translate-x-30 sm:translate-x-40"
                  } pointer-events-none`}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onPlay={() =>
                    setVideo((pre) => ({ ...pre, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, i) => (
                  <p key={i} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        ref={ctrlRef}
        className="relative flex justify-center items-center mt-10"
      >
        <div className="flex justify-center items-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button className="ml-4 p-4 rounded-full bg-gray-300 backdrop-blur flex-center">
          <Image
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// "use client";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/all";
// gsap.registerPlugin(ScrollTrigger);
// import { useEffect, useRef, useState } from "react";

// import { highlightsSlides } from "../constants";
// import { pauseImg, playImg, replayImg } from "../utils";
// import Image from "next/image";

// const VideoCarousel = () => {
//   //parent animation
//   useGSAP(() => {
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: "#trigger",
//         start: "top bottom",
//         end: "bottom bottom ",
//         scrub: true,
//       },
//     });

//     tl.to("#highlight-title", { opacity: 1, y: 0 });
//     tl.to("#watch", { opacity: 1, y: 0, stagger: 0.25 });

//     return () => {
//       tl.scrollTrigger && tl.scrollTrigger.kill();
//     };
//   }, []);
//   const videoRef = useRef([]);
//   const videoSpanRef = useRef([]);
//   const videoDivRef = useRef([]);

//   // video and indicator
//   const [video, setVideo] = useState({
//     isEnd: false,
//     startPlay: false,
//     vidId: 0,
//     isLastVideo: false,
//     isPlaying: false,
//   });

//   const [loadedData, setLoadedData] = useState([]);
//   const { isEnd, isLastVideo, startPlay, vidId, isPlaying } = video;

//   // use Effect
//   useGSAP(() => {
//     // slider animation to move the video out of the screen and bring the next video in
//     gsap.to("#slider", {
//       // transform: `translateX(${-100 * videoId}%)`,
//       x: `${-100 * vidId}%`,
//       duration: 2,
//       ease: "power2.inOut",
//     });

//     // video animation to play the video when it is in the view
//     gsap.to("#video", {
//       scrollTrigger: {
//         trigger: "#video",
//         toggleActions: "restart none none none",
//       },
//       onComplete: () => {
//         setVideo((pre) => ({
//           ...pre,
//           startPlay: true,
//           isPlaying: true,
//         }));
//       },
//     });
//   }, [isEnd, vidId]);

//   useEffect(() => {
//     let currentProgress = 0;
//     let span = videoSpanRef.current;
//     if (span[vidId]) {
//       let anim = gsap.to(span[vidId], {
//         onUpdate: () => {
//           // progress between 0 1
//           const progress = Math.ceil(anim.progress() * 100);

//           if (progress !== currentProgress) {
//             currentProgress = progress;

//             //set the width of videoDivRef
//             gsap.to(videoDivRef.current[vidId], {
//               width:
//                 window.innerWidth < 760
//                   ? "10vw" //mobile
//                   : window.innerWidth < 1200
//                   ? "10vw" //tablet
//                   : "4vw", //laptop
//             });
//             // set the bg color of the progress bar & set the width of progress bar
//             gsap.to(span[vidId], {
//               width: `${currentProgress}%`,
//               backgroundColor: "white",
//             });
//           }
//         },
//         // when the video is ended ,replace the progress bar with the indicator
//         onComplete: () => {
//           if (isPlaying) {
//             gsap.to(videoDivRef.current[vidId], {
//               width: "12px", //the original width "w-3"
//             });
//             gsap.to(span[vidId], {
//               backgroundColor: "#afafaf",
//             });
//           }
//         },
//       });
//       // restart the animtion of indcators & progress bar
//       if (vidId == 0) {
//         anim.restart();
//       }
//       // update the progress bar
//       const animUpdate = () => {
//         anim.progress(
//           videoRef.current[vidId].currentTime /
//             highlightsSlides[vidId].videoDuration
//         );
//       };

//       if (isPlaying) {
//         // ticker to update the progress bar
//         gsap.ticker.add(animUpdate);
//       } else {
//         // remove the ticker when the video is paused (progress bar is stopped)
//         gsap.ticker.remove(animUpdate);
//       }
//     }
//   }, [vidId, startPlay, isPlaying]);

//   useEffect(() => {
//     if (loadedData.length > 3) {
//       if (!isPlaying) {
//         videoRef.current[vidId].pause();
//       } else {
//         startPlay && videoRef.current[vidId].play();
//       }
//     }
//   }, [startPlay, vidId, isPlaying, loadedData]);

//   // handle functions

//   // vd id is the id for every video until id becomes number 3

//   const handleProcess = (type, i) => {
//     switch (type) {
//       case "video-end":
//         setVideo((pre) => ({ ...pre, isEnd: true, vidId: i + 1 }));
//         break;

//       case "video-last":
//         setVideo((pre) => ({ ...pre, isLastVideo: true }));
//         break;

//       case "video-reset":
//         setVideo((pre) => ({ ...pre, vidId: 0, isLastVideo: false }));
//         break;

//       case "pause":
//       case "play":
//         setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
//         break;
//       default:
//         return video;
//     }
//   };

//   const handleMetaData = (i, e) => {
//     setLoadedData((prev) => [...prev, e]);
//   };

//   // !!!!!!!!!!!!!!!!!!!!!

//   return (
//     <>
//       <div className="flex items-center ">
//         {highlightsSlides.map((slide, i) => (
//           <div key={slide.id} id="slider" className=" sm:pr-20 pr-10">
//             <div className="relative sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh] ">
//               <div className="w-full h-full flex justify-center items-center overflow-hidden rounded-3xl bg-black">
//                 <video
//                   id="video"
//                   className={`${
//                     slide.id === 2 && "translate-x-40"
//                   } pointer-events-none`}
//                   ref={(el) => {
//                     videoRef.current[i] = el;
//                   }}
//                   onPlay={() => {
//                     setVideo((prevs) => ({ ...prevs, isPlaying: true }));
//                   }}
//                   onEnded={() =>
//                     i !== 3
//                       ? handleProcess("video-end", i)
//                       : handleProcess("video-last")
//                   }
//                   onLoadedMetadata={(e) => {
//                     handleMetaData(i, e);
//                   }}
//                   preload="auto"
//                   muted
//                   playsInline
//                 >
//                   <source src={slide.video} type="video/mp4"></source>
//                 </video>
//               </div>
//               <div className=" absolute top-12 left-[5%] z-10 ">
//                 {slide.textLists.map((txt) => (
//                   <p key={txt} className=" font-medium text-xl md:text-2xl ">
//                     {txt}
//                   </p>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="relative flex justify-center items-center w-full mt-10">
//         <div className=" flex justify-center items-center py-5 px-7 bg-gray-300 backdrop-blur-[10px] rounded-full ">
//           {videoRef.current.map((_, i) => (
//             <span
//               key={i}
//               ref={(el) => (videoDivRef.current[i] = el)}
//               className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer "
//             >
//               <span
//                 className=" absolute h-full w-full rounded-full "
//                 ref={(el) => (videoSpanRef.current[i] = el)}
//               />
//             </span>
//           ))}
//         </div>
//         <button className="rounded-full bg-gray-300 ml-4 backdrop-blur p-4 flex justify-center items-center ">
//           <Image
//             onClick={
//               isLastVideo
//                 ? () => {
//                     handleProcess("video-reset");
//                   }
//                 : !isPlaying
//                 ? () => {
//                     handleProcess("play");
//                   }
//                 : () => {
//                     handleProcess("pause");
//                   }
//             }
//             src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
//             alt={isLastVideo ? "replay" : !isPlaying ? "play" : "puase"}
//             aria-label={isLastVideo ? "replay" : !isPlaying ? "play" : "puase"}
//           />
//         </button>
//       </div>
//     </>
//   );
// };

// export default VideoCarousel;
