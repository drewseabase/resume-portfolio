import { useEffect, useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const items = document.querySelectorAll(".contact-item");

    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    fetch("/", {
      method: "POST",
      body: data,
    })
      .then(() => setSubmitted(true))
      .catch(() => alert("Submission failed. Please try again."));
  }

  return (
    <section className="contact-section" id="contact">
      <h2 className="section-title">Let's Work Together</h2>
      <p className="section-subtitle">
        Have a project in mind? Let's create something amazing.
      </p>

      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon">
              <i className="fa-regular fa-envelope"></i>
            </div>
            <div className="contact-text">
              <h4>Email</h4>
              <a href="mailto:drewseabase@gmail.com">drewseabase@gmail.com</a>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <i className="fa-brands fa-github"></i>
            </div>
            <div className="contact-text">
              <h4>GitHub</h4>
              <a href="https://github.com/drewseabase" target="_blank" rel="noreferrer">
                github.com/drewseabase
              </a>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <i className="fa-brands fa-linkedin"></i>
            </div>
            <div className="contact-text">
              <h4>LinkedIn</h4>
              <a
                href="https://www.linkedin.com/in/drew-seabase-a86a33392/"
                target="_blank"
                rel="noreferrer"
              >
                https://www.linkedin.com/in/drew-seabase-a86a33392/
              </a>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="contact-success">
            <h3>Message sent ✅</h3>
            <p>I’ll get back to you shortly.</p>
          </div>
        ) : (
          <form
            className="contact-form"
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            {/* Netlify required hidden input */}
            <input type="hidden" name="form-name" value="contact" />

            {/* Honeypot field */}
            <p style={{ display: "none" }}>
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="form-group">
              <input type="text" name="name" placeholder="Your Name" required />
            </div>

            <div className="form-group">
              <input type="email" name="email" placeholder="Your Email" required />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                rows="6"
                placeholder="Your Message"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

