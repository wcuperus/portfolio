// ================================
// Navigatie
// ================================
function navigateTo(page) {
  window.location.href = page;
}

function loadNavbar() {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) return;

  navbarContainer.innerHTML = `
    <nav>
      <div class="hamburger" id="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul id="navLinks">
        <li><a href="index.html">Home</a></li>
        <li><a href="fotos.html">Foto's</a></li>
        <li><a href="videos.html">Video's</a></li>
        <li><a href="tekeningen.html">Tekeningen</a></li>
      </ul>
    </nav>
  `;

  // Active link highlight
  const links = navbarContainer.querySelectorAll("a");
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

  // Hamburger-menu functionaliteit
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      hamburger.classList.toggle("active"); 
    });
  }
}

function loadNavbarMobile() {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) return;

  navbarContainer.innerHTML = `
    <nav class="mobile-nav">
      <div class="hamburger" id="mobileHamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="mobile-menu" id="mobileMenu">
        <a href="index.html">Home</a>
        <a href="fotos.html">Foto's</a>
        <a href="videos.html">Video's</a>
        <a href="tekeningen.html">Tekeningen</a>
      </div>
    </nav>
  `;

  const hamburger = document.getElementById("mobileHamburger");
  const menu = document.getElementById("mobileMenu");

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      menu.classList.toggle("open");
    });
  }
}


function disableHamburger() {
  const hamburger = document.getElementById("hamburger");
  if (hamburger) {
    hamburger.style.pointerEvents = "none";
    hamburger.style.opacity = "0.5";
    hamburger.style.zIndex = "0"; // achter de lightbox
  }
}

function enableHamburger() {
  const hamburger = document.getElementById("hamburger");
  if (hamburger) {
    hamburger.style.pointerEvents = "auto";
    hamburger.style.opacity = "1";
    hamburger.style.zIndex = "1000"; // boven de content
  }
}

function addBackToTopButton() {
  // Maak de knop aan
  const btn = document.createElement("button");
  btn.id = "backToTop";
  btn.textContent = "↑ Terug naar boven";

  // Basisstijl (je kunt dit later ook in CSS zetten)
  btn.style.position = "fixed";
  btn.style.bottom = "20px";
  btn.style.right = "20px";
  btn.style.padding = "0.6em 1em";
  btn.style.fontSize = "1em";
  btn.style.border = "none";
  btn.style.borderRadius = "5px";
  btn.style.backgroundColor = "#ff9800";
  btn.style.color = "#fff";
  btn.style.cursor = "pointer";
  btn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  btn.style.zIndex = "1000";
  btn.style.display = "none"; // standaard verborgen

  // Klik-functionaliteit: scroll naar boven
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Voeg de knop toe aan de body
  document.body.appendChild(btn);

  // Toon de knop pas als je een stukje naar beneden scrolt
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });
}

function addFooter(options = {}) {
  // opties: { links: [{ text, href }] }
  const footer = document.createElement("footer");

  // basisstijl (optioneel, kan ook via CSS)
  footer.style.background = "#222";
  footer.style.color = "white";
  footer.style.textAlign = "center";
  footer.style.padding = "1em";
  footer.style.marginTop = "2em";

  // Voeg eventueel links toe
  if (options.links && options.links.length > 0) {
    const linkContainer = document.createElement("div");
    options.links.forEach(link => {
      const a = document.createElement("a");
      a.textContent = link.text;
      a.href = link.href;
      a.style.color = "#ff9800";
      a.style.margin = "0 0.5em";
      a.style.textDecoration = "none";
      a.addEventListener("mouseover", () => a.style.textDecoration = "underline");
      a.addEventListener("mouseout", () => a.style.textDecoration = "none");
      linkContainer.appendChild(a);
    });
    footer.appendChild(linkContainer);
  }

  // Voeg de footer toe aan de body
  document.body.appendChild(footer);
}

function loadFooter(containerId = "footerContainer") {
  const container = document.getElementById(containerId);
  if (!container) return; // als er geen container is, doe niks

  container.innerHTML = `
    <nav class="footer-nav">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="fotos.html">Foto's</a></li>
        <li><a href="videos.html">Video's</a></li>
        <li><a href="tekeningen.html">Tekeningen</a></li>
      </ul>
    </nav>
  `;
}

function loadFooter(options = {}) {
  // Optioneel: alleen toevoegen als container bestaat
  const footerContainerId = options.containerId || "footerContainer";
  const container = document.getElementById(footerContainerId);

  if (!container) {
    // Als er geen container is, maak er een aan onderaan body
    const footer = document.createElement("footer");
    footer.id = footerContainerId;

    // Voeg basis content toe (bijv. links)
    footer.innerHTML = `
      <nav>
        <div class="footer-links">
          <a href="index.html">Home</a> | 
          <a href="fotos.html">Foto's</a> | 
          <a href="videos.html">Video's</a> | 
          <a href="tekeningen.html">Tekeningen</a>
        </div>
      </nav>
    `;

    // Voeg aan body toe
    document.body.appendChild(footer);

    // Zorg dat footer altijd onderaan staat
    styleStickyFooter(footer);
  } else {
    // Als container bestaat, voeg hier content in
    container.innerHTML = `
      <nav>
        <div class="footer-links">
          <a href="index.html">Home</a> | 
          <a href="fotos.html">Foto's</a> | 
          <a href="videos.html">Video's</a> | 
          <a href="tekeningen.html">Tekeningen</a>
        </div>
      </nav>
    `;
    styleStickyFooter(container);
  }
}

// Optionele functie om footer onderaan te "plakken"
function styleStickyFooter(footer) {
  footer.style.width = "100%";
  footer.style.padding = "1em";
  footer.style.backgroundColor = "#222";
  footer.style.color = "#fff";
  footer.style.textAlign = "center";
  footer.style.position = "relative"; // standaard
  footer.style.marginTop = "2em";

  // Flexibele footer: als content kleiner is dan schermhoogte
  const bodyHeight = document.body.offsetHeight;
  const windowHeight = window.innerHeight;
  if (bodyHeight < windowHeight) {
    footer.style.position = "absolute";
    footer.style.bottom = "0";
  }
}

function addFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";

  // Voeg links toe in de footer
  footer.innerHTML = `
    <div class="footer-links">
      <a href="index.html">Home</a> |
      <a href="fotos.html">Foto's</a> |
      <a href="videos.html">Video's</a> |
      <a href="tekeningen.html">Tekeningen</a>
    </div>
  `;

  // Voeg de footer aan het einde van body toe
  document.body.appendChild(footer);

  // Basisstijl footer
  footer.style.width = "100%";
  footer.style.backgroundColor = "#222";
  footer.style.color = "#fff";
  footer.style.textAlign = "center";
  footer.style.padding = "1em";
  footer.style.marginTop = "2em";
  footer.style.position = "relative";

  // Voeg "Terug naar boven"-knop alleen als pagina scrollbaar is
  if (document.body.scrollHeight > window.innerHeight) {
    const btn = document.createElement("button");
    btn.textContent = "↑ Terug naar boven";
    btn.style.marginTop = "0.5em";
    btn.style.padding = "0.5em 1em";
    btn.style.fontSize = "0.9em";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.backgroundColor = "#ff9800";
    btn.style.color = "#fff";
    btn.style.cursor = "pointer";
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    footer.appendChild(document.createElement("br"));
    footer.appendChild(btn);
  }

  // Zorg dat footer onderaan blijft als content kleiner is dan schermhoogte
  if (document.body.scrollHeight < window.innerHeight) {
    footer.style.position = "absolute";
    footer.style.bottom = "0";
    footer.style.left = "0";
  }
}



document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();
  enableHamburger();
  addFooter();
  initSlideshow();
});

function initSlideshow() {
  const slides = [
    { href: "fotos.html", type: "photo", caption: "Bekijk foto's" },
    { href: "videos.html", type: "video", caption: "Bekijk video's" },
    { href: "tekeningen.html", type: "drawing", caption: "Bekijk tekeningen" },
    { href: "https://github.com/wcuperus", type: "github", caption: "GitHub" },
    { href: "https://www.linkedin.com/in/watsecuperus/", type: "linkedin", caption: "LinkedIn" }
  ];

  const drawings = getDrawingsArray();
  let index = 0;
  const slideImg = document.getElementById("slide-img");
  const slideLink = document.getElementById("slide-link");
  const slideCaption = document.getElementById("slide-caption");
  const intervalTime = 5000;
  let interval;

  function getRandomImage(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function showSlide(i) {
    const slide = slides[i];
    let src = "";
    let alt = "";

    switch(slide.type) {
      case "photo":
        src = "afbeeldingen/" + getRandomImage(images);
        alt = "Bekijk mijn foto's";
        break;
      case "drawing":
        src = getRandomImage(drawings);
        alt = "Bekijk mijn tekeningen";
        break;
      case "video":
        src = "data/video.jpg";
        alt = "Bekijk mijn video's";
        break;
      case "github":
        src = "data/Github_preview.png";
        alt = "GitHub";
        break;
      case "linkedin":
        src = "data/LinkedIn_preview.png";
        alt = "LinkedIn";
        break;
    }

    // Fade animatie
    slideImg.style.opacity = 0;
    setTimeout(() => {
      slideImg.src = src;
      slideImg.alt = alt;
      slideLink.href = slide.href;
      slideCaption.textContent = slide.caption;
      slideImg.style.opacity = 1;
    }, 300);
  }

  function nextSlide() { index = (index + 1) % slides.length; showSlide(index); }
  function prevSlide() { index = (index - 1 + slides.length) % slides.length; showSlide(index); }

  document.querySelector(".slideshow-container .next").addEventListener("click", () => { nextSlide(); resetInterval(); });
  document.querySelector(".slideshow-container .prev").addEventListener("click", () => { prevSlide(); resetInterval(); });

  function resetInterval() { clearInterval(interval); interval = setInterval(nextSlide, intervalTime); }

  showSlide(index);
  interval = setInterval(nextSlide, intervalTime);
}


function getDrawingsArray() {
  // Kijk of we een #drawingsGallery op de pagina hebben (of elders in DOM)
  const gallery = document.getElementById("drawingsGallery");
  if (!gallery) {
    // fallback: vaste lijst of lege array
    return [
      "tekeningen/RainbowRoad.png",
      "tekeningen/strand.png",
      "tekeningen/tekening2.png"
    ];
  }
  // Pak alle <img> src attributen
  return Array.from(gallery.querySelectorAll("img")).map(img => img.src);
}
