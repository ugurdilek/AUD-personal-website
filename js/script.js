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
        const user = "ugurdilek";
        const repo = "websiteGallery";
        const path = "photos";

        const url = `https://api.github.com/repos/${user}/${repo}/contents/${path}`;
        const res = await fetch(url);
        const files = await res.json();

        files.forEach((file, index) => {
            if (file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
                const figure = document.createElement("figure");
                const img = document.createElement("img");
                const caption = document.createElement("figcaption");

                img.src = file.download_url;
                img.alt = file.name;
                caption.textContent = file.name
                    .replace(/\.[^/.]+$/, "")
                    .replace(/[-_]/g, " ")
                    .replace(/\b\w/g, c => c.toUpperCase());

                imagesArray.push(file.download_url);

                img.addEventListener("click", () => openLightbox(index));

                figure.appendChild(img);
                figure.appendChild(caption);
                gallery.appendChild(figure);
            }
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
