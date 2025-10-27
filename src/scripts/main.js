// Importamos TUDO (Swiper, GSAP)
import Swiper from 'swiper/bundle';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Necessário para animação 'About'

// Registra o plugin ScrollTrigger SE for usado
if (document.querySelector('.stagger-lines')) {
    gsap.registerPlugin(ScrollTrigger);
}

// --- 0. Animação do PRELOADER ---
const preloader = document.querySelector('#preloader');
if (preloader) {
  const preloaderName = document.querySelector('#preloader-name');
  const preloaderDev = document.querySelector('#preloader-dev');

  if (preloaderName && preloaderDev) {
    const preloaderTL = gsap.timeline({
        onComplete: startHeroAnimation // Chama a animação do Hero DEPOIS
    });
    preloaderTL
      .to(preloaderName, { duration: 0.8, opacity: 1, delay: 0.5 })
      .to(preloaderDev, { duration: 0.5, opacity: 1 })
      .to([preloaderName, preloaderDev], {
        duration: 0.5,
        opacity: 0,
        delay: 3.2,
      })
      .to(preloader, {
        duration: 0.8,
        y: '-100%',
        ease: 'power3.out',
      });
  } else {
      if(preloader) preloader.style.display = 'none';
      startHeroAnimation();
  }
} else {
    startHeroAnimation();
}

// --- Função Separada para Animação da Seção HERO ---
function startHeroAnimation() {
  if (document.querySelector('.hero-line')) {
    gsap
      .timeline()
      .from('.hero-line', {
        duration: 1,
        y: 100,
        stagger: 0.2,
        ease: 'power3.out',
      });
  }
}


// --- 1. Animação do Cursor Customizado ---
const cursor = document.querySelector('.custom-cursor');
const links = document.querySelectorAll(
  'a, button, input, textarea, [data-cursor-hover]',
);
if (cursor) {
  // Esconder cursor imediatamente se for mobile
  if (window.innerWidth <= 767) {
    cursor.style.display = 'none';
    document.body.style.cursor = 'default';
  } else {
    // Adiciona listeners apenas se NÃO for mobile
    window.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        duration: 0.1,
        x: e.clientX,
        y: e.clientY,
      });
    });
    links.forEach((link) => {
      link.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      link.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }
}


// --- 2. Lógica do Efeito "UAU" (HOVER) no Hero ---
const heroSolution = document.querySelector('#hero-solution');
const turbulence = document.querySelector('#liquid-distortion feTurbulence');

if (heroSolution && turbulence) {
  let turbulenceTimeline;
  heroSolution.addEventListener('mouseenter', () => {
    turbulenceTimeline = gsap.to(turbulence, {
      duration: 0.8,
      attr: { baseFrequency: '0.03 0.01' },
      ease: 'power2.out',
    });
  });
  heroSolution.addEventListener('mouseleave', () => {
    if (turbulenceTimeline) {
      turbulenceTimeline.reverse();
    } else {
      gsap.to(turbulence, {
        duration: 0.8,
        attr: { baseFrequency: '0.01 0.01' },
        ease: 'power2.out',
      });
    }
  });
}

// --- 3. Animação da Seção SOBRE MIM (Stagger) ---
if (document.querySelector('.stagger-lines')) {
    gsap.from('.stagger-lines span', {
        scrollTrigger: {
            trigger: '.stagger-lines',
            start: 'top 80%',
        },
        duration: 0.8,
        y: 50,
        stagger: 0.3,
        ease: 'power2.out',
     });
}

// --- 4. Inicialização do Swiper (SEMPRE) ---
console.log("Attempting to initialize Swiper...");
try {
  const swiperContainer = document.querySelector('.swiper-container');
  if (swiperContainer) {
    new Swiper('.swiper-container', {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
       grabCursor: true, // Habilita cursor "grab"
    });
    console.log("Swiper initialized successfully.");
  } else {
      console.error("Swiper init skipped: Missing .swiper-container element.");
  }
} catch (error) {
  console.error("Error initializing Swiper:", error);
}

// --- 5. Listener de Redimensionamento (Apenas para Cursor) ---
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalcula esconder/mostrar cursor customizado no resize
        if (cursor) {
           if (window.innerWidth <= 767) {
                cursor.style.display = 'none';
                document.body.style.cursor = 'default';
            } else {
                cursor.style.display = '';
                document.body.style.cursor = 'none'; // Re-esconde cursor padrão no desktop
            }
        }
    }, 250);
});


// --- 6. Animação do Formulário de Contato ---
const form = document.getElementById('contact-form');
const submitButton = document.getElementById('submit-button');
const submitText = document.getElementById('submit-text');
const submitSpinner = document.getElementById('submit-spinner');
const submitCheck = document.getElementById('submit-check');
const submitFail = document.getElementById('submit-fail');

if (form && submitButton) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tl = gsap.timeline();
    tl.to(submitText, { duration: 0.2, opacity: 0, display: 'none' })
      .to(submitFail, { duration: 0.2, opacity: 0, display: 'none' }, '-=0.2')
      .to(submitSpinner, { duration: 0.2, opacity: 1, display: 'block' }, '-=0.2')
      .to(submitButton, { duration: 0.3, width: '5rem', ease: 'power2.out' }, '-=0.2');
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          Accept: 'application/json',
        },
      });
      if (response.ok) {
        tl.to(submitSpinner, { duration: 0.2, opacity: 0, display: 'none' })
          .to(submitCheck, { duration: 0.2, opacity: 1, display: 'block' }, '-=0.2')
          .to(submitButton, { backgroundColor: '#22C55E' }, '-=0.2');
        form.reset();
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      tl.to(submitSpinner, { duration: 0.2, opacity: 0, display: 'none' })
        .to(submitFail, { duration: 0.2, opacity: 1, display: 'inline' }, '-=0.2')
        .to(submitButton, { backgroundColor: '#EF4444' }, '-=0.2');
    }
    tl.to({}, { duration: 3.0 })
      .to([submitCheck, submitFail], { duration: 0.2, opacity: 0, display: 'none' })
      .to(submitText, { duration: 0.2, opacity: 1, display: 'inline' }, '-=0.2')
      .to(
        submitButton,
        {
          duration: 0.3,
          width: '100%',
          backgroundColor: '#0041FF',
          ease: 'power2.out',
        },
        '-=0.2',
      );
  });
}

console.log("main.js loaded and executed.");