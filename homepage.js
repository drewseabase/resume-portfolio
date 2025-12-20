document.querySelectorAll('a [href^="#]').forEach(anchor =>{
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) =>{
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('#about, #projects, #contact').forEach(section =>{
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(section);
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card,index) =>{
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
});

const projectObserver = new IntersectionObserver((entries) =>{
    entries.forEach(entry =>{
        if (entry.isIntersecting){
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {threshold: 0.1});

projectCards.forEach(card => projectObserver.observe(card));

const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) =>{
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8)';
    tag.style.transition = `opacity 0.4s ease-out ${index * 0.05}s, transform 0.4s ease-out ${index * 0.05}s`;
});

const skillObserver = new IntersectionObserver((entries) =>{
    entries.forEach(entry => {
        if (entry.isIntersecting){
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
        }
    });
}, {threshold: 0.5});

skillTags.forEach(tag => skillObserver.observe(tag));

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"');

window.addEventListener('scroll',() =>{
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(scrollY >= sectionTop - 200){
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link =>{
        link.style.color = '#4a5568'
        if(link.getAttribute('href') == `#${current}`){
            link.style.color = '#3182ce';
        }
    });
});