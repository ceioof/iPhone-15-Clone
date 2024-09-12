import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const { useGSAP } = require("@gsap/react");

gsap.registerPlugin(ScrollTrigger);

export const animateWithTimeline = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secTarget,
  animationProps
) => {
  timeline
    .to(rotationRef.current.rotation, {
      y: rotationState,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(
      firstTarget,
      {
        ...animationProps,
        ease: "power2.inOut",
      },
      "<"
    )
    .to(
      secTarget,
      {
        ...animationProps,
        ease: "power2.inOut",
      },
      "<"
    );
};

export const animateWIthGsap = (target, animtonProps, trigger, scrollProps) => {
  gsap.to(target, {
    ...animtonProps,
    scrollTrigger: {
      trigger: trigger,
      toggleActions: "restart reverse restart reverse",
      ...scrollProps,
    },
  });
};
