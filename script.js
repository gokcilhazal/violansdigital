
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Menüyü kapat" : "Menüyü aç"
    );
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Menüyü aç");
    });
});

/* PROJECT DETAIL MODAL */

const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");

const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalFeatures = document.getElementById("modalFeatures");

const projectDetails = {
    web: {
        category: "WEB TASARIM",
        title: "Modern Web Deneyimi",
        description: "Markalar için modern, hızlı ve kullanıcı dostu web sitesi tasarımları.",
        features: [
            "Mobil uyumlu tasarım",
            "Modern kullanıcı arayüzü",
            "Kullanıcı deneyimi odaklı yapı",
            "Markaya özel görsel kimlik"
        ]
    },

    software: {
        category: "YAZILIM",
        title: "Akıllı Yazılım Çözümleri",
        description: "İş süreçlerini kolaylaştıran ve yönetimi kolaylaştıran yazılım çözümleri.",
        features: [
            "Modern yönetim paneli",
            "Veri görselleştirme",
            "Kullanıcı dostu arayüz",
            "İhtiyaca özel yazılım yaklaşımı"
        ]
    },

    social: {
        category: "SOSYAL MEDYA",
        title: "Marka Kimliği ve Sosyal Medya",
        description: "Markaların dijital dünyada güçlü ve tutarlı bir görünüm kazanması için yaratıcı sosyal medya tasarımları.",
        features: [
            "Instagram gönderi tasarımları",
            "Hikâye tasarımları",
            "Markaya özel renk ve tipografi",
            "Tutarlı görsel içerik dili"
        ]
    }
};

function openProject(project) {
    const details = projectDetails[project];

    if (!details) return;

    modalCategory.textContent = details.category;
    modalTitle.textContent = details.title;
    modalDescription.textContent = details.description;

    modalFeatures.innerHTML = "";

    details.features.forEach(feature => {
        const li = document.createElement("li");
        li.textContent = feature;
        modalFeatures.appendChild(li);
    });

    projectModal.classList.add("active");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    modalClose.focus();
}

function closeProject() {
    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        openProject(card.dataset.project);
    });

    card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProject(card.dataset.project);
        }
    });
});

modalClose.addEventListener("click", closeProject);

projectModal.addEventListener("click", event => {
    if (event.target === projectModal) {
        closeProject();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" &&
        projectModal.classList.contains("active")) {
        closeProject();
    }
});
/* LIGHT / DARK MODE */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("violans-theme");

if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
}

if (themeToggle) {
    updateThemeIcon();

    themeToggle.addEventListener("click", () => {
        const currentTheme =
            document.documentElement.getAttribute("data-theme") || "light";

        const newTheme = currentTheme === "light" ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("violans-theme", newTheme);

        updateThemeIcon();
    });
}

function updateThemeIcon() {
    if (!themeToggle) return;

    const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";

    themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-label",
        currentTheme === "dark" ? "Açık moda geç" : "Gece moduna geç"
    );

    const logo = document.querySelector(".logo img");

    if (logo) {
        logo.src = currentTheme === "dark"
            ? logo.dataset.darkLogo
            : logo.dataset.lightLogo;
    }
}