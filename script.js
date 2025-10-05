// Navigatie vanaf de kaarten
function navigateTo(page) {
  window.location.href = page;
}

// Navbar includer (zonder fetch, werkt ook lokaal via file://)
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

  document.getElementById("navbar").innerHTML = navbarHTML;

  // Active link highlight
  const links = document.querySelectorAll("#navbar a");
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
}

function loadPhotos() {
  if (typeof images === "undefined" || images.length === 0) {
    console.error("Geen afbeeldingen gevonden!");
    return;
  }

  const gallery = document.getElementById("photoGallery");

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

// Lightbox functionaliteit
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const thumbsContainer = document.getElementById("lightboxThumbs");

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

function updateThumbs() {
  const thumbs = document.querySelectorAll("#lightboxThumbs img");
  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === currentIndex);
  });
}

// Navigatie knoppen
document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  document.getElementById("lightboxImg").src = `afbeeldingen/${images[currentIndex]}`;
  updateThumbs();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  document.getElementById("lightboxImg").src = `afbeeldingen/${images[currentIndex]}`;
  updateThumbs();
});

document.getElementById("closeLightbox").addEventListener("click", () => {
  document.getElementById("lightbox").classList.add("hidden");
});



document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();
  loadPhotos();
});