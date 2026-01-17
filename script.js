document.addEventListener('DOMContentLoaded', function () {
    console.log('script.js: DOMContentLoaded');
    // Nav toggle
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
        navToggle.addEventListener('click', function () {
            const menu = document.getElementById('navMenu');
            if (menu) menu.classList.toggle('active');
        });
    }

    // Header logo load debug
    const headerLogo = document.querySelector('.logo-img');
    if (headerLogo) {
        if (headerLogo.complete) {
            if (headerLogo.naturalWidth && headerLogo.naturalWidth > 0) console.log('script.js: header logo already loaded');
            else console.log('script.js: header logo failed to load (naturalWidth=0)');
        } else {
            headerLogo.addEventListener('load', () => console.log('script.js: header logo loaded (load event)'));
            headerLogo.addEventListener('error', () => console.log('script.js: header logo failed to load (error event)'));
        }
    } else {
        console.log('script.js: .logo-img element not found');
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            const menu = document.getElementById('navMenu');
            if (menu) menu.classList.remove('active');
        });
    });

    // Custom Partners Carousel (DOM-ready safe)
    const slides = Array.from(document.querySelectorAll('.partners-slide'));
    const dots = Array.from(document.querySelectorAll('.partners-dots .dot'));
    const prevBtn = document.getElementById('partnersPrev');
    const nextBtn = document.getElementById('partnersNext');
    let currentSlide = 0;
    const totalSlides = slides.length || 0;

    function showSlide(n) {
        if (!slides.length) return;
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.transition = 'transform 0.5s ease-in-out'; // Smooth transition
        });
        dots.forEach(d => d.classList.remove('active'));
        const i = ((n % totalSlides) + totalSlides) % totalSlides;
        slides[i].classList.add('active');
        if (dots[i]) dots[i].classList.add('active');
        currentSlide = i;
    }

    if (totalSlides > 0) {
        console.log('script.js: slides found =', totalSlides);
        // Wire buttons
        if (prevBtn) {
            console.log('script.js: prevBtn found');
            prevBtn.addEventListener('click', () => {
                console.log('script.js: prev clicked');
                showSlide(currentSlide - 1);
            });
        } else console.log('script.js: prevBtn NOT found');

        if (nextBtn) {
            console.log('script.js: nextBtn found');
            nextBtn.addEventListener('click', () => {
                console.log('script.js: next clicked');
                showSlide(currentSlide + 1);
            });
        } else console.log('script.js: nextBtn NOT found');

        // Wire dots
        dots.forEach((dot, index) => dot.addEventListener('click', () => {
            console.log('script.js: dot clicked', index);
            showSlide(index);
        }));

        // initialize
        showSlide(0);
    } else {
        console.log('script.js: no slides present');
    }
});
