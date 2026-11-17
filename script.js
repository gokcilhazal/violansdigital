
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

/* PRICING CALCULATOR */

const pricingOptions = document.getElementById("pricingOptions");

const mainServiceInputs = document.querySelectorAll(
    'input[name="mainService"]'
);

const selectedService = document.getElementById("selectedService");
const selectedFeatures = document.getElementById("selectedFeatures");
const totalPrice = document.getElementById("totalPrice");

const serviceOptions = {
    web: {
        title: "Web Tasarım ve Geliştirme",
        groups: [
            {
                title: "Web sitesi türü",
                single: true,
                options: [
                    { name: "Kurumsal web sitesi", price: 9000 },
                    { name: "E-ticaret sitesi", price: 35000 },
                    { name: "Kişisel / Portfolyo sitesi", price: 6000 },
                    { name: "Online katalog sitesi", price: 8000 },
                    { name: "Randevu ve rezervasyon sitesi", price: 12000 }
                ]
            },
            {
                title: "Ek özellikler",
                options: [
                    { name: "Gelişmiş yönetim paneli", price: 3000 },
                    { name: "Çoklu dil desteği", price: 2000 },
                    { name: "Blog / Haber bölümü", price: 1000 },
                    { name: "WhatsApp entegrasyonu", price: 500 },
                    { name: "SEO altyapısı", price: 1500 }
                ]
            }
        ]
    },

    mobile: {
        title: "Mobil Uygulama",
        groups: [
            {
                title: "Uygulama platformu",
                single: true,
                options: [
                    { name: "Android uygulama", price: 45000 },
                    { name: "iOS uygulama", price: 55000 },
                    { name: "Android + iOS uygulama", price: 75000 }
                ]
            },
            {
                title: "Ek özellikler",
                options: [
                    { name: "Kullanıcı giriş ve kayıt sistemi", price: 2000 },
                    { name: "Bildirim sistemi", price: 2000 },
                    { name: "Yönetim paneli", price: 3000 },
                    { name: "Veritabanı bağlantısı", price: 3000 },
                    { name: "API entegrasyonu", price: 2500 },
                    { name: "Ödeme sistemi", price: 4000 }
                ]
            }
        ]
    },

    logo: {
        title: "Logo ve Kurumsal Kimlik",
        basePrice: 5000,
        baseLabel: "Özgün logo tasarımı",
        groups: [
            {
                title: "Ek tasarım hizmetleri",
                options: [
                    { name: "Alternatif logo tasarımları", price: 1000 },
                    { name: "Renk paleti oluşturma", price: 500 },
                    { name: "Kurumsal tipografi", price: 500 },
                    { name: "Kurumsal kimlik tasarımı", price: 3000 },
                    { name: "Marka kullanım kılavuzu", price: 1500 },
                    { name: "Kartvizit tasarımı", price: 600 },
                    { name: "Antetli kâğıt tasarımı", price: 600 },
                    { name: "Sosyal medya profil görseli", price: 500 },
                    { name: "E-posta imzası", price: 500 }
                ]
            }
        ]
    },

    socialDesign: {
        title: "Sosyal Medya Tasarımları",
        groups: [
            {
                title: "İçerik tasarımları",
                options: [
                    { name: "Instagram hikâye tasarımı", price: 100 },
                    { name: "Post tasarımı", price: 100 },
                    { name: "Carousel tasarımı", price: 1000 },
                    { name: "Reels video tasarımı", price: 150 },
                    { name: "Animasyonlu hikâye tasarımı", price: 1000 },
                    { name: "Ürün tanıtım tasarımı", price: 850 },
                    { name: "Kampanya / İndirim tasarımı", price: 750 }
                ]
            },
            {
                title: "Ek tasarım özellikleri",
                options: [
                    { name: "Markaya özel tasarım dili", price: 750 },
                    { name: "Hareketli yazı ve animasyon", price: 500 },
                    { name: "Profesyonel video kurgu", price: 750 },
                    { name: "Altyazı ekleme", price: 100 },
                    { name: "Müzik ve ses efektleri", price: 150 },
                    { name: "Logo animasyonu", price: 800 }
                ]
            }
        ]
    },

    management: {
        title: "Sosyal Medya Yönetimi",
        groups: [
            {
                title: "Aylık yönetim paketleri",
                single: true,
                billing: "monthly",
                options: [
                    { name: "Başlangıç Paketi", price: 8000 },
                    { name: "Standart Paket", price: 12000 },
                    { name: "Profesyonel Paket", price: 18000 }
                ]
            }
        ]
    }
};

function formatPrice(price) {
    return new Intl.NumberFormat("tr-TR").format(price) + " TL";
}

function renderPricingOptions() {
    if (!pricingOptions) return;

    pricingOptions.innerHTML = "";

    const checkedServices = [...mainServiceInputs].filter(
        input => input.checked
    );

    checkedServices.forEach(serviceInput => {
        const service = serviceOptions[serviceInput.value];

        if (!service) return;

        const serviceGroup = document.createElement("div");
        serviceGroup.className = "pricing-service-group";

        const heading = document.createElement("h3");
        heading.textContent = service.title;

        serviceGroup.appendChild(heading);

        service.groups.forEach((group, groupIndex) => {
            const groupContainer = document.createElement("div");
            groupContainer.className = "pricing-option-group";

            const groupTitle = document.createElement("h4");
            groupTitle.textContent = group.title;

            groupContainer.appendChild(groupTitle);

            group.options.forEach((option, optionIndex) => {
                const label = document.createElement("label");
                label.className = "pricing-option";

                const input = document.createElement("input");

                input.type = group.single ? "radio" : "checkbox";

                input.name = group.single
                    ? `pricing-${serviceInput.value}-${groupIndex}`
                    : `pricing-${serviceInput.value}-${groupIndex}-${optionIndex}`;

                input.value = option.price;
                input.dataset.name = option.name;
                input.dataset.price = option.price;
                input.dataset.billing = group.billing || "oneTime";

                const name = document.createElement("span");
                name.textContent = option.name;

                const price = document.createElement("strong");
                price.textContent = formatPrice(option.price);

                if (group.billing === "monthly") {
                    price.textContent += " / ay";
                }

                label.appendChild(input);
                label.appendChild(name);
                label.appendChild(price);

                groupContainer.appendChild(label);
            });

            serviceGroup.appendChild(groupContainer);
        });

        pricingOptions.appendChild(serviceGroup);
    });

    updatePricingSummary();
}

function updatePricingSummary() {
    if (!selectedService || !selectedFeatures || !totalPrice) return;

    const checkedServices = [...mainServiceInputs].filter(
        input => input.checked
    );

    const serviceNames = [];
    const featureDetails = [];

    let oneTimeTotal = 0;
    let monthlyTotal = 0;

    checkedServices.forEach(input => {
        const service = serviceOptions[input.value];

        if (!service) return;

        serviceNames.push(service.title);

        if (service.basePrice) {
            oneTimeTotal += service.basePrice;

            featureDetails.push(
                `${service.baseLabel}: ${formatPrice(service.basePrice)}`
            );
        }
    });

    const checkedFeatures = pricingOptions
        ? pricingOptions.querySelectorAll("input:checked")
        : [];

    checkedFeatures.forEach(input => {
        const price = Number(input.dataset.price) || 0;
        const name = input.dataset.name;

        if (input.dataset.billing === "monthly") {
            monthlyTotal += price;

            featureDetails.push(
                `${name}: ${formatPrice(price)} / ay`
            );
        } else {
            oneTimeTotal += price;

            featureDetails.push(
                `${name}: ${formatPrice(price)}`
            );
        }
    });

    selectedService.textContent = serviceNames.length
        ? serviceNames.join(" + ")
        : "Henüz hizmet seçilmedi.";

    selectedFeatures.textContent = featureDetails.length
        ? featureDetails.join(" | ")
        : "Henüz özellik seçilmedi.";

    if (oneTimeTotal > 0 && monthlyTotal > 0) {
        totalPrice.textContent =
            `${formatPrice(oneTimeTotal)} + ${formatPrice(monthlyTotal)} / ay`;
    } else if (monthlyTotal > 0) {
        totalPrice.textContent = `${formatPrice(monthlyTotal)} / ay`;
    } else {
        totalPrice.textContent = formatPrice(oneTimeTotal);
    }
}

mainServiceInputs.forEach(input => {
    input.addEventListener("change", renderPricingOptions);
});

if (pricingOptions) {
    pricingOptions.addEventListener("change", updatePricingSummary);
}

renderPricingOptions();


/* EMAILJS TEKLİF FORMU */

emailjs.init({
    publicKey: "cX4KUOZnlKwjpLDkk"
});

const offerForm = document.getElementById("offerForm");

if (offerForm) {
    offerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const checkedServices = [...mainServiceInputs].filter(
            input => input.checked
        );

        if (checkedServices.length === 0) {
            alert("Lütfen en az bir hizmet seçin.");
            return;
        }

        const serviceNames = checkedServices.map(input =>
            serviceOptions[input.value]?.title || input.value
        );

        const checkedFeatures = pricingOptions.querySelectorAll("input:checked");

        const featureNames = [...checkedFeatures].map(input => {
            const billing = input.dataset.billing === "monthly" ? " / ay" : "";
            return `${input.dataset.name} - ${formatPrice(Number(input.dataset.price))}${billing}`;
        });

        const templateParams = {
            customerName: document.getElementById("customerName").value,
            companyName: document.getElementById("companyName").value,
            customerEmail: document.getElementById("customerEmail").value,
            customerPhone: document.getElementById("customerPhone").value,
            projectNote: document.getElementById("projectNote").value,
            selectedServices: serviceNames.join(", "),
            selectedFeatures: featureNames.length
                ? featureNames.join("\n")
                : "Ek özellik seçilmedi.",
            estimatedPrice: totalPrice.textContent
        };

        const button = document.getElementById("sendOffer");
        const originalText = button.textContent;

        button.disabled = true;
        button.textContent = "Gönderiliyor...";

        try {
            await emailjs.send(
                "service_d10cjkm",
                "template_2fm3tpr",
                templateParams
            );

            alert("Teklif talebiniz başarıyla gönderildi. Teşekkür ederiz!");

            offerForm.reset();
            renderPricingOptions();

        } catch (error) {
            console.error("EmailJS gönderim hatası:", error);
            alert("Gönderim başarısız oldu. Lütfen tekrar deneyin.");
        } finally {
            button.disabled = false;
            button.textContent = originalText;
        }
    });
}
