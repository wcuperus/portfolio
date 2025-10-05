// ================================
// Algemene functies
// ================================

// Navigatie vanaf de kaarten
function navigateTo(page) {
  window.location.href = page;
}

// Navbar includer
function loadNavbar() {
  const navbarHTML = `
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="fotos.html">Foto's</a></li>
        <li><a href="videos.html">Video's</a></li>
        <li><a href="tekeningen.html">Tekeningen</a></li>
      </ul>
    </nav>
  `;
  const navbarContainer = document.getElementById("navbar");
  if (navbarContainer) {
    navbarContainer.innerHTML = navbarHTML;

    // Active link highlight
    const links = navbarContainer.querySelectorAll("a");
    links.forEach(link => {
      if (link.href === window.location.href) {
        link.classList.add("active");
      }
    });
  }
}

// ================================
// Fotos.html functies
// ================================

let currentIndex = 0;

// Laad foto's in gallery
function loadPhotos() {
  const gallery = document.getElementById("photoGallery");
  if (!gallery || typeof images === "undefined" || images.length === 0) {
    console.warn("Geen afbeeldingen gevonden of deze pagina heeft geen photoGallery.");
    return;
  }

  images.forEach((filename, index) => {
    const img = document.createElement("img");
    img.src = `afbeeldingen/${filename}`;
    img.alt = filename.split(".")[0];
    img.dataset.index = index;
    gallery.appendChild(img);

    // Klik om lightbox te openen
    img.addEventListener("click", () => openLightbox(index));
  });
}

// Open lightbox
function openLightbox(index) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const thumbsContainer = document.getElementById("lightboxThumbs");

  if (!lightbox || !lightboxImg || !thumbsContainer) return;

  currentIndex = index;
  lightbox.classList.remove("hidden");
  lightboxImg.src = `afbeeldingen/${images[currentIndex]}`;

  // Thumbnails
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
}

// Update thumbnail highlight
function updateThumbs() {
  const thumbs = document.querySelectorAll("#lightboxThumbs img");
  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === currentIndex);
  });
}

// Lightbox navigatie knoppen
function setupLightboxButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const closeBtn = document.getElementById("closeLightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  if (prevBtn && nextBtn && closeBtn && lightboxImg) {
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
      document.getElementById("lightbox").classList.add("hidden");
    });
  }
}

// ================================
// DOMContentLoaded
// ================================
document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();

  // Fotos.html check
  if (document.getElementById("photoGallery")) {
    loadPhotos();
    setupLightboxButtons();
  }
});
