// Initialize Lucide Icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const nav = document.querySelector('.nav');

  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      const icon = nav.classList.contains('active') ? 'x' : 'menu';
      mobileMenuBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
      lucide.createIcons();
    });
  }

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      if (mobileMenuBtn) {
        mobileMenuBtn.innerHTML = `<i data-lucide="menu"></i>`;
        lucide.createIcons();
      }
    });
  });

  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const activeHeader = document.querySelector('.accordion-header.active');
      
      // If another header is active, close it
      if (activeHeader && activeHeader !== header) {
        activeHeader.classList.remove('active');
      }
      
      // Toggle current header
      header.classList.toggle('active');
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Account for fixed header height
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Testimonials Carousel
  const carousel = document.getElementById('testimonials-carousel');
  if (carousel) {
    const track = carousel.querySelector('.testimonials-track');
    const slides = carousel.querySelectorAll('.testimonial-card');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('#carousel-dots');
    const total = slides.length;
    let perPage = window.innerWidth <= 768 ? 1 : 2;
    let pages = Math.ceil(total / perPage);
    let current = 0;
    let autoplay = null;

    function buildDots() {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < pages; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === current ? ' active' : '');
        dot.setAttribute('aria-label', `Página ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goTo(index) {
      current = (index + pages) % pages;
      track.style.transform = `translateX(-${current * 100}%)`;
      dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) =>
        d.classList.toggle('active', i === current)
      );
    }

    function recompute() {
      const next = window.innerWidth <= 768 ? 1 : 2;
      if (next !== perPage) {
        perPage = next;
        pages = Math.ceil(total / perPage);
        current = 0;
        buildDots();
        goTo(0);
      }
    }

    buildDots();
    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
    window.addEventListener('resize', recompute);

    function startAutoplay() {
      stopAutoplay();
      autoplay = setInterval(() => goTo(current + 1), 5000);
    }
    function stopAutoplay() {
      if (autoplay) { clearInterval(autoplay); autoplay = null; }
    }

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  }

  // Scroll Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });
});
