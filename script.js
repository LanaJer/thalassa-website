const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
const revealEls = document.querySelectorAll(".reveal");
const yearEl = document.getElementById("year");
const contactForm = document.getElementById("contact-form");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get("name") || "").toString().trim();
    const company = (formData.get("company") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    const subject = encodeURIComponent(`New inquiry from ${company || "Website"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company}\n\nMessage:\n${message}\n\nSent from thalassa.dev website form.`
    );

    window.location.href = `mailto:ops@thalassa.dev?subject=${subject}&body=${body}`;
  });
}
