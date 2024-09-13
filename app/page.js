import Hero from "./components/Hero.js";
import Highlights from "./components/Highlights.js";
import Galary from "./components/Galary.js";
import Features from "./components/Features.js";
import HowItWorks from "./components/HowItWorks.js";

export default function Home() {
  return (
    <main>
      <Hero />
      <Highlights />
      <Galary />
      <Features />
      <HowItWorks />
    </main>
  );
}
