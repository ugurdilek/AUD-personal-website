document.addEventListener('DOMContentLoaded', function () {
    // --- Burger Menu Toggle ---
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

    async function loadImages() {
        const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`;
        const res = await fetch(url);
        const data = await res.json();

        console.log(data); // Konsolda kontrol

        data.files.forEach(file => {
            if (file.mimeType.startsWith("image/")) {
                const figure = document.createElement("figure");
                const iframe = document.createElement("iframe");
                const caption = document.createElement("figcaption");

                // Google Drive preview linki
                iframe.src = `https://drive.google.com/file/d/${file.id}/preview`;
                iframe.width = "300";
                iframe.height = "200";
                iframe.loading = "lazy";
                iframe.style.border = "none";

                // Başlık (dosya adından)
                caption.textContent = file.name.replace(/\.[^/.]+$/, "");

                figure.appendChild(iframe);
                figure.appendChild(caption);
                gallery.appendChild(figure);
            }
        });
    }

    loadImages();
});
