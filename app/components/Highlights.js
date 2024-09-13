"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { rightImg, watchImg } from "../utils";
// const VideoCarousel = dynamic(() => import("./VideoCarousel"), { ssr: false });
// const ClientHighlight = dynamic(() => import("./ClientHighlight"), {
//   ssr: false,
// });
import VideoCarousel from "./VideoCarousel";
import ClientHighlight from "./ClientHighlight";

const Highlights = () => {
  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full sm:py-32 py-20 sm:px-10 px-5 bg-zinc"
    >
      <ClientHighlight />

      <div id="trigger" className="ms-auto me-auto relative max-w-[1120px] ">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1
            id="highlight-title"
            className="text-gray lg:text-5xl md:text-4xl text-2xl lg:mb-0 mb-5 font-medium opacity-0 translate-y-20"
          >
            Get the highlights.
          </h1>
          <div className="flex flex-wrap items-center gap-5">
            <p
              id="watch"
              className="text-blue  hover:underline cursor-pointer flex items-center text-lg opacity-0 translate-y-20"
            >
              Watch the film
              <Image
                className="ml-2"
                src={watchImg}
                alt="watch"
                width={14}
                height={18}
                aria-label="watch"
              />
            </p>
            <p
              id="watch"
              className="text-blue hover:underline cursor-pointer flex items-center text-lg opacity-0 translate-y-20"
            >
              Watch the event
              <Image
                className="ml-2"
                src={rightImg}
                width={10}
                height={10}
                alt="events"
                aria-label="CHevron right"
              />
            </p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
