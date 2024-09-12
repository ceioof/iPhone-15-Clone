// ClientSideAnimations.js
"use client"; // This component will be client-rendered
import { exploreVideo } from "../utils";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { animateWIthGsap } from "../utils/animations";

const ClientSideAnimations = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.to("#explore-video", {
      scrollTrigger: {
        trigger: "#explore-video",
        start: "-10% bottom",
        toggleActions: "play puase reverse restart",
      },
      onComplete: () => {
        videoRef.current.play();
      },
    });

    animateWIthGsap(
      "#features_title",
      { opacity: 1, y: 0 },
      "#features_title",
      { start: "-50% 85%", duration: 2, ease: "power2.inOut" }
    );
    animateWIthGsap(
      ".g_grow",
      { opacity: 1, scale: 1, ease: "power1" },
      ".g_grow",
      { scrub: 5.5 }
    );
    animateWIthGsap(
      ".g_text",
      { opacity: 1, y: 0, stagger: 0.25, ease: "power2.inOut" },
      ".g_text",
      {}
    );
  }, []);

  return (
    <video
      playsInline
      id="explore-video"
      className="w-full h-full object-center object-cover"
      preload="none"
      muted
      autoPlay
      ref={videoRef}
    >
      <source src={exploreVideo} type="video/mp4" />
    </video>
  );
};

export default ClientSideAnimations;
