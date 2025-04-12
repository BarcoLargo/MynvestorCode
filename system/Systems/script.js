const user = { name: "John Doe", profilePic: null };
const profilePicContainer = document.getElementById("profile-pic-container");

if (user.profilePic) {
    profilePicContainer.innerHTML = `<img src="${user.profilePic}" alt="User Profile">`;
} else {
    document.getElementById("user-initials").textContent = user.name
        .split(" ")
        .map(e => e[0])
        .join("")
        .toUpperCase();
}

const sidebar = document.querySelector(".sidebar");
const notificationsIcon = document.querySelector(".notifications-icon");
const sections = document.querySelectorAll(".content-section");
const sidebarLinks = document.querySelectorAll(".sidebar-menu a");
const faqSearch = document.getElementById("faq-search");
const supportForm = document.getElementById("support-form");

function showSection(e) {
    sections.forEach(t => {
        t.classList.remove("active");
        t.querySelector(".loading").style.display = "none";
    });
    const t = document.getElementById(e);
    if (t) {
        t.querySelector(".loading").style.display = "block";
        setTimeout(() => {
            t.querySelector(".loading").style.display = "none";
            t.classList.add("active");
        }, 300);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    sidebarLinks.forEach(e => e.classList.remove("active"));
    const n = document.querySelector(`.sidebar-menu a[href="#${e}"]`);
    if (n) n.classList.add("active");
    localStorage.setItem("lastSectionIndex1", e);
}

function handleNavClick(e) {
    e.preventDefault();
    const t = e.target.closest("a").getAttribute("href").substring(1);
    showSection(t);
    window.location.hash = t;
    sidebar.classList.remove("active");
}

sidebarLinks.forEach(e => e.addEventListener("click", handleNavClick));

window.addEventListener("load", () => {
    const e = window.location.hash.substring(1) || localStorage.getItem("lastSectionIndex1") || "dashboard";
    showSection(e);
    if (!localStorage.getItem("onboardingShown")) {
        setTimeout(() => {
            alert("Welcome! Use the sidebar for info and footer for trading.");
            localStorage.setItem("onboardingShown", "true");
        }, 1000);
    }
});

window.addEventListener("hashchange", () => {
    showSection(window.location.hash.substring(1) || "dashboard");
});

notificationsIcon.addEventListener("click", e => {
    e.stopPropagation();
    sidebar.classList.toggle("active");
});

document.addEventListener("click", e => {
    if (!e.target.closest(".sidebar") && !e.target.closest(".notifications-icon")) {
        sidebar.classList.remove("active");
    }
});

faqSearch.addEventListener("input", e => {
    const t = e.target.value.toLowerCase();
    document.querySelectorAll(".accordion-item").forEach(e => {
        e.style.display = e.textContent.toLowerCase().includes(t) ? "" : "none";
    });
});

supportForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Support request submitted!");
    e.target.reset();
});

document.querySelectorAll(".subscribe-btn").forEach(button => {
    button.addEventListener("click", function() {
        const plan = this.getAttribute("data-plan");
        if (confirm(`Are you sure you want to subscribe to the ${plan} Plan?`)) {
            document.querySelectorAll(".subscribe-btn").forEach(btn => {
                btn.classList.remove("btn-success");
                btn.classList.add("btn-outline-light");
                btn.nextElementSibling.classList.add("d-none");
            });
            this.classList.remove("btn-outline-light");
            this.classList.add("btn-success");
            this.nextElementSibling.classList.remove("d-none");
            alert(`${plan} Plan subscribed successfully!`);
        }
    });
});

document.getElementById("cancelSubscription").addEventListener("click", function() {
    if (confirm("Are you sure you want to cancel your subscription?")) {
        alert("Subscription cancelled successfully!");
        this.previousElementSibling.querySelector(".badge").classList.remove("bg-success");
        this.previousElementSibling.querySelector(".badge").classList.add("bg-warning");
        this.previousElementSibling.querySelector(".badge").textContent = "Cancelled";
        this.disabled = true;
    }
});

document.querySelectorAll(".tax-download-btn").forEach(button => {
    button.addEventListener("click", function(e) {
        e.preventDefault();
        alert("Downloading tax document... (Simulated)");
    });
});

document.querySelectorAll(".report-download-btn").forEach(button => {
    button.addEventListener("click", function(e) {
        e.preventDefault();
        alert("Downloading report... (Simulated)");
    });
});

document.querySelectorAll(".remove-account-btn").forEach(button => {
    button.addEventListener("click", function() {
        if (confirm("Are you sure you want to remove this account?")) {
            this.parentElement.remove();
            alert("Account removed successfully!");
        }
    });
});

document.getElementById("notificationsForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Notification preferences saved successfully!");
});

document.getElementById("passwordForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const t = document.getElementById("currentPassword").value;
    const n = document.getElementById("newPassword").value;
    const o = document.getElementById("confirmPassword").value;
    if (t && n && o) {
        if (n === o) {
            alert("Password changed successfully!");
            this.reset();
        } else {
            alert("New passwords do not match.");
        }
    } else {
        alert("Please fill in all fields.");
    }
});

document.getElementById("2faSwitch").addEventListener("change", function() {
    alert(`2FA ${this.checked ? "enabled" : "disabled"}.`);
});

document.getElementById("kycForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const consent = document.getElementById("consent").checked;
    if (consent) {
        alert("KYC information submitted successfully!");
        this.reset();
        bootstrap.Modal.getInstance(document.getElementById("accountInfoModal")).hide();
    } else {
        alert("Please provide consent to proceed.");
    }
});