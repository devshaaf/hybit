import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="bg-fixed-gradient" aria-hidden="true" />
      <Navbar />
      <Hero />
      <Features />
      <Contact />
      <Footer />
    </>
  );
}
