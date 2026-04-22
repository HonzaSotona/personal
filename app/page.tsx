import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <Pricing />
        <Contact />
      </main>
    </>
  );
}
