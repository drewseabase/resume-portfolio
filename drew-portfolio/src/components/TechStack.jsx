import {useEffect} from "react";

export default function TechStack(){
    useEffect(()=>{
        const items = document.querySelectorAll(".tech-item");
        
        const observerOptions={
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px",
        };

        const observer = new IntersectionObserver((entries) =>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting){
                    entry.target.classList.add("animate-in");
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        items.forEach((item) => observer.observe(item));

        return () => observer.disconnect();
    }, []);

    return(
        <section className="tech-stack-section" id="tech">
            <h2 className="section-title">Tech Stack</h2>

            <div className="tech-stack-grid">
                <div className="tech-item" data-tech="html">
                    <div className="tech-icon">
                        <i className="fa-brands fa-html5"></i>
                    </div>
                    <h3>HTML5</h3>
                    <p>Semantic markup &amp; accessibility</p>
                </div>

                <div className="tech-item" data-tech="css">
                    <div className="tech-icon">
                        <i className="fa-brands fa-css3-alt"></i>
                    </div>
                    <h3>CSS3</h3>
                    <p>Modern layouts &amp; animations</p>
                </div>

                <div className="tech-item" data-tech="js">
                    <div className="tech-icon">
                        <i className="fa-brands fa-square-js"></i>
                    </div>
                    <h3>JavaScript</h3>
                    <p>ES6+ &amp; DOM Manipulation</p>
                </div>

                <div className="tech-item" data-tech="react">
                    <div className="tech-icon">
                        <i className="fa-brands fa-react"></i>
                    </div>
                    <h3>React</h3>
                    <p>Component-based Architecture</p>
                </div>
            </div>
        </section>
    );
}