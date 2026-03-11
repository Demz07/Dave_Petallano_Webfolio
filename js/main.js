/* ═══════════════════════════════════════════════════════
   MANHATTAN PROJECT PORTFOLIO — Main JavaScript
   ═══════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ─────────────────────────────────────────
  // 1. PARTICLE NETWORK BACKGROUND (Canvas)
  // ─────────────────────────────────────────
  const ParticleNetwork = (() => {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas) return { init: () => {} };

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;
    let mouse = { x: null, y: null };

    const config = {
      particleCount: 200,
      maxDistance: 160,
      speed: 0.25,
      mouseRadius: 250,
      // Glow layers
      glowLayers: 3,
    };

    if (window.innerWidth < 768) {
      config.particleCount = 90;
      config.maxDistance = 120;
    } else if (window.innerWidth < 1200) {
      config.particleCount = 150;
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * config.speed;
        this.vy = (Math.random() - 0.5) * config.speed;

        // Varied sizes — some tiny, some bigger focal points
        const roll = Math.random();
        if (roll < 0.7) {
          // 70% small particles
          this.size = Math.random() * 1.5 + 0.5;
          this.glowSize = this.size * 6;
          this.baseOpacity = Math.random() * 0.3 + 0.15;
          this.glowOpacity = 0.04;
        } else if (roll < 0.92) {
          // 22% medium particles
          this.size = Math.random() * 2 + 1.5;
          this.glowSize = this.size * 8;
          this.baseOpacity = Math.random() * 0.4 + 0.25;
          this.glowOpacity = 0.07;
        } else {
          // 8% large bright particles
          this.size = Math.random() * 2.5 + 2.5;
          this.glowSize = this.size * 12;
          this.baseOpacity = Math.random() * 0.3 + 0.5;
          this.glowOpacity = 0.12;
        }

        // Pulse animation — each particle pulses at different speed
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.time = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.time += this.pulseSpeed;

        // Wrap around edges smoothly
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;

        // Mouse interaction — particles gently pushed away
        if (mouse.x !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.mouseRadius) {
            const force = (config.mouseRadius - dist) / config.mouseRadius;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 1.2;
            this.y += Math.sin(angle) * force * 1.2;
          }
        }
      }

      draw() {
        // Pulse effect — opacity breathes
        const pulse = Math.sin(this.time + this.pulseOffset) * 0.3 + 0.7;
        const currentOpacity = this.baseOpacity * pulse;
        const currentGlowOpacity = this.glowOpacity * pulse;

        // Layer 1: Outer glow (large, soft)
        const outerGrad = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.glowSize,
        );
        outerGrad.addColorStop(0, `rgba(255, 255, 255, ${currentGlowOpacity})`);
        outerGrad.addColorStop(
          0.4,
          `rgba(200, 220, 255, ${currentGlowOpacity * 0.4})`,
        );
        outerGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
        ctx.fillStyle = outerGrad;
        ctx.fill();

        // Layer 2: Inner glow (medium)
        const innerGrad = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 3,
        );
        innerGrad.addColorStop(
          0,
          `rgba(255, 255, 255, ${currentOpacity * 0.6})`,
        );
        innerGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = innerGrad;
        ctx.fill();

        // Layer 3: Core (bright center dot)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
      }
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < config.particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < config.maxDistance) {
            const opacity = (1 - dist / config.maxDistance) * 0.15;

            // Glowing connection lines
            // Outer glow line
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(180, 200, 255, ${opacity * 0.3})`;
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Core line
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    }

    // Mouse proximity highlight — particles near mouse glow brighter
    function drawMouseProximityGlow() {
      if (mouse.x === null) return;

      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.mouseRadius) {
          const intensity = 1 - dist / config.mouseRadius;
          const extraGlowSize = p.glowSize * (1 + intensity * 0.8);
          const extraOpacity = intensity * 0.08;

          const mouseGrad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            extraGlowSize,
          );
          mouseGrad.addColorStop(0, `rgba(200, 220, 255, ${extraOpacity})`);
          mouseGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.beginPath();
          ctx.arc(p.x, p.y, extraGlowSize, 0, Math.PI * 2);
          ctx.fillStyle = mouseGrad;
          ctx.fill();
        }
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawConnections();
      drawMouseProximityGlow();

      animationId = requestAnimationFrame(animate);
    }

    function init() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        canvas.style.display = "none";
        return;
      }

      resize();
      createParticles();
      animate();

      window.addEventListener("resize", () => {
        resize();
        createParticles();
      });

      window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      });

      window.addEventListener("mouseout", () => {
        mouse.x = null;
        mouse.y = null;
      });
    }

    return { init };
  })();

  // ─────────────────────────────────────────
  // 2. TYPING ANIMATION
  // ─────────────────────────────────────────
  const TypingEffect = (() => {
    const element = document.getElementById("typingText");
    if (!element) return { init: () => {} };

    const titles = [
      "Building responsive web applications.",
      "Driven by a passion for problem-solving.",
      "Continuously learning and refining my craft.",
      "Ready to contribute, collaborate, and grow.",
      "Problem Solver",
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    function type() {
      const current = titles[titleIndex];

      if (isDeleting) {
        element.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        element.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === current.length) {
        delay = 2500; // Pause at full text
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        delay = 500;
      }

      timeout = setTimeout(type, delay);
    }

    function init() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        element.textContent = titles[0];
        return;
      }
      setTimeout(type, 1000);
    }

    return { init };
  })();

  // ─────────────────────────────────────────
  // 3. SCROLL REVEAL (IntersectionObserver)
  // ─────────────────────────────────────────
  const ScrollReveal = (() => {
    function init() {
      const reveals = document.querySelectorAll(".reveal");

      if (!reveals.length) return;

      // Immediately reveal hero elements
      const heroReveals = document.querySelectorAll(".hero .reveal");
      setTimeout(() => {
        heroReveals.forEach((el) => el.classList.add("reveal--visible"));
      }, 200);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal--visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -60px 0px",
        },
      );

      reveals.forEach((el) => {
        // Don't re-observe hero elements
        if (!el.closest(".hero")) {
          observer.observe(el);
        }
      });
    }

    return { init };
  })();

  // ─────────────────────────────────────────
  // 4. NAVIGATION
  // ─────────────────────────────────────────
  const Navigation = (() => {
    const nav = document.getElementById("nav");
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    const navLinks = document.querySelectorAll(".nav__link");

    function handleScroll() {
      if (window.scrollY > 50) {
        nav.classList.add("nav--scrolled");
      } else {
        nav.classList.remove("nav--scrolled");
      }

      // Update active link
      const sections = document.querySelectorAll(".section, .hero");
      let current = "";

      sections.forEach((section) => {
        const top = section.offsetTop - 200;
        if (window.scrollY >= top) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("nav__link--active");
        if (link.getAttribute("data-section") === current) {
          link.classList.add("nav__link--active");
        }
      });
    }

    function toggleMenu() {
      const isOpen = links.classList.toggle("nav__links--open");
      toggle.classList.toggle("nav__hamburger--open");
      toggle.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    }

    function closeMenu() {
      links.classList.remove("nav__links--open");
      toggle.classList.remove("nav__hamburger--open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    function init() {
      window.addEventListener("scroll", handleScroll, { passive: true });

      if (toggle) {
        toggle.addEventListener("click", toggleMenu);
      }

      // Close menu on link click
      navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
      });

      // Close menu on escape
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
      });

      handleScroll();
    }

    return { init };
  })();

  // ─────────────────────────────────────────
  // 5. SCROLL PROGRESS BAR
  // ─────────────────────────────────────────
  const ScrollProgress = (() => {
    const bar = document.getElementById("scrollProgress");

    function update() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      if (bar) bar.style.width = progress + "%";
    }

    function init() {
      window.addEventListener("scroll", update, { passive: true });
    }

    return { init };
  })();

  // ─────────────────────────────────────────
  // 6. CONTACT FORM (AJAX to PHP)
  // ─────────────────────────────────────────
  const ContactForm = (() => {
    const form = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    const successMsg = document.getElementById("formSuccess");
    const errorMsg = document.getElementById("formError");

    if (!form) return { init: () => {} };

    async function handleSubmit(e) {
      e.preventDefault();

      // Hide previous messages
      successMsg.hidden = true;
      errorMsg.hidden = true;

      // Loading state
      submitBtn.classList.add("contact__submit-btn--loading");
      submitBtn.disabled = true;

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          successMsg.hidden = false;
          form.reset();
        } else {
          errorMsg.hidden = false;
        }
      } catch (err) {
        console.error("Form submission error:", err);
        errorMsg.hidden = false;
      } finally {
        submitBtn.classList.remove("contact__submit-btn--loading");
        submitBtn.disabled = false;
      }
    }

    function init() {
      form.addEventListener("submit", handleSubmit);
    }

    return { init };
  })();

  // ─────────────────────────────────────────
  // 7. SMOOTH SCROLL (for Safari fallback)
  // ─────────────────────────────────────────
  const SmoothScroll = (() => {
    function init() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          const targetId = this.getAttribute("href");
          if (targetId === "#") return;

          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            const offset = 80; // nav height
            const top =
              target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
              top,
              behavior: "smooth",
            });
          }
        });
      });
    }

    return { init };
  })();

  // ─────────────────────────────────────────
  // 8. FOOTER YEAR
  // ─────────────────────────────────────────
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─────────────────────────────────────────
  // INITIALIZE EVERYTHING ON DOM READY
  // ─────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", () => {
    ParticleNetwork.init();
    TypingEffect.init();
    ScrollReveal.init();
    Navigation.init();
    ScrollProgress.init();
    ContactForm.init();
    SmoothScroll.init();
  });
})();
