import { explore1Img, explore2Img } from "../utils";
import ClientSideAnimations from "./ClientSideAnimations";
import Image from "next/image";

const Features = () => {
  return (
    <section
      id="features-section"
      className="h-full bg-zinc relative overflow-hidden sm:py-32 py-20 sm:px-10 px-5 "
    >
      <div
        id="features-container"
        className="ms-auto me-auto relative max-w-[1120px] "
      >
        <div className=" mb-12 w-full  ">
          <h1
            id="features_title"
            className="text-gray lg:text-5xl md:text-4xl text-2xl lg:mb-0 mb-5 font-medium opacity-0 translate-y-20 "
          >
            Explore the full story.
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl lg:text-7xl font-semibold">Iphone.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">
              Forged in titanium.
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center sm:px-10">
            <div className="h-[50vh] w-full relative flex items-center ">
              <ClientSideAnimations />
            </div>
            <div className="flex flex-col relative w-full">
              <div className=" w-full flex flex-col md:flex-row gap-5 items-center">
                <div className=" overflow-hidden flex-1 h-[50vh] ">
                  <Image
                    src={explore1Img}
                    // width={}
                    // height={}
                    alt="titanium"
                    className=" w-full h-full object-cover object-center scale-150 opacity-0 g_grow "
                  />
                </div>
                <div className=" overflow-hidden flex-1 h-[50vh] ">
                  <Image
                    src={explore2Img}
                    alt="titanium"
                    // width={}
                    // height={}
                    className=" w-full h-full object-cover object-center scale-150 opacity-0 g_grow "
                  />
                </div>
              </div>
              <div className="w-full flex justify-center items-center flex-col md:flex-row mt-10 md:mt-16 gap-5">
                <div className="flex-1 flex justify-center items-center">
                  <p className="g_text text-gray max-w-md text-lg md:text-xl font-semibold opacity-0 translate-y-[100px]">
                    iPhone 15 Pro is{" "}
                    <span className="text-white">
                      the first iPhone to feature an aerospace-grade titanium
                      design
                    </span>
                    , using the same alloy that spacecrafts use for missions to
                    Mars.
                  </p>
                </div>
                <div className="flex-1 flex justify-center items-center">
                  <p className="g_text text-gray max-w-md text-lg md:text-xl font-semibold opacity-0 translate-y-[100px]">
                    Titanium has one of the best strength-to-weight ratios of
                    any metal, making these our{" "}
                    <span className="text-white">
                      lightest Pro models ever.
                    </span>{" "}
                    You`&apos;`ll notice the difference the moment you pick one
                    up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
