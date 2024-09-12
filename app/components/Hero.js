import dynamic from "next/dynamic";
import Link from "next/link";
const ClientHeroVideo = dynamic(() => import("./ClientHeroVideo"), {
  ssr: false,
});

const Hero = () => {
  return (
    <section className={`w-full h-[calc(100vh-84px)] bg-black relative `}>
      <div
        className={`h-5/6 w-full flex items-center justify-center flex-col `}
      >
        <p
          id="hero-title"
          className="text-center font-semibold text-3xl text-gray-100 opacity-0 max-md:mb-10 select-none "
        >
          iPhone 15 pro
        </p>
        <div className="md:w-5/6  w-[75%] ">
          <ClientHeroVideo />
        </div>
      </div>
      <div
        id="cta"
        className="flex flex-col
        items-center opacity-0 
      "
      >
        <Link
          href={`/`}
          className="px-5 py-2 rounded-3xl bg-blue my-5 hover:bg-transparent border border-transparent  hover:text-blue hover:border-blue"
          aria-label="Cta Link"
        >
          Buy
        </Link>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
