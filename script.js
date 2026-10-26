// The House of Labels — page interactions
// IMPORTANT: Replace this demo number with the client's WhatsApp number in international format,
// digits only (India example: 91 followed by the 10-digit mobile number).
const WHATSAPP_NUMBER = "919999999999";

const menuToggle = document.getElementById("menuToggle");
const navlinks = document.getElementById("navlinks");

if (menuToggle && navlinks) {
  menuToggle.addEventListener("click", () => navlinks.classList.toggle("open"));

  navlinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navlinks.classList.remove("open");
      navlinks
        .querySelectorAll("a")
        .forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
}

// Product category filters
document.querySelectorAll("#productFilters .filter").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll("#productFilters .filter")
      .forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const selectedCategory = button.dataset.filter;
    document.querySelectorAll(".product-card").forEach((card) => {
      card.hidden = !(
        selectedCategory === "all" || card.dataset.category === selectedCategory
      );
      card.style.display = card.hidden ? "none" : "";
    });
  });
});

// Gallery filters
document.querySelectorAll("#galleryFilters .filter").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll("#galleryFilters .filter")
      .forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const selectedCategory = button.dataset.gallery;
    document.querySelectorAll("[data-gallery-item]").forEach((image) => {
      const visible =
        selectedCategory === "all" ||
        image.dataset.galleryItem === selectedCategory;
      image.hidden = !visible;
      image.style.display = visible ? "" : "none";
    });
  });
});

// WhatsApp helper shared by direct chat links and the quotation form.
function openWhatsApp(
  message = "Hello The House of Labels, I would like to discuss my label requirements and request a quotation.",
) {
  const phone = WHATSAPP_NUMBER.replace(/\D/g, "");
  if (!phone || phone.length < 10 || phone === "919999999999") {
    // The placeholder still opens WhatsApp for demonstration, but must be replaced before launch.
    console.warn(
      "Demo WhatsApp number in use. Replace WHATSAPP_NUMBER in script.js before publishing.",
    );
  }
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  link.setAttribute("href", `https://wa.me/${WHATSAPP_NUMBER}`);
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openWhatsApp();
  });
});

// Keep the footer year current.
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Quote form: validate fields and prepare a properly URL-encoded WhatsApp message.
const quoteForm = document.getElementById("quoteForm");
if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;

    const formData = new FormData(quoteForm);
    const message = [
      "Hello The House of Labels, I would like to request a quotation.",
      "",
      `Name: ${formData.get("name") || "Not provided"}`,
      `Company: ${formData.get("company") || "Not provided"}`,
      `Email: ${formData.get("email") || "Not provided"}`,
      `Phone: ${formData.get("phone") || "Not provided"}`,
      `Product: ${formData.get("product") || "Not selected"}`,
      `Requirements: ${formData.get("requirements") || "Not provided"}`,
    ].join("\n");

    openWhatsApp(message);
  });
}

// Image fallback: keep layout tidy if a remote demo image cannot load.
document.querySelectorAll("img").forEach((image) => {
  image.addEventListener(
    "error",
    () => {
      image.classList.add("image-unavailable");
      image.removeAttribute("src");
      image.alt = image.alt || "Image to be supplied by The House of Labels";
    },
    { once: true },
  );
});



document.addEventListener("DOMContentLoaded", () => {
  const machineButtons = document.querySelectorAll(".machine-row");
  const mainImage = document.getElementById("mainMachineImage");
  const mainTitle = document.getElementById("mainMachineTitle");
  const mainDescription = document.getElementById(
    "mainMachineDescription"
  );

  machineButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const title = button.dataset.title;
      const description = button.dataset.description;
      const image = button.dataset.image;

      // Update the featured machine details
      mainImage.src = image;
      mainImage.alt = title;
      mainTitle.textContent = title;
      mainDescription.textContent = description;

      // Update active selection
      machineButtons.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
    });
  });
});


// Scroll reveal animation for sections and cards. Content remains visible if JS is unavailable.
document.addEventListener("DOMContentLoaded", () => {
  const revealTargets = document.querySelectorAll(
    ".section-head, .section-heading, .about-copy, .about-image, .value-card, .what-card, .product-card, .machine-feature, .machine-row, .industry-grid-no-images .industry-card, .gallery-grid img, .quote-form, .contact-card"
  );

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.body.classList.add("reveal-ready");
  revealTargets.forEach((element, index) => {
    element.classList.add("reveal-item");
    element.style.animationDelay = `${(index % 4) * 70}ms`;
  });

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

  revealTargets.forEach((element) => observer.observe(element));
});
