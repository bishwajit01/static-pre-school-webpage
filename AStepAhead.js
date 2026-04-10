// Helpers
const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => Array.from(root.querySelectorAll(q));

/* ===== Year ===== */
$("#year").textContent = new Date().getFullYear();

/* ===== Mobile nav ===== */
const navToggle = $("#navToggle");
const navList = $("#navList");

function closeNav() {
  navList.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close nav when clicking a link
$$("#navList a").forEach((a) => a.addEventListener("click", closeNav));

// Close nav when clicking outside
document.addEventListener("click", (e) => {
  if (!navList.classList.contains("is-open")) return;
  const clickedInside =
    navList.contains(e.target) || navToggle.contains(e.target);
  if (!clickedInside) closeNav();
});

/* ===== Back to top button ===== */
const fab = $("#fab");
window.addEventListener("scroll", () => {
  fab.style.display = window.scrollY > 700 ? "grid" : "none";
});
fab.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

/* ===== Animated counters (stats) ===== */
function animateCount(el) {
  const targetStr = el.getAttribute("data-count") || "0";
  const target = Number(targetStr);
  const isFloat = targetStr.includes(".");
  const duration = 900;

  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const value = target * t;

    el.textContent = isFloat ? value.toFixed(1) : Math.round(value).toString();

    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statNums = $$(".stat__num");
let statsAnimated = false;

const ioStats = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNums.forEach(animateCount);
        ioStats.disconnect();
      }
    });
  },
  { threshold: 0.35 },
);

const statsSection = $(".stats");
if (statsSection) ioStats.observe(statsSection);

/* ===== Carousel ===== */
const track = $("#carouselTrack");
const prevSlide = $("#prevSlide");
const nextSlide = $("#nextSlide");

let slideIndex = 0;
function setSlide(i) {
  if (!track) return;
  const slides = $$(".slide", track);
  if (!slides.length) return;

  slideIndex = (i + slides.length) % slides.length;

  track.scrollTo({
    left: track.clientWidth * slideIndex,
    behavior: "smooth",
  });
}

prevSlide?.addEventListener("click", () => setSlide(slideIndex - 1));
nextSlide?.addEventListener("click", () => setSlide(slideIndex + 1));

// Auto-advance
let carouselTimer = null;
function startCarousel() {
  if (!track) return;
  carouselTimer = setInterval(() => setSlide(slideIndex + 1), 4500);
}
function stopCarousel() {
  if (carouselTimer) clearInterval(carouselTimer);
}
track?.addEventListener("mouseenter", stopCarousel);
track?.addEventListener("mouseleave", startCarousel);

track?.addEventListener("scroll", () => {
  const width = track.clientWidth || 1;
  slideIndex = Math.round(track.scrollLeft / width);
});

window.addEventListener("resize", () => setSlide(slideIndex));

setSlide(0);
startCarousel();

/* ===== Testimonials ===== */
const testimonials = [
  {
    quote:
      "My child became more confident in just a few weeks. The teachers are very caring and communicative.",
    name: "Priya S.",
    meta: "Parent of Nursery child • Ranchi",
  },
  {
    quote:
      "Clean campus, good routines, and lots of activities. The transition to school was smooth for our kid.",
    name: "Rohit K.",
    meta: "Parent of LKG child • Ranchi",
  },
  {
    quote:
      "We love the daily updates and the way they focus on manners, sharing, and speaking skills.",
    name: "Neha M.",
    meta: "Parent of Playgroup child • Ranchi",
  },
];

const tCard = $("#tCard");
const tPrev = $("#tPrev");
const tNext = $("#tNext");
const tDots = $("#tDots");

let tIndex = 0;

function renderTestimonial(i) {
  tIndex = (i + testimonials.length) % testimonials.length;
  const t = testimonials[tIndex];

  if (tCard) {
    const initials = (t.name || "P")
      .split(" ")
      .map((s) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    tCard.innerHTML = `
      <div class="quote">“${t.quote}”</div>
      <div class="person">
        <div class="avatar" aria-hidden="true">${initials}</div>
        <div>
          <b>${t.name}</b>
          <div class="muted small">${t.meta}</div>
        </div>
      </div>
    `;
  }

  if (tDots) {
    tDots.innerHTML = testimonials
      .map(
        (_, idx) => `
      <button class="dotbtn ${idx === tIndex ? "is-active" : ""}" aria-label="Go to testimonial ${idx + 1}"></button>
    `,
      )
      .join("");

    $$(".dotbtn", tDots).forEach((btn, idx) =>
      btn.addEventListener("click", () => renderTestimonial(idx)),
    );
  }
}

tPrev?.addEventListener("click", () => renderTestimonial(tIndex - 1));
tNext?.addEventListener("click", () => renderTestimonial(tIndex + 1));

renderTestimonial(0);

// Auto
setInterval(() => renderTestimonial(tIndex + 1), 6500);

/* ===== FAQ accordion ===== */
$$(".acc").forEach((acc) => {
  const q = $(".acc__q", acc);
  q.addEventListener("click", () => {
    const isOpen = acc.classList.toggle("is-open");
    q.setAttribute("aria-expanded", String(isOpen));
  });
});

/* ===== Enquiry form validation + toast ===== */
const form = $("#enquiryForm");
const toast = $("#toast");

function setError(name, message) {
  const box = document.querySelector(`[data-error-for="${name}"]`);
  if (box) box.textContent = message || "";
}

function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.style.display = "block";
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => (toast.style.display = "none"), 3600);
}

function onlyDigits(s) {
  return (s || "").replace(/\D/g, "");
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const parentName = ($("#parentName").value || "").trim();
  const phoneRaw = ($("#phone").value || "").trim();
  const phone = onlyDigits(phoneRaw);
  const program = ($("#program").value || "").trim();
  const area = ($("#area").value || "").trim();

  // Reset errors
  ["parentName", "phone", "program"].forEach((k) => setError(k, ""));

  let ok = true;

  if (parentName.length < 2) {
    setError("parentName", "Please enter parent name.");
    ok = false;
  }

  if (phone.length !== 10) {
    setError("phone", "Enter a valid 10-digit mobile number.");
    ok = false;
  }

  if (!program) {
    setError("program", "Please select a program.");
    ok = false;
  }

  if (!ok) return;

  const message =
    `Hello! I want admission details.\n\nParent: ${parentName}\nPhone: ${phone}\nProgram: ${program}\nArea: ${area || "-"}\nCity: Ranchi`;
  const phoneNumber = "919611418633";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  showToast("Enquiry submitted! Opening WhatsApp…");

  // Open in a new tab from the user interaction; if blocked, redirect current tab.
  const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  if (!popup) {
    window.location.assign(whatsappUrl);
  }

  form.reset();
});


/* ===== Rotating Image Slider (FADE) ===== */
const imgTrack = document.getElementById("imgTrack");
const imgPrev = document.getElementById("imgPrev");
const imgNext = document.getElementById("imgNext");
const imgDots = document.getElementById("imgDots");

let imgIndex = 0;
let imgTimer = null;

function canLoadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

async function discoverSliderImages() {
  const found = [];
  const exts = ["webp"];
  const maxScan = 50;
  let missingInARow = 0;

  for (let i = 1; i <= maxScan; i += 1) {
    let matchedSrc = "";

    for (const ext of exts) {
      const candidate = `images/slide${i}.${ext}`;
      // Probe available files because browsers cannot list local folders directly.
      // We rely on a predictable naming pattern: slide1, slide2, slide3, ...
      // eslint-disable-next-line no-await-in-loop
      const ok = await canLoadImage(candidate);
      if (ok) {
        matchedSrc = candidate;
        break;
      }
    }

    if (matchedSrc) {
      found.push(matchedSrc);
      missingInARow = 0;
    } else {
      missingInARow += 1;
      if (missingInARow >= 3) break;
    }
  }

  return found;
}

function buildSliderMarkup(imageSources) {
  if (!imgTrack) return;

  imgTrack.innerHTML = imageSources
    .map(
      (src, idx) => `
      <div class="imgslide">
        <img src="${src}" alt="School highlight ${idx + 1}" loading="lazy">
      </div>
    `,
    )
    .join("");
}

function imgSlides() {
  return imgTrack ? Array.from(imgTrack.querySelectorAll(".imgslide")) : [];
}

function renderImgDots() {
  const slides = imgSlides();
  if (!imgDots) return;

  imgDots.innerHTML = slides.map((_, i) =>
    `<button class="imgdot ${i === imgIndex ? "is-active" : ""}" aria-label="Go to image ${i + 1}"></button>`
  ).join("");

  Array.from(imgDots.querySelectorAll(".imgdot")).forEach((btn, i) => {
    btn.addEventListener("click", () => setImgSlide(i, true));
  });
}

function setImgSlide(i, userAction = false) {
  const slides = imgSlides();
  if (!imgTrack || slides.length === 0) return;

  imgIndex = (i + slides.length) % slides.length;

  slides.forEach((slide, idx) => {
    slide.classList.toggle("is-active", idx === imgIndex);
  });

  renderImgDots();

  if (userAction) restartImgAuto();
}

function startImgAuto() {
  if (!imgTrack) return;
  imgTimer = setInterval(() => setImgSlide(imgIndex + 1), 4000);
}

function stopImgAuto() {
  if (imgTimer) clearInterval(imgTimer);
  imgTimer = null;
}

function restartImgAuto() {
  stopImgAuto();
  startImgAuto();
}

imgPrev?.addEventListener("click", () => setImgSlide(imgIndex - 1, true));
imgNext?.addEventListener("click", () => setImgSlide(imgIndex + 1, true));

/* Pause on hover (desktop) */
imgTrack?.addEventListener("mouseenter", stopImgAuto);
imgTrack?.addEventListener("mouseleave", startImgAuto);

/* Initialize */
async function initImageSlider() {
  if (!imgTrack) return;

  const discoveredImages = await discoverSliderImages();

  if (discoveredImages.length > 0) {
    buildSliderMarkup(discoveredImages);
  }

  if (imgSlides().length === 0) {
    const imgViewport = document.getElementById("imgViewport");
    if (imgViewport) imgViewport.style.display = "none";
    if (imgPrev) imgPrev.style.display = "none";
    if (imgNext) imgNext.style.display = "none";
    if (imgDots) {
      imgDots.innerHTML = '<span class="muted small">No slider images found in images folder.</span>';
    }
    return;
  }

  setImgSlide(0);
  startImgAuto();
}

initImageSlider();
