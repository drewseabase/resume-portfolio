import {useEffect} from "react";
import background from "../assets/background.jpg";
export default function Projects(){
    useEffect(()=>{
        const items = document.querySelectorAll(".project-card");

        const observerOptions={
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px",
        };

        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if(entry.isIntersecting){
                    entry.target.classList.add("animate-in");
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        items.forEach((item)=> observer.observe(item));

        return () => observer.disconnect();
    }, []);
    return(
        <section className="project-section" id="project">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">A showcase of my recent work</p>

            <div className="project-grid">
                <div className="project-card" data-project="1">
                    <div className="project-image">
                        <img src={background} alt="Spartan Hero Picture"></img>
                        <div className="project-overlay">
                            <a href="https://spartancrosscountry.netlify.app/" class="project-link">View Project</a>
                        </div>
                    </div>
                    <div className="project-content">
                        <h3>Spartans Cross Country</h3>
                        <p>A custom-built, responsive website that translates Michigan State Cross Country data</p>
                        <p>and storytelling into a polished, interactive frontend experience.</p>
                        <div className="project-tags">
                            <span className="tag">HTML</span>
                            <span className="tag">CSS</span>
                            <span className="tag">JavaScript</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}