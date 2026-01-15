import Hero from "./components/Hero.jsx";
import AboutTech from "./components/AboutTech.jsx";
import Project from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";

export default function App(){
  return(
    <>
      <Hero/>
      <section className="black-section" id="about">
        <div className="content">
          <Project/>
        </div>

        <div className="content">
          <AboutTech/>
        </div>

        <div className="content">
          <Contact/>
        </div>
      </section>
    </>
  );
}
