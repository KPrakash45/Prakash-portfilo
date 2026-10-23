const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", function () {
    const isOpen = navbar.classList.toggle("show");

    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.textContent = isOpen ? "✕" : "☰";
});

// Close menu after clicking a navigation link
document.querySelectorAll(".navbar a").forEach(function (link) {
    link.addEventListener("click", function () {
        navbar.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
    });
});


// 2. Dark mode and light mode
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeBtn.textContent = isDark ? "☀️" : "🌙";
    themeBtn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
});


// 3. Typing animation
const typingText = document.getElementById("typingText");

const roles = [
    "Student",
    "Web Developer",
    "Java Programmer",
    "Tech Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent = currentRole.substring(0, charIndex);

    let delay = deleting ? 60 : 110;

    if (!deleting && charIndex === currentRole.length) {
        deleting = true;
        delay = 1200;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
    }

    setTimeout(typeEffect, delay);
}

typeEffect();


// 4. Automatically update the footer year
document.getElementById("year").textContent =
    new Date().getFullYear();


// 5. Contact form: prepare an email
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

// Replace this with your own email address.
const myEmail = "your-email@example.com";

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const userMessage = document.getElementById("userMessage").value.trim();

    if (!name || !email || !userMessage) {
        formMessage.textContent = "Please fill in all fields.";
        return;
    }

    const subject = encodeURIComponent("Portfolio contact from " + name);

    const body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + userMessage
    );

    formMessage.textContent =
        "Opening your email application. If it does not open, check your email settings.";

    window.location.href =
        "mailto:" + myEmail +
        "?subject=" + subject +
        "&body=" + body;
});


// 6. Highlight the navigation link for the visible section
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navbar a");

function updateActiveLink() {
    let currentSection = "home";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(function (link) {
        const isActive =
            link.getAttribute("href") === "#" + currentSection;

        link.classList.toggle("active", isActive);
    });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink(); 