import {useEffect} from "react";

export default function Contact(){
    useEffect(()=>{
        const items = document.querySelectorAll(".contact-item");

        const observerOptions={
            threshold: .15,
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
        items.forEach((item) => observer.observe(item));
        return () => observer.disconnect();
    }, []);
    return(
        <section className="contact-section" id="contact">
            <h2 className="section-title">Let's Work Together</h2>
            <p className="section-subtitle">Have a project in mind? Let's create something amazing.</p>

            <div className="contact-content">
                <div className="contact-info">
                        <div className="contact-item">
                            <div className="contact-icon"><i className="fa-regular fa-envelope"></i></div>
                            <div className="contact-text">
                                <h4>Email</h4>
                                <a href="mailto:drewseabase@gmail.com">drewseabase@gmail.com</a>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon"><i className="fa-brands fa-github"></i></div>
                            <div className="contact-text">
                                <h4>GitHub</h4>
                                <a href="https://github.com/drewseabase" target="_blank">github.com/drewseabase</a>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon"><i className="fa-brands fa-linkedin"></i></div>
                            <div className="contact-text">
                                <h4>LinkedIn</h4>
                                <a href="https://www.linkedin.com/in/drew-seabase-a86a33392/" target="_blank">https://www.linkedin.com/in/drew-seabase-a86a33392/</a>
                            </div>
                        </div>
                </div>
                <form className="contact-form">
                    <div className="form-group">
                        <input type="text" placeholder="Your Name" required></input>
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Your Email" required></input>
                    </div>
                    <div className="form-group">
                        <textarea rows="6" placeholder="Your Message" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
            </div>
        </section>
    );
}