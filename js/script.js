document.addEventListener('DOMContentLoaded', function () {
    // --- Burger Menu ---
    const burgerButton = document.querySelector('.burger-button');
    const navList = document.querySelector('.navbar ul');

    if (burgerButton && navList) {
        burgerButton.addEventListener('click', () => {
            burgerButton.classList.toggle('active');
            navList.classList.toggle('show');
        });
    }

    // --- Google Drive API ile Dinamik Galeri ---
    const API_KEY = "AIzaSyAZZKHOql248kLSfVWXdMGRwDgw6gsCu0w";
    const FOLDER_ID = "1DUyfrnibIxHfoMy-Gd3t_0d_G_9syGE0";
    const gallery = document.getElementById("gallery");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeBtn = document.getElementById("closeLightbox");
    const prevBtn = document.getElementById("lightboxPrev");
    const nextBtn = document.getElementById("lightboxNext");

    let imagesArray = [];
    let currentIndex = 0;

    async function loadImages() {
        const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`;
        const res = await fetch(url);
        const data = await res.json();

        data.files.forEach((file, index) => {
            if (file.mimeType.startsWith("image/")) {
                const figure = document.createElement("figure");
                const img = document.createElement("img");
                const caption = document.createElement("figcaption");

                const imgUrl = `https://drive.google.com/uc?export=view&id=${file.id}`;
                img.src = imgUrl;
                img.alt = file.name;
                caption.textContent = file.name.replace(/\.[^/.]+$/, "");

                imagesArray.push(imgUrl);
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
