import About from "./About.jsx";
import TechStack from "./TechStack.jsx";
import {useEffect} from "react";

export default function AboutTech() {
    useEffect(()=>{
        const elements = document.querySelectorAll(".fade-in");

        const observer = new IntersectionObserver(
            (entries, obs) =>{
                entries.forEach(entry =>{
                    if(entry.isIntersecting){
                        entry.target.clasList.add("visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            {threshold:0.2, rootMargin: "0px 0px -80px 0px",}
        );
        elements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);
  return (
    <section className="about-tech-section" id="about">
      <div className="about-tech-grid">
        <About />
        <TechStack />
      </div>
    </section>
  );
}
