// Make mobile navigation work
const navButton = document.querySelector(".btn-mobile-nav");
const navbar = document.querySelector(".navbar");

navButton.addEventListener("click", function () {
  navbar.classList.toggle("nav-open");
});

// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Smooth scrolling animation
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile naviagtion
    if (link.classList.contains("navlink")) navbar.classList.toggle("nav-open");
  });
});

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

// Sticky navigation
const sectionHeroEl = document.querySelector(".hero-section");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (!ent.isIntersecting) document.body.classList.add("sticky");
    if (ent.isIntersecting) document.body.classList.remove("sticky");
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// Modal carasel
// Select elements
const galleryImages = document.querySelectorAll(".gallery-img");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeIcon = document.querySelector(".close");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentImageIndex = 0;

// Function to open the modal with the clicked image
function openModal(index) {
  currentImageIndex = index;
  modalImage.src = galleryImages[currentImageIndex].src;
  modal.style.display = "block";
}

// Function to close the modal
function closeModalFunc() {
  modal.style.display = "none";
}

// Function to navigate to the next image in the gallery
function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  modalImage.src = galleryImages[currentImageIndex].src;
}

// Function to navigate to the previous image in the gallery
function prevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  modalImage.src = galleryImages[currentImageIndex].src;
}

// Add event listeners to gallery images
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => openModal(index));
});

// Event listeners for closing modal and navigating through images
closeIcon.addEventListener("click", closeModalFunc);
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

// Close modal if user clicks outside of the image
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModalFunc();
  }
});
