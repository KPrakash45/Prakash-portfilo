```javascript
// ==========================================
// 1. MOBILE NAVIGATION MENU
// ==========================================

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {
    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.addEventListener("click", function () {
        const isOpen = navbar.classList.toggle("show");

        menuBtn.setAttribute("aria-expanded", isOpen);
        menuBtn.textContent = isOpen ? "✕" : "☰";
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    document.querySelectorAll(".navbar a").forEach(function (link) {
        link.addEventListener("click", function () {
            navbar.classList.remove("show");
            menuBtn.textContent = "☰";
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
}


// ==========================================
// 2. DARK MODE / LIGHT MODE
// ==========================================

const themeBtn = document.getElementById("themeBtn");

function setTheme(isDark) {
    document.body.classList.toggle("dark", isDark);

    if (themeBtn) {
        themeBtn.textContent = isDark ? "☀️" : "🌙";

        themeBtn.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
    }

    try {
        localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    } catch (error) {
        // The theme still works if localStorage is unavailable.
    }
}

// Restore saved theme.
try {
    setTheme(localStorage.getItem("portfolio-theme") === "dark");
} catch (error) {
    setTheme(false);
}

if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        const isDark = !document.body.classList.contains("dark");
        setTheme(isDark);
    });
}


// ==========================================
// 3. ADVANCED TYPING ANIMATION
// ==========================================

const typingText = document.getElementById("typingText");

const roles = [
    "B.Sc Computer Science Student 🎓",
    "Web Developer 💻",
    "Java Programmer ☕",
    "Problem Solver 🧠",
    "Tech Enthusiast 🚀"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent = currentRole.substring(0, charIndex);

    let delay = deleting ? 45 : 85;

    if (!deleting && charIndex === currentRole.length) {
        deleting = true;
        delay = 1600;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
    }

    setTimeout(typeEffect, delay);
}

if (typingText) {
    typeEffect();
}


// ==========================================
// 4. AUTOMATIC FOOTER YEAR
// ==========================================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ==========================================
// 5. INTERACTIVE CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const myEmail = "your-email@example.com";
// Replace with your real email address.

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const userMessage =
            document.getElementById("userMessage").value.trim();

        if (!name || !email || !userMessage) {
            if (formMessage) {
                formMessage.textContent = "⚠️ Please fill in all fields.";
                formMessage.style.color = "red";
            }
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            if (formMessage) {
                formMessage.textContent =
                    "⚠️ Please enter a valid email address.";
                formMessage.style.color = "red";
            }
            return;
        }

        if (myEmail === "your-email@example.com") {
            if (formMessage) {
                formMessage.textContent =
                    "⚠️ Please configure your email address in the JavaScript.";
                formMessage.style.color = "red";
            }
            return;
        }

        const subject = encodeURIComponent(
            "Portfolio contact from " + name
        );

        const body = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + userMessage
        );

        if (formMessage) {
            formMessage.textContent =
                "Opening your email application...";
            formMessage.style.color = "green";
        }

        window.location.href =
            "mailto:" + myEmail +
            "?subject=" + subject +
            "&body=" + body;
    });
}


// ==========================================
// 6. ACTIVE NAVIGATION LINK
// ==========================================

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navbar a");

function updateActiveLink() {
    let currentSection = "";

    sections.forEach(function (section) {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop <= 180) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(function (link) {
        const isActive =
            link.getAttribute("href") === "#" + currentSection;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener("scroll", updateActiveLink, {
    passive: true
});

updateActiveLink();


// ==========================================
// 7. SCROLL REVEAL ANIMATION
// ==========================================

const revealElements = document.querySelectorAll(
    ".reveal, .about-card, .project-card, .skill-card"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}


// ==========================================
// 8. SCROLL PROGRESS BAR
// ==========================================

let progressBar = document.getElementById("scrollProgress");

if (!progressBar) {
    progressBar = document.createElement("div");
    progressBar.id = "scrollProgress";
    progressBar.setAttribute("aria-hidden", "true");
    document.body.appendChild(progressBar);
}

function updateScrollProgress() {
    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollableHeight > 0
        ? (window.scrollY / scrollableHeight) * 100
        : 0;

    progressBar.style.width = progress + "%";
}

window.addEventListener("scroll", updateScrollProgress, {
    passive: true
});

window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();


// ==========================================
// 9. BACK TO TOP BUTTON
// ==========================================

let backToTop = document.getElementById("backToTop");

if (!backToTop) {
    backToTop = document.createElement("button");
    backToTop.id = "backToTop";
    backToTop.type = "button";
    backToTop.textContent = "↑";
    backToTop.setAttribute("aria-label", "Back to top");
    document.body.appendChild(backToTop);
}

function updateBackToTop() {
    backToTop.classList.toggle("show", window.scrollY > 350);
}

window.addEventListener("scroll", updateBackToTop, {
    passive: true
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

updateBackToTop();


// ==========================================
// 10. SMOOTH SCROLLING
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// ==========================================
// 11. BUTTON CLICK ANIMATION
// ==========================================

document.querySelectorAll("button").forEach(function (button) {
    button.addEventListener("click", function () {
        button.classList.remove("clicked");

        // Restart the animation when clicked repeatedly.
        void button.offsetWidth;

        button.classList.add("clicked");

        setTimeout(function () {
            button.classList.remove("clicked");
        }, 250);
    });
});


// ==========================================
// 12. PROJECT CARD HOVER EFFECT
// ==========================================

document.querySelectorAll(".project-card").forEach(function (card) {
    card.addEventListener("mouseenter", function () {
        card.classList.add("project-hover");
    });

    card.addEventListener("mouseleave", function () {
        card.classList.remove("project-hover");
    });
});


// ==========================================
// 13. WELCOME MESSAGE IN CONSOLE
// ==========================================

console.log(
    "%c Welcome to my portfolio! 🚀",
    "font-size: 20px; font-weight: bold; color: #007bff;"
);

console.log("Thanks for visiting my website! 💻");
```


