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

  const links = navbarContainer.querySelectorAll("a");
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

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
    hamburger.style.zIndex = "0";
  }
}

function enableHamburger() {
  const hamburger = document.getElementById("hamburger");
  if (hamburger) {
    hamburger.style.pointerEvents = "auto";
    hamburger.style.opacity = "1";
    hamburger.style.zIndex = "1000"; 
  }
}

function addBackToTopButton() {
  const btn = document.createElement("button");
  btn.id = "backToTop";
  btn.textContent = "↑ Terug naar boven";

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
  btn.style.display = "none"; 

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });
}

function addFooter(options = {}) {
  const footer = document.createElement("footer");

  footer.style.background = "#222";
  footer.style.color = "white";
  footer.style.textAlign = "center";
  footer.style.padding = "1em";
  footer.style.marginTop = "2em";

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

  document.body.appendChild(footer);
}

function loadFooter(containerId = "footerContainer") {
  const container = document.getElementById(containerId);
  if (!container) return;

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
  const footerContainerId = options.containerId || "footerContainer";
  const container = document.getElementById(footerContainerId);

  if (!container) {
    const footer = document.createElement("footer");
    footer.id = footerContainerId;

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

    document.body.appendChild(footer);

    styleStickyFooter(footer);
  } else {
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

function styleStickyFooter(footer) {
  footer.style.width = "100%";
  footer.style.padding = "1em";
  footer.style.backgroundColor = "#222";
  footer.style.color = "#fff";
  footer.style.textAlign = "center";
  footer.style.position = "relative"; // standaard
  footer.style.marginTop = "2em";

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

  footer.innerHTML = `
    <div class="footer-links">
      <a href="index.html">Home</a> |
      <a href="fotos.html">Foto's</a> |
      <a href="videos.html">Video's</a> |
      <a href="tekeningen.html">Tekeningen</a>
    </div>
  `;

  document.body.appendChild(footer);

  footer.style.width = "100%";
  footer.style.backgroundColor = "#222";
  footer.style.color = "#fff";
  footer.style.textAlign = "center";
  footer.style.padding = "1em";
  footer.style.marginTop = "2em";
  footer.style.position = "relative";

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

    switch (slide.type) {
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
  const gallery = document.getElementById("drawingsGallery");
  if (!gallery) {
    return [
      "tekeningen/RainbowRoad.png",
      "tekeningen/strand.png",
      "tekeningen/tekening2.png"
    ];
  }
  return Array.from(gallery.querySelectorAll("img")).map(img => img.src);
}
