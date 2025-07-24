document.addEventListener('DOMContentLoaded', function () {
    // ========== LIGHTBOX GALLERY ==========

    const images = Array.from(document.querySelectorAll('.gallery img'));
    if (images.length > 0) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const closeBtn = document.getElementById('closeLightbox');
        const prevBtn = document.getElementById('lightboxPrev');
        const nextBtn = document.getElementById('lightboxNext');
        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            lightbox.classList.add('open');
            lightboxImg.src = images[currentIndex].src;
            lightboxImg.alt = images[currentIndex].alt;
        }

        images.forEach((img, i) => {
            img.addEventListener('click', () => openLightbox(i));
        });

        function showPrev() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            lightboxImg.src = images[currentIndex].src;
            lightboxImg.alt = images[currentIndex].alt;
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % images.length;
            lightboxImg.src = images[currentIndex].src;
            lightboxImg.alt = images[currentIndex].alt;
        }

        if (prevBtn) prevBtn.addEventListener('click', showPrev);
        if (nextBtn) nextBtn.addEventListener('click', showNext);

        document.addEventListener('keydown', function (e) {
            if (!lightbox.classList.contains('open')) return;
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'Escape') {
                lightbox.classList.remove('open');
                lightboxImg.src = "";
            }
        });

        if (closeBtn) closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('open');
            lightboxImg.src = "";
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('open');
                lightboxImg.src = "";
            }
        });

        // ========== SWIPE (TOUCH) FOR LIGHTBOX ==========
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        lightbox.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleGesture();
        });

        function handleGesture() {
            if (touchEndX < touchStartX - 40) showNext();
            if (touchEndX > touchStartX + 40) showPrev();
        }
    }

    // ========== BURGER MENU TOGGLE ==========
    const burgerButton = document.querySelector('.burger-button');
    const navList = document.querySelector('.navbar ul');

    if (burgerButton && navList) {
        burgerButton.addEventListener('click', () => {
            burgerButton.classList.toggle('active');
            navList.classList.toggle('show');
        });
    }
});