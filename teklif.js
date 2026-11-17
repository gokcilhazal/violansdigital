/* PRICING CALCULATOR */


const pricingOptions = document.getElementById("pricingOptions");


const mainServiceInputs = document.querySelectorAll(
    'input[name="mainService"]'
);


const selectedService = document.getElementById("selectedService");
const selectedFeatures = document.getElementById("selectedFeatures");
const totalPrice = document.getElementById("totalPrice");
const optionsStep = document.getElementById("optionsStep");
const customerStep = document.getElementById("customerStep");
const customerInputs = document.getElementById("customerInputs");


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
            quantity: true,
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
    const previouslySelected = new Set(
        [...pricingOptions.querySelectorAll("input:checked")]
            .map(input => input.name)
    );

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
                input.checked = previouslySelected.has(input.name);

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

                if (group.quantity) {
                    const quantity = document.createElement("input");

                    quantity.type = "number";
                    quantity.className = "pricing-quantity";
                    quantity.min = "1";
                    quantity.max = "999";
                    quantity.step = "1";
                    quantity.value = "1";
                    quantity.setAttribute("aria-label", option.name + " adedi");

                    label.appendChild(quantity);
                }

                groupContainer.appendChild(label);
            });


            serviceGroup.appendChild(groupContainer);
        });


        pricingOptions.appendChild(serviceGroup);
    });


    updatePricingSummary();


}

/* =========================
   TEKLİF FORMU - ADIM YÖNETİMİ
========================= */

const serviceStep = document.getElementById("serviceStep");

let currentWizardStep = 1;

function showWizardStep(step) {
    const steps = [
        serviceStep,
        optionsStep,
        customerStep
    ];

    steps.forEach((panel, index) => {
        if (!panel) return;

        panel.classList.toggle(
            "step-hidden",
            index !== step - 1
        );
    });

    currentWizardStep = step;
}

/* HİZMET SEÇİMİ DEĞİŞİNCE */

mainServiceInputs.forEach(input => {
    input.addEventListener("change", () => {
        renderPricingOptions();
        updatePricingSummary();
    });
});

/* 1. ADIMDAN 2. ADIMA */

document.getElementById("toOptions")?.addEventListener("click", () => {

    const hasService = [...mainServiceInputs].some(
        input => input.checked
    );

    if (!hasService) {
        alert("Lütfen önce bir hizmet seçin.Hizmet seçmeden sonraki adıma geçemezsiniz.");
        return;
    }


    renderPricingOptions();
    showWizardStep(2);
});

/* 2. ADIMDAN 1. ADIMA */

document.getElementById("backToServices")?.addEventListener("click", () => {
    showWizardStep(1);
});

/* 2. ADIMDAN 3. ADIMA */

document.getElementById("toCustomer")?.addEventListener("click", () => {

    const hasSelectedFeature = pricingOptions?.querySelector(
        "input:checked"
    );

    const hasBaseService = [...mainServiceInputs].some(input =>
        input.checked && serviceOptions[input.value]?.basePrice
    );

    if (!hasSelectedFeature && !hasBaseService) {
        alert("Lütfen en az bir özellik seçin.", "Özellik seçmeden sonraki adıma geçemezsiniz."

        );
        return;
    }

    showWizardStep(3);
});

/* 3. ADIMDAN 2. ADIMA */

document.getElementById("backToOptions")?.addEventListener("click", () => {
    showWizardStep(2);
});

/* ÖZELLİK SEÇİMİ DEĞİŞİNCE */

if (pricingOptions) {
    pricingOptions.addEventListener("change", () => {
        updatePricingSummary();
    });
}

/* İLK AÇILIŞ */

renderPricingOptions();
updatePricingSummary();
showWizardStep(1);



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

        const quantityInput = input.closest(".pricing-option")
            ?.querySelector(".pricing-quantity");

        const quantity = Math.max(
            1,
            Math.min(999, Number(quantityInput?.value) || 1)
        );

        const lineTotal = price * quantity;


        if (input.dataset.billing === "monthly") {
            monthlyTotal += lineTotal;


            featureDetails.push(
                `${name} (${quantity} adet): ${formatPrice(lineTotal)} / ay`
            );

        } else {
            oneTimeTotal += lineTotal;

            featureDetails.push(
                `${name} (${quantity} adet): ${formatPrice(lineTotal)}`
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
    input.addEventListener("change", () => {
        renderPricingOptions();
        updateStepFlow(true);
    });
});

if (pricingOptions) {
    pricingOptions.addEventListener("change", () => {
        updatePricingSummary();
        updateStepFlow(true);
    });
}
pricingOptions?.addEventListener("input", (e) => {
    if (e.target.classList.contains("pricing-quantity")) {
        updatePricingSummary();
    }
});

renderPricingOptions();
updateStepFlow();

/* TEKLİF GÖNDERME KONTROLÜ */

const offerForm = document.getElementById("offerForm");

if (offerForm) {
    offerForm.addEventListener("submit", function (e) {

        const hasService = [...mainServiceInputs].some(
            input => input.checked
        );

        if (!hasService) {
            e.preventDefault();
            alert("Lütfen teklif almak istediğiniz hizmeti seçin.");
            showWizardStep(1);
            return;
        }

        const hasFeature = pricingOptions?.querySelector("input:checked");

        const hasBaseService = [...mainServiceInputs].some(input =>
            input.checked && serviceOptions[input.value]?.basePrice
        );

        if (!hasFeature && !hasBaseService) {
            e.preventDefault();
            alert("Lütfen almak istediğiniz hizmetin özelliklerini seçin.");
            showWizardStep(2);
            return;
        }

        const name = document.getElementById("customerName");
        const email = document.getElementById("customerEmail");
        const phone = document.getElementById("customerPhone");

        if (!name?.value.trim()) {
            e.preventDefault();
            alert("Lütfen adınızı ve soyadınızı girin.");
            showWizardStep(3);
            name?.focus();
            return;
        }

        if (!email?.value.trim()) {
            e.preventDefault();
            alert("Lütfen e-posta adresinizi girin.");
            showWizardStep(3);
            email?.focus();
            return;
        }

        if (!phone?.value.trim()) {
            e.preventDefault();
            alert("Lütfen telefon numaranızı girin.");
            showWizardStep(3);
            phone?.focus();
            return;
        }

        alert("Teklif talebiniz gönderiliyor. Lütfen bekleyin.");

    });
}
/* VIOLANS DIGITAL CUSTOM ALERT */

const customAlert = document.getElementById("customAlert");
const customAlertTitle = document.getElementById("customAlertTitle");
const customAlertMessage = document.getElementById("customAlertMessage");
const closeCustomAlert = document.getElementById("closeCustomAlert");

let alertTimer;

function showCustomAlert(message, title = "Bilgilendirme") {
    if (!customAlert) return;

    customAlertTitle.textContent = title;
    customAlertMessage.textContent = message;

    customAlert.classList.add("show");

    clearTimeout(alertTimer);

    alertTimer = setTimeout(() => {
        customAlert.classList.remove("show");
    }, 4000);
}

closeCustomAlert?.addEventListener("click", () => {
    customAlert.classList.remove("show");
    clearTimeout(alertTimer);
});