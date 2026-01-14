import Hero from "./components/hero.jsx";
import TechStack from "./components/TechStack.jsx";

export default function App(){
  return(
    <>
      <Hero/>
      <section className="black-section" id="about">
        <div className="content">
          <TechStack/>
        </div>
      </section>
    </>
  );
}
