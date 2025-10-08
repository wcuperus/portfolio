let currentIndex = 0;

function initDrawingsGallery(galleryId) {
  const gallery = document.getElementById(galleryId);
  if (!gallery) return;

  const images = Array.from(gallery.querySelectorAll("img"));

images.forEach((img, index) => {
  img.dataset.index = index;

  if (img.complete) {
    img.classList.add("loaded");
  } else {
    img.addEventListener("load", () => img.classList.add("loaded"));
  }

  img.addEventListener("click", () => openLightbox(images, index));
});


  setupLightboxButtons(images);
}

function openLightbox(images, index) {
  currentIndex = index;
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const thumbsContainer = document.getElementById("lightboxThumbs");
  if (!lightbox || !lightboxImg || !thumbsContainer) return;

  lightbox.classList.remove("hidden");
  lightboxImg.src = images[currentIndex].src;

  disableHamburger();

  thumbsContainer.innerHTML = "";
  images.forEach((img, i) => {
    const thumb = document.createElement("img");
    thumb.src = img.src;
    thumb.classList.toggle("active", i === currentIndex);
    thumb.addEventListener("click", () => {
      currentIndex = i;
      lightboxImg.src = images[currentIndex].src;
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


function setupLightboxButtons(images) {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const closeBtn = document.getElementById("closeLightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  if (!prevBtn || !nextBtn || !closeBtn || !lightboxImg) return;

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
    updateThumbs();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
    updateThumbs();
  });

  closeBtn.addEventListener("click", () => {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
      lightbox.classList.add("hidden");
      enableHamburger(); 
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
  if (document.getElementById("drawingsGallery")) {
    initDrawingsGallery("drawingsGallery");
  }
});
