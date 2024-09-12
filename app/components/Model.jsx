"use client";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import gsap from "gsap";
import { animateWIthGsap, animateWithTimeline } from "../utils/animations";

import * as THREE from "three";

import ModelView from "./ModelView";
import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState(models[0]);
  // camera control
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();
  //models
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());
  // rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline();
    if (size === "small") {
      animateWithTimeline(tl, small, largeRotation, "#view2", "#view1", {
        x: "0",
        duration: 2,
      });
    }
    if (size === "large") {
      animateWithTimeline(tl, small, smallRotation, "#view1", "#view2", {
        x: "-100%",
        duration: 2,
      });
    }
    animateWIthGsap(
      "#heading",
      { opacity: 1, y: 0, ease: "power1", duration: 1 },
      "#heading",
      {}
    );
  }, [size, smallRotation, largeRotation]);
  return (
    <section className=" sm:py-32 py-20 sm:px-10 px-5 ">
      <div className=" ms-auto me-auto relative max-w-[1120px] ">
        <h1
          id="heading"
          className="text-gray lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium select-none opacity-0 translate-y-20"
        >
          Take a closer look.
        </h1>
        <div className=" flex flex-col items-center mt-5 ">
          <div className=" w-full h-[75vh] md:h-[90vh] overflow-hidden relative ">
            {/* {size === "small" && (
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            )}
              {size === "large" && (
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />
            
            )} */}

            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />

            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                pointerEvents: "none",
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>
          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center select-none">
              {model.title}
            </p>

            <div className="flex justify-center items-center mt-4">
              <ul
                id="colors-container"
                className="flex items-center justify-center p-4 rounded-full bg-gray-300 backdrop-blur"
              >
                {models.map((item, i) => (
                  <li
                    id="color-item"
                    key={i}
                    className={`w-6 h-6 rounded-full mx-2 cursor-pointer select-none `}
                    style={{
                      backgroundColor: item.color[0],
                    }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              <button className="flex items-center justify-center p-1 rounded-full bg-gray-300 backdrop-blur ml-3 gap-1">
                {sizes.map(({ label, value }) => (
                  <span
                    key={value}
                    className="w-10 h-10 text-sm flex justify-center items-center bg-white text-black rounded-full transition-all select-none"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
