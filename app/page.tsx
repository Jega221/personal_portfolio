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
      <section id="home">
        <Header />
      </section>
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="project">
        <Project/>
      </section>
      <section id="sevices">
        <Services/>
      </section>
      <section id="contact">
        <Footer />
      </section>
    </>
  );
}
