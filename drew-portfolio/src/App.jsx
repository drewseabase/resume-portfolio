import Hero from "./components/Hero.jsx";
import TechStack from "./components/TechStack.jsx";
import Project from "./components/Projects.jsx";
export default function App(){
  return(
    <>
      <Hero/>
      <section className="black-section" id="about">
        <div className="content">
          <TechStack/>
        </div>
        <div className="content">
          <Project/>
        </div>
      </section>
    </>
  );
}
