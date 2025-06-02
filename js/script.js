const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const burgerButton = document.querySelector('.burger-button');
const navList = document.querySelector('.navbar ul');

// LIGHTBOX - sadece varsa çalıştır
if (images.length > 0 && lightbox && lightboxImg && closeBtn) {
  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}

// BURGER MENU - her sayfada çalışmalı
if (burgerButton && navList) {
  burgerButton.addEventListener('click', () => {
    burgerButton.classList.toggle('active');
    navList.classList.toggle('show');
  });
}
