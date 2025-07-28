document.addEventListener("DOMContentLoaded", function () {
    // --- Burger Menu ---
    const burgerButton = document.querySelector(".burger-button");
    const navList = document.querySelector(".navbar ul");
    if (burgerButton && navList) {
        burgerButton.addEventListener("click", () => {
            burgerButton.classList.toggle("active");
            navList.classList.toggle("show");
        });
    }

    // --- Galeri + Lightbox ---
    const gallery = document.getElementById("gallery");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeBtn = document.getElementById("closeLightbox");
    const prevBtn = document.getElementById("lightboxPrev");
    const nextBtn = document.getElementById("lightboxNext");

    let imagesArray = [];
    let currentIndex = 0;

    async function loadImages() {
        // photos.json dosyasının RAW linki
        const jsonUrl = "/photos/photos.json";


        const res = await fetch(jsonUrl);
        const data = await res.json();

        data.forEach((item, index) => {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const caption = document.createElement("figcaption");

            img.src = `/photos/${item.file}`;
            img.alt = item.caption;
            caption.textContent = item.caption;

            imagesArray.push(img.src);

            img.addEventListener("click", () => openLightbox(index));

            figure.appendChild(img);
            figure.appendChild(caption);
            gallery.appendChild(figure);
        });
    }

    function openLightbox(index) {
        currentIndex = index;
        lightbox.classList.add("open");
        lightboxImg.src = imagesArray[currentIndex];
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
        lightboxImg.src = imagesArray[currentIndex];
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % imagesArray.length;
        lightboxImg.src = imagesArray[currentIndex];
    }

    if (prevBtn) prevBtn.addEventListener("click", showPrev);
    if (nextBtn) nextBtn.addEventListener("click", showNext);
    if (closeBtn) closeBtn.addEventListener("click", () => {
        lightbox.classList.remove("open");
        lightboxImg.src = "";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove("open");
            lightboxImg.src = "";
        }
    });

    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("open")) return;
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "Escape") {
            lightbox.classList.remove("open");
            lightboxImg.src = "";
        }
    });

    loadImages();
});
