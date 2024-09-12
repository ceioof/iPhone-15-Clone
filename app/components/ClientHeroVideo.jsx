"use client";
import { useEffect, useState } from "react";
import { heroVideo, smallHeroVideo } from "../utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ClientHeroVideo = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth > 600 ? heroVideo : smallHeroVideo
  );

  // Set the video source based on window size
  const handleVideoSrcSet = () => {
    setVideoSrc(window.innerWidth > 600 ? heroVideo : smallHeroVideo);
  };

  useEffect(() => {
    // Add resize event listener
    window.addEventListener("resize", handleVideoSrcSet);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    };
  }, []);

  // GSAP animation setup
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to("#hero-title", { opacity: 1, delay: 1 });
    tl.to("#cta", { opacity: 1, y: "-45" });
  }, []);

  return (
    <video
      autoPlay
      muted
      playsInline
      className="pointer-events-none"
      key={videoSrc}
    >
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default ClientHeroVideo;
