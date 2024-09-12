"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateWIthGsap } from "../utils/animations";
gsap.registerPlugin(ScrollTrigger);

const ClientHowItWorks = () => {
  useGSAP(() => {
    gsap.from("#chip", {
      opacity: 0,
      scale: 2,
      ease: "power2.inOut",
      duration: 2,
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom",
      },
    });

    animateWIthGsap(
      ".g_fadeIn",
      { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
      ".g_fadeIn",
      {}
    );

    gsap.to("#videoRef", {
      scrollTrigger: {
        trigger: "#videoRef",
        toggleActions: "play puase reverse restart",
      },
    });
  }, []);

  return null; //no needed render
};

export default ClientHowItWorks;
