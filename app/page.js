import dynamic from "next/dynamic.js";
import Hero from "./components/Hero.js";
const Highlights = dynamic(() => import("./components/Highlights.js"), {
  ssr: false,
});
const Model = dynamic(() => import("./components/Model.jsx"), { ssr: false });
// import Model from "./components/Model.jsx";
import Features from "./components/Features.js";
import HowItWorks from "./components/HowItWorks.js";

export default function Home() {
  return (
    <main>
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
    </main>
  );
}
