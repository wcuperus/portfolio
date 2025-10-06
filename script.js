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
    });
  }
}


// DOMContentLoaded algemeen
document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();
});
