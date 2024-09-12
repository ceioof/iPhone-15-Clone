import Hero from "./components/Hero.js";
// const Highlights = dynamic(() => import("./components/Highlights.js"), {
//   ssr: true,
// });
import Highlights from "./components/Highlights.js";
import Features from "./components/Features.js";
import Model from "./components/Model.jsx";
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
