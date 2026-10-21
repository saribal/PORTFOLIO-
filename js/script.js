document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Live Clock Display[cite: 1]
  const clockElem = document.getElementById("liveClock");
  if (clockElem) {
    setInterval(() => {
      const now = new Date();
      clockElem.textContent = "⏱️ " + now.toLocaleTimeString() + " | " + now.toLocaleDateString();
    }, 1000);
  }

  // 2. Dark/Light Mode Toggle[cite: 1]
  const themeBtn = document.getElementById("themeToggle");
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    themeBtn.textContent = document.body.classList.contains("light-mode") ? "🌙 Dark Mode" : "☀️ Light Mode";
  });

  // 3. Animated Skill Progress Bars on Scroll
  const skillSection = document.getElementById("skills");
  const progressFills = document.querySelectorAll(".progress-fill");

  const animateSkills = () => {
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos) {
      progressFills.forEach(fill => {
        const targetWidth = fill.getAttribute("data-percentage");
        fill.style.width = targetWidth;
      });
    }
  };

  window.addEventListener("scroll", animateSkills);

  // 4. Back To Top & ScrollSpy Navigation[cite: 1]
  const backToTopBtn = document.getElementById("backToTop");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    // Back to top visibility
    if (window.scrollY > 400) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }

    // ScrollSpy Link Highlight
    let currentSection = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 5. Project Filtering Tabs (All vs Prelim/Midterm/Final)
  const tabBtns = document.querySelectorAll(".tab-btn");
  const projectCards = document.querySelectorAll(".project-card");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});

// 6. Interactive Expandable Read More Toggle[cite: 1]
function toggleReadMore(btn) {
  const content = btn.previousElementSibling;
  content.classList.toggle("open");
  if (content.classList.contains("open")) {
    btn.textContent = "Show Less";
  } else {
    btn.textContent = "Read More";
  }
}