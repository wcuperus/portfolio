// ================================
// Navigatie
// ================================
function navigateTo(page) {
  window.location.href = page;
}

// Navbar includer
function loadNavbar() {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) return;

  navbarContainer.innerHTML = `
    <nav>
      <ul>
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
}

// DOMContentLoaded algemeen
document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();
});
