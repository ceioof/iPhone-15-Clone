import dynamic from "next/dynamic";
import Image from "next/image";
import { chipImg, frameImg, frameVideo } from "../utils";
const ClientHiw = dynamic(() => import("./ClientHiw"), {
  ssr: false,
});

const HowItWorks = () => {
  return (
    <section className="sm:py-32 py-20 sm:px-10 px-5 ">
      <ClientHiw />
      <div className="max-w-[1120px] ms-auto me-auto relative overflow-hidden">
        <div
          id="chip"
          className="flex justify-center items-center w-full my-20"
        >
          <Image src={chipImg} alt="chip" width={180} height={180} />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-4xl md:text-7xl font-semibold text-center">
            A17 Pro Chip .
            <br /> A Monster win for gaming
          </h2>
          <p className="text-gray font-semibold text-xl md:text-2xl py-10 text-center">
            It`&apos;`s here. The biggest redesign in the history of Apple GPUs.
          </p>
        </div>
        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex justify-center items-center">
            <div className="overflow-hidden">
              <Image
                src={frameImg}
                alt="frame"
                className="bg-transparent z-10"
              />
            </div>
            <div className=" absolute w-[95%] h-[90%] rounded-[56px] overflow-hidden">
              <video
                id="videoRef"
                className="pointer-events-none"
                preload="none"
                playsInline
                muted
                autoPlay
              >
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>
          <p className="text-gray font-semibold text-center mt-3">
            Honkai: Star Rail
          </p>
        </div>
        <div className="flex md:flex-row flex-col justify-between items-start gap-24">
          <div className="flex-1 flex justify-center items-center flex-col">
            <p className="g_fadeIn opacity-0 translate-y-[100px] text-gray text-xl font-normal md:font-semibold">
              A17 Pro is an entirely new class of iPhone chip that delivers our{" "}
              <span className="text-white">
                best graphic performance by far
              </span>
            </p>

            <p className=" g_fadeIn opacity-0 translate-y-[100px] text-gray text-xl font-normal mt-3 md:font-semibold">
              Mobile{" "}
              <span className="text-white">
                games will lookk and feel so immersive
              </span>{" "}
              with incredibly detailed environmments and characters.
            </p>
          </div>

          <div className="flex-1 flex justify-center flex-col opacity-0 translate-y-[100px] g_fadeIn">
            <p className="text-gray text-xl font-normal md:font-semibold">
              New
            </p>
            <p className="text-white text-3xl md:text-5xl font-normal md:font-semibold my-2">
              Pro-class GPU
            </p>
            <p className="text-gray text-xl font-normal md:font-semibold">
              with 6 cores
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
