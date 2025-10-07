let currentIndex = 0;

function loadPhotos() {
  const gallery = document.getElementById("photoGallery");
  if (!gallery || typeof images === "undefined" || images.length === 0) return;

  images.forEach((filename, index) => {
    const img = document.createElement("img");
    img.src = `afbeeldingen/${filename}`;
    img.alt = filename.split(".")[0];
    img.dataset.index = index;
    img.addEventListener("click", () => openLightbox(index));
      img.loading = "lazy";
  img.addEventListener("load", () => {
    img.classList.add("loaded");
  });
    gallery.appendChild(img);
  });
}

function initGallery(galleryId) {
  const gallery = document.getElementById(galleryId);
  if (!gallery) return;

  const images = Array.from(gallery.querySelectorAll("img"));

  images.forEach((img, index) => {
    img.dataset.index = index;
    img.addEventListener("click", () => openLightbox(images, index));
  });
}


function openLightbox(index) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const thumbsContainer = document.getElementById("lightboxThumbs");
  if (!lightbox || !lightboxImg || !thumbsContainer) return;

  currentIndex = index;
  lightbox.classList.remove("hidden");
  lightboxImg.src = `afbeeldingen/${images[currentIndex]}`;

  disableHamburger();

  thumbsContainer.innerHTML = "";
  images.forEach((imgName, i) => {
    const thumb = document.createElement("img");
    thumb.src = `afbeeldingen/${imgName}`;
    thumb.classList.toggle("active", i === currentIndex);
    thumb.addEventListener("click", () => {
      currentIndex = i;
      lightboxImg.src = `afbeeldingen/${images[currentIndex]}`;
      updateThumbs();
    });
    thumbsContainer.appendChild(thumb);
  });

  scrollActiveThumbIntoView(true);
}

function scrollActiveThumbIntoView(initial = false) {
  const thumbsContainer = document.getElementById("lightboxThumbs");
  const activeThumb = thumbsContainer?.querySelector("img.active");
  if (!thumbsContainer || !activeThumb) return;

  const containerRect = thumbsContainer.getBoundingClientRect();
  const thumbRect = activeThumb.getBoundingClientRect();

  const offset = thumbRect.left - containerRect.left - (containerRect.width / 2) + (thumbRect.width / 2);

  thumbsContainer.scrollBy({
    left: offset,
    behavior: initial ? "auto" : "smooth" 
  });
}


function updateThumbs() {
  const thumbs = document.querySelectorAll("#lightboxThumbs img");
  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === currentIndex);
  });

  scrollActiveThumbIntoView();
}


function setupLightboxButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const closeBtn = document.getElementById("closeLightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  if (!prevBtn || !nextBtn || !closeBtn || !lightboxImg) return;

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = `afbeeldingen/${images[currentIndex]}`;
    updateThumbs();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = `afbeeldingen/${images[currentIndex]}`;
    updateThumbs();
  });

  closeBtn.addEventListener("click", () => {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
      lightbox.classList.add("hidden");
      enableHamburger(); // 🔓 Zet hamburger weer aan
    }
  });
}

function scrollActiveThumbIntoView() {
  const thumbsContainer = document.getElementById("lightboxThumbs");
  const activeThumb = thumbsContainer?.querySelector("img.active");
  if (!thumbsContainer || !activeThumb) return;

  const containerRect = thumbsContainer.getBoundingClientRect();
  const thumbRect = activeThumb.getBoundingClientRect();

  const offset = thumbRect.left - containerRect.left - (containerRect.width / 2) + (thumbRect.width / 2);

  thumbsContainer.scrollBy({
    left: offset,
    behavior: "smooth"
  });
}


document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("photoGallery")) {
    loadPhotos();
    setupLightboxButtons();
  }
});
