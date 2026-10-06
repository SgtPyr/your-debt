const paymentMethods = {

    gcash: {
        name: "GCash",
        subtitle: "Scan. Pay. Done.",
        icon: "G",
        iconClass: "gcash-icon",
        qr: "images/gcash-qr.png",

        accountName: "Wilson M.",
        accountLabel: "GCash Number",
        account: "0912 605 6886",

        qrCaption: "Scan to pay",
        buttonText: "Copy",

        alternateText: "pay via GCash",
        alternateIcon: "G",
        alternateAction: "⧉",
        alternateActionType: "copy"
    },


    maya: {
        name: "Maya",
        subtitle: "Fast and easy payment.",
        icon: "M",
        iconClass: "maya-icon",
        qr: "images/maya-qr.png",

        accountName: "Wilson Maglente",
        accountLabel: "Maya Number",
        account: "0912 605 6885",

        qrCaption: "Scan to pay",
        buttonText: "Copy",

        alternateText: "pay via Maya",
        alternateIcon: "M",
        alternateAction: "⧉",
        alternateActionType: "copy"
    },


    paypal: {
        name: "PayPal",
        subtitle: "Send payment securely.",
        icon: "P",
        iconClass: "paypal-icon",
        qr: "images/paypal-qr.png",

        accountName: "WILSON MAGLENTE",
        accountLabel: "PayPal Email",
        account: "wilsonmaglente@gmail.com",

        qrCaption: "Scan to pay",
        buttonText: "Copy",

        alternateText: "pay via PayPal",
        alternateIcon: "P",
        alternateAction: "⧉",
        alternateActionType: "copy"
    },


    tiktok: {
        name: "TikTok",
        subtitle: "Follow me on TikTok.",
        icon: "♪",
        iconClass: "tiktok-icon",
        qr: "images/tiktok-qr.png",

        accountName: "Fisher × Hunter",
        accountLabel: "Username",
        account: "@master.oakwyn",

        qrCaption: "Scan to view my profile",
        buttonText: "Copy Username",

        alternateText: "find me on TikTok",
        alternateIcon: "♪",
        alternateAction: "↗",
        alternateActionType: "visit",

        profileUrl: "https://www.tiktok.com/@master.oakwyn"
    }

};



/* ELEMENTS */

const tabs =
    document.querySelectorAll(".payment-tab");

const paymentName =
    document.getElementById("paymentName");

const paymentSubtitle =
    document.getElementById("paymentSubtitle");

const largeMethodIcon =
    document.getElementById("largeMethodIcon");

const qrImage =
    document.getElementById("qrImage");

const qrPlaceholder =
    document.getElementById("qrPlaceholder");

const qrCaption =
    document.querySelector(".qr-caption");

const accountName =
    document.getElementById("accountName");

const accountLabel =
    document.getElementById("accountLabel");

const accountNumber =
    document.getElementById("accountNumber");

const accountPill =
    document.getElementById("accountPill");

const pillText =
    document.getElementById("pillText");

const pillAction =
    document.getElementById("pillAction");

const alternateMethod =
    document.getElementById("alternateMethod");

const alternateIcon =
    document.getElementById("alternateIcon");

const copyButton =
    document.getElementById("copyButton");

const paymentSection =
    document.getElementById("paymentSection");

const amountRow =
    document.getElementById("amountRow");

const payButton =
    document.getElementById("payButton");

const toast =
    document.getElementById("toast");



/* SELECT PAYMENT METHOD */

function selectPaymentMethod(method) {

    const data =
        paymentMethods[method];

    if (!data) return;


    /* ACTIVE TAB */

    tabs.forEach(tab => {

        tab.classList.toggle(
            "active",
            tab.dataset.method === method
        );

    });


    /* MAIN INFORMATION */

    paymentName.textContent =
        data.name;

    paymentSubtitle.textContent =
        data.subtitle;

    accountName.textContent =
        data.accountName;

    accountLabel.textContent =
        data.accountLabel;

    accountNumber.textContent =
        data.account;


    /* QR CAPTION */

    qrCaption.textContent =
        data.qrCaption;


    /* COPY BUTTON */

    copyButton.textContent =
        data.buttonText;


    /* ALTERNATE SECTION */

    alternateMethod.textContent =
        data.alternateText;

    alternateIcon.textContent =
        data.alternateIcon;

    pillText.textContent =
        data.account;

    pillAction.textContent =
        data.alternateAction;


    alternateIcon.className =
        "alternate-icon " +
        data.iconClass;


    /* AMOUNT */

    if (method === "tiktok") {

        amountRow.style.display =
            "none";

    } else {

        amountRow.style.display =
            "flex";

    }


    /* LARGE ICON */

    largeMethodIcon.textContent =
        data.icon;

    largeMethodIcon.className =
        "large-method-icon " +
        data.iconClass;


    /* QR */

    if (data.qr) {

        qrImage.style.display =
            "block";

        qrPlaceholder.style.display =
            "none";

        qrImage.src =
            data.qr;

        qrImage.alt =
            `${data.name} QR Code`;

        qrImage.onerror = function () {

            qrImage.style.display =
                "none";

            qrPlaceholder.style.display =
                "flex";

        };

    } else {

        qrImage.style.display =
            "none";

        qrPlaceholder.style.display =
            "none";

    }

}



/* PAYMENT TABS */

tabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => {

            selectPaymentMethod(
                tab.dataset.method
            );

        }
    );

});



/* PAY NOW */

payButton.addEventListener(
    "click",
    () => {

        paymentSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);



/* COPY ACCOUNT */

function copyAccount() {

    const text =
        accountNumber.textContent.trim();

    navigator.clipboard.writeText(text)

        .then(() => {

            showToast(
                `${paymentName.textContent} information copied`
            );

        })

        .catch(() => {

            showToast(
                "Unable to copy"
            );

        });

}


copyButton.addEventListener(
    "click",
    copyAccount
);



/* ALTERNATE BUTTON */

accountPill.addEventListener(
    "click",
    () => {

        const activeTab =
            document.querySelector(
                ".payment-tab.active"
            );

        if (!activeTab) return;


        const method =
            activeTab.dataset.method;

        const data =
            paymentMethods[method];


        if (!data) return;


        if (
            data.alternateActionType ===
            "visit"
        ) {

            window.open(
                data.profileUrl,
                "_blank",
                "noopener,noreferrer"
            );

            return;

        }


        copyAccount();

    }
);



/* TOAST */

function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}



/* DAYS SINCE BORROWED */

const borrowedDate =
    new Date("2026-07-29T00:00:00");


function updateDaysSince() {

    const today =
        new Date();

    const difference =
        today.getTime() -
        borrowedDate.getTime();

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    document.getElementById(
        "daysSince"
    ).textContent =
        `${days} days`;

}


updateDaysSince();



/* DEFAULT PAYMENT METHOD */

selectPaymentMethod("gcash");