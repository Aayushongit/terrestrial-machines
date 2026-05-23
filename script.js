// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll-reveal for cards
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".card").forEach((c) => io.observe(c));

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightboxContent");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(srcEl) {
  lightboxContent.innerHTML = "";
  let node;
  if (srcEl.tagName === "VIDEO") {
    node = document.createElement("video");
    node.src = srcEl.currentSrc || srcEl.src;
    node.autoplay = true;
    node.loop = true;
    node.muted = true;
    node.controls = true;
    node.playsInline = true;
  } else {
    node = document.createElement("img");
    node.src = srcEl.src;
    node.alt = srcEl.alt || "";
  }
  lightboxContent.appendChild(node);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxContent.innerHTML = "";
}

document.querySelectorAll(".media").forEach((m) => {
  m.addEventListener("click", () => {
    const media = m.querySelector("img, video");
    if (media) openLightbox(media);
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
