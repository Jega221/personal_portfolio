// app/page.tsx
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import About from "@/components/About";
import Project from "@/components/Project";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Project />
        <Services />
      </main>
      <Footer />
    </>
  );
}
