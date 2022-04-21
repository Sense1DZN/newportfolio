// Opening animation
document.querySelector('section.scripts').remove();
window.scroll({
    top: 0,
    behavior: 'smooth'
});
  
window.addEventListener('load', () => {
    document.querySelector('h1.loading').style.opacity = 0;
    document.body.style.overflowY = 'scroll';
    setTimeout(() => {
        const txts = document.querySelectorAll('span.txt-wrapper');
        const pic = document.querySelector('img.headshot');
        const btns = document.querySelectorAll('a.button');
    
        for (let e of btns) e.style.opacity = 1;

        pic.style.opacity = 1;
        pic.style.transform = 'translateY(0)';
        pic.style.filter = 'blur(0) grayscale(15%)';
    
        for (let i = 0; i < txts.length; i++) {
            setTimeout(() => {
                txts[i].querySelector('*').style.transform = 'translateY(0)';
            }, i*250);
        } 
    }, 250);
});

// Scroll animations
const nav = document.querySelector('nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    document.querySelector('i.scroll').style.opacity = 0;
    if (window.scrollY > 200 && window.scrollY > lastScroll) nav.classList.add('scroll');
    else { nav.classList.remove('scroll'); }
    if (window.scrollY === 0)  nav.style.backgroundColor = 'transparent';
    else  nav.style.backgroundColor = 'var(--bg-dark)';
    lastScroll = window.scrollY;

    for (let e of document.querySelectorAll('section.work-group')) {
        if (e.getBoundingClientRect().top < window.innerHeight-50) { e.style.opacity = 1; e.style.transform = 'translateY(0)'; }
    }
});

// Links
const abtSec = document.querySelector('section.about');
document.querySelector('li.nav-item a#abt').addEventListener('click', () => { window.scroll({ top: abtSec.getBoundingClientRect().top-(window.innerHeight-abtSec.offsetHeight)/2, behavior: 'smooth' }); });
document.querySelector('li.nav-item a#work').addEventListener('click', () => { window.scroll({ top: document.querySelector('section.work').getBoundingClientRect().top, behavior: 'smooth' }); });
document.querySelector('li.nav-item a#contact').addEventListener('click', () => { window.scroll({ top: document.body.offsetHeight, behavior: 'smooth' }); });

document.querySelector('a.button#contact').addEventListener('click', () => { window.scroll({ top: document.body.offsetHeight, behavior: 'smooth' }); });

document.querySelector('section.work').innerHTML += workInnerHTML;