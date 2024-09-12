"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const ClientHighlight = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#trigger",
        start: "top bottom",
        end: "bottom bottom ",
        scrub: true,
      },
    });

    tl.to("#highlight-title", { opacity: 1, y: 0 });
    tl.to("#watch", { opacity: 1, y: 0, stagger: 0.25 });

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
    };
  }, []);
  return null;
};

export default ClientHighlight;
