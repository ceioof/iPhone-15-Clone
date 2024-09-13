"use client";

import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { models } from "../constants";
import Image from "next/image";
import { animateWIthGsap } from "../utils/animations";

const Galary = () => {
  const [model, setModel] = useState(models[0]);

  useGSAP(() => {
    animateWIthGsap(
      "#heading",
      { opacity: 1, y: 0, ease: "power1", duration: 1 },
      "#heading",
      {}
    );
  }, []);
  // !!!!

  return (
    <section className=" sm:py-32 py-20 sm:px-10 px-5 ">
      <div className=" ms-auto me-auto relative max-w-[1120px] ">
        <h1
          id="heading"
          className="text-gray lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium select-none opacity-0 translate-y-20"
        >
          Take a closer look.
        </h1>
        <div>
          <div className=" w-full h-[75vh] md:h-[90vh]  overflow-hidden relative ">
            <div className="w-full flex justify-center items-center h-full">
              <Image src={model.img} alt={model.title} className={`h-[80%] `} />
            </div>
          </div>
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
                  className={` ${
                    item.id === 1 && "bg-all_colors-gradient"
                  } w-6 h-6 rounded-full mx-2 cursor-pointer select-none `}
                  style={{
                    backgroundColor: item.color[0],
                  }}
                  onClick={() => setModel(item)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Galary;
