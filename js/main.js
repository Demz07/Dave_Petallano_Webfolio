/* ═══════════════════════════════════════════════════════
   MANHATTAN PROJECT PORTFOLIO — Main JavaScript
   ═══════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ─────────────────────────────────────────
  // 0. BOOT SEQUENCE — System Startup
  // ─────────────────────────────────────────
  const BootSequence = (() => {
    const screen = document.getElementById("bootScreen");
    const linesContainer = document.getElementById("bootLines");

    if (!screen || !linesContainer) return { init: () => {} };

    // ★ Detect mobile for shorter/faster boot
    const isMobile = window.innerWidth <= 768;

    // ★ Boot Script — Conditional: shorter on mobile, full on desktop
    const bootScript = isMobile
      ? [
          // ── Condensed mobile boot (fewer lines, faster delays) ──
          {
            text: "BIOS v3.2.1 — POST Check",
            cls: "boot-line--system",
            delay: 150,
          },
          {
            text: "Memory Test.......... 8192MB OK",
            cls: "boot-line--ok",
            delay: 100,
          },
          {
            text: "CPU: Intel i7-13700K @ 5.4GHz",
            cls: "boot-line--system",
            delay: 80,
          },
          { text: "", cls: "boot-line--system", delay: 60 },
          {
            text: "═══════════════════════════════",
            cls: "boot-line--header",
            delay: 80,
          },
          {
            text: "  PORTFOLIO SYSTEM v1.0",
            cls: "boot-line--header",
            delay: 80,
          },
          {
            text: "═══════════════════════════════",
            cls: "boot-line--header",
            delay: 100,
          },
          { text: "", cls: "boot-line--system", delay: 60 },
          { text: "Loading modules...", cls: "boot-line--system", delay: 120 },
          { text: "[OK] particle_engine.sys", cls: "boot-line--ok", delay: 60 },
          { text: "[OK] glass_renderer.sys", cls: "boot-line--ok", delay: 50 },
          {
            text: "[WARN] coffee_supply.sys — LOW",
            cls: "boot-line--warn",
            delay: 80,
          },
          { text: "", cls: "boot-line--system", delay: 60 },
          { text: "SUBJECT IDENTIFIED:", cls: "boot-line--title", delay: 150 },
          {
            text: "Dave Quibral",
            cls: "boot-line--name",
            delay: 0,
            special: "typeChars",
          },
          {
            text: "Petallano",
            cls: "boot-line--name-sub",
            delay: 0,
            special: "typeChars",
          },
          { text: "", cls: "boot-line--system", delay: 120 },
          {
            text: "ROLE: Aspiring Web and Game Developer",
            cls: "boot-line--title",
            delay: 100,
          },
          { text: "", cls: "boot-line--system", delay: 80 },
          {
            text: "progress",
            cls: "boot-line--progress",
            delay: 0,
            special: "progressBar",
          },
          { text: "", cls: "boot-line--system", delay: 60 },
          {
            text: "✓ SYSTEM READY — LAUNCHING INTERFACE",
            cls: "boot-line--complete",
            delay: 300,
          },
        ]
      : [
          // ── Full desktop boot (original) ──
          {
            text: "BIOS v3.2.1 — POST Check",
            cls: "boot-line--system",
            delay: 200,
          },
          {
            text: "Memory Test.......... 8192MB OK",
            cls: "boot-line--ok",
            delay: 150,
          },
          {
            text: "CPU: Intel i7-13700K @ 5.4GHz",
            cls: "boot-line--system",
            delay: 120,
          },
          {
            text: "GPU: Integrated Neural Display",
            cls: "boot-line--system",
            delay: 120,
          },
          {
            text: "Storage: 512GB NVMe SSD",
            cls: "boot-line--system",
            delay: 100,
          },
          {
            text: "Network: Ethernet 1Gbps [CONNECTED]",
            cls: "boot-line--ok",
            delay: 130,
          },
          { text: "", cls: "boot-line--system", delay: 80 },
          {
            text: "═══════════════════════════════════════",
            cls: "boot-line--header",
            delay: 100,
          },
          {
            text: "  PORTFOLIO SYSTEM v1.0",
            cls: "boot-line--header",
            delay: 100,
          },
          {
            text: "═══════════════════════════════════════",
            cls: "boot-line--header",
            delay: 150,
          },
          { text: "", cls: "boot-line--system", delay: 80 },
          {
            text: "Loading kernel modules...",
            cls: "boot-line--system",
            delay: 200,
          },
          {
            text: "[OK] particle_engine.sys",
            cls: "boot-line--ok",
            delay: 100,
          },
          { text: "[OK] glass_renderer.sys", cls: "boot-line--ok", delay: 80 },
          { text: "[OK] tilt_physics.sys", cls: "boot-line--ok", delay: 90 },
          {
            text: "[WARN] coffee_supply.sys — LOW",
            cls: "boot-line--warn",
            delay: 120,
          },
          { text: "[OK] glitch_shader.sys", cls: "boot-line--ok", delay: 80 },
          { text: "", cls: "boot-line--system", delay: 100 },
          {
            text: "Initializing identity matrix...",
            cls: "boot-line--system",
            delay: 300,
          },
          { text: "", cls: "boot-line--system", delay: 100 },
          { text: "SUBJECT IDENTIFIED:", cls: "boot-line--title", delay: 200 },
          {
            text: "Dave Quibral",
            cls: "boot-line--name",
            delay: 0,
            special: "typeChars",
          },
          {
            text: "Petallano",
            cls: "boot-line--name-sub",
            delay: 0,
            special: "typeChars",
          },
          { text: "", cls: "boot-line--system", delay: 200 },
          {
            text: "ROLE: Aspiring Web and Game Developer",
            cls: "boot-line--title",
            delay: 150,
          },
          { text: "", cls: "boot-line--system", delay: 100 },
          {
            text: "progress",
            cls: "boot-line--progress",
            delay: 0,
            special: "progressBar",
          },
          { text: "", cls: "boot-line--system", delay: 100 },
          {
            text: "✓ SYSTEM READY — LAUNCHING INTERFACE",
            cls: "boot-line--complete",
            delay: 400,
          },
        ];

    // ★ Type characters — faster on mobile
    function typeCharacters(container, text) {
      return new Promise((resolve) => {
        const chars = text.split("");
        let i = 0;

        chars.forEach((char) => {
          const span = document.createElement("span");
          span.classList.add("boot-char");
          if (char === " ") {
            span.classList.add("boot-char--space");
            span.innerHTML = "&nbsp;";
          } else {
            span.textContent = char;
          }
          container.appendChild(span);
        });

        const allChars = container.querySelectorAll(".boot-char");

        function revealNext() {
          if (i >= allChars.length) {
            resolve();
            return;
          }

          allChars[i].classList.add("boot-char--visible");

          // ★ Faster typing speed on mobile
          const baseSpeed = isMobile ? 35 : 50;
          const variation =
            Math.random() > 0.85
              ? isMobile
                ? 60
                : 120
              : Math.random() * (isMobile ? 15 : 30);
          i++;
          setTimeout(revealNext, baseSpeed + variation);
        }

        revealNext();
      });
    }

    // ── Animate progress bar ──
    function animateProgress(container) {
      return new Promise((resolve) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("boot-progress");

        const bar = document.createElement("div");
        bar.classList.add("boot-progress__bar");
        wrapper.appendChild(bar);
        container.appendChild(wrapper);

        let progress = 0;
        const steps = [
          { target: 25, delay: 100 },
          { target: 45, delay: 150 },
          { target: 60, delay: 80 },
          { target: 72, delay: 200 },
          { target: 88, delay: 100 },
          { target: 95, delay: 150 },
          { target: 100, delay: 80 },
        ];

        let stepIndex = 0;

        function nextStep() {
          if (stepIndex >= steps.length) {
            resolve();
            return;
          }

          const step = steps[stepIndex];
          bar.style.width = step.target + "%";
          stepIndex++;
          setTimeout(nextStep, step.delay);
        }

        nextStep();
      });
    }

    // ── Trigger a screen glitch ──
    function triggerGlitch() {
      screen.classList.add("boot-screen--glitch");
      setTimeout(() => {
        screen.classList.remove("boot-screen--glitch");
      }, 150);
    }

    // ── Main Boot Runner ──
    async function runBoot() {
      // Lock scroll during boot
      document.body.style.overflow = "hidden";

      for (let i = 0; i < bootScript.length; i++) {
        const entry = bootScript[i];

        const line = document.createElement("div");
        line.classList.add("boot-line");
        if (entry.cls) line.classList.add(entry.cls);

        linesContainer.appendChild(line);

        // Trigger random glitches
        if (Math.random() > 0.82 && !entry.special) {
          triggerGlitch();
        }

        if (entry.special === "typeChars") {
          line.classList.add("boot-line--visible");
          await typeCharacters(line, entry.text);

          triggerGlitch();
          // ★ Faster glitch pause on mobile
          await sleep(isMobile ? 120 : 200);
        } else if (entry.special === "progressBar") {
          line.classList.add("boot-line--visible");
          await animateProgress(line);
        } else {
          line.textContent = entry.text;

          await sleep(entry.delay || 100);
          line.classList.add("boot-line--visible");
        }

        // Auto-scroll the boot content to bottom
        linesContainer.scrollTop = linesContainer.scrollHeight;
      }

      // ★ Boot Complete — Faster dismiss on mobile
      await sleep(isMobile ? 400 : 600);

      // Final big glitch
      triggerGlitch();
      await sleep(isMobile ? 150 : 200);
      triggerGlitch();
      await sleep(isMobile ? 80 : 100);

      // Flicker and fade out
      screen.classList.add("boot-screen--complete");

      await sleep(isMobile ? 500 : 800);
      screen.classList.add("boot-screen--hidden");

      // Unlock scroll
      document.body.style.overflow = "";

      // Small delay then let hero reveals kick in
      await sleep(isMobile ? 150 : 200);

      // Trigger hero reveals
      const heroReveals = document.querySelectorAll(".hero .reveal");
      heroReveals.forEach((el) => el.classList.add("reveal--visible"));
    }

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function init() {
      // Skip boot on reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        screen.classList.add("boot-screen--hidden");
        return;
      }

      // Run the boot every time
      runBoot();
    }

    return { init };
  })();

  // ─────────────────────────────────────────
  // 1. CLI TERMINAL BACKGROUND (Canvas)
  // ─────────────────────────────────────────
  const ParticleNetwork = (() => {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas) return { init: () => {} };

    const ctx = canvas.getContext("2d");
    let mouse = { x: null, y: null };
    let time = 0;

    const codeChars =
      "01{}[]<>/\\|;:=+-_~#$@!?.abcdef0123456789ABCDEF=>()const let var function return if else for while import export class new this".split(
        "",
      );
    const keywords = [
      "npm start",
      "git push",
      "ssh root@",
      "chmod 755",
      "grep -r",
      "curl -X",
      "docker run",
      "ping 0.0.0.0",
      "sudo rm",
      "cat /dev/",
      "ls -la",
      "cd ~/dev",
      "node app",
      "python3",
      "make build",
      "gcc -o",
      "SELECT *",
      "DROP TABLE",
      "INSERT INTO",
      "dotnet run",
      ">> output",
      "./deploy.sh",
      "tail -f log",
      "ps aux",
      "kill -9",
      "echo $PATH",
      "export ENV",
      "tar -xvf",
      "wget http",
      "nano conf",
    ];

    const config = {
      gridSpacing: 60,
      gridOpacity: 0.025,
      gridDotSize: 1,
      rainColumnWidth: 22,
      rainCharSize: 13,
      rainBaseSpeed: 0.3,
      cursorNodes: 25,
      nodeMaxDist: 200,
      commandCount: 8,
      commandSpeed: 0.4,
      mouseRadius: 220,
    };

    if (window.innerWidth < 768) {
      config.cursorNodes = 12;
      config.commandCount = 4;
      config.gridSpacing = 80;
    }

    let rainColumns = [];
    let cursorNodes = [];
    let floatingCommands = [];

    const monoFont = '"JetBrains Mono", "Fira Code", "Consolas", monospace';

    function drawGrid() {
      const spacing = config.gridSpacing;
      for (let x = spacing; x < canvas.width; x += spacing) {
        for (let y = spacing; y < canvas.height; y += spacing) {
          let opacity = config.gridOpacity;
          if (mouse.x !== null) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < config.mouseRadius) {
              const boost = (1 - dist / config.mouseRadius) * 0.12;
              opacity += boost;
            }
          }
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fillRect(
            x - config.gridDotSize / 2,
            y - config.gridDotSize / 2,
            config.gridDotSize,
            config.gridDotSize,
          );
        }
      }
    }

    class RainColumn {
      constructor(x) {
        this.x = x;
        this.chars = [];
        this.speed = Math.random() * config.rainBaseSpeed + 0.15;
        this.charCount = Math.floor(Math.random() * 12) + 5;
        this.headY = Math.random() * canvas.height * -1;
        for (let i = 0; i < this.charCount; i++) {
          this.chars.push({
            char: codeChars[Math.floor(Math.random() * codeChars.length)],
            changeTimer: Math.floor(Math.random() * 200) + 50,
            tick: 0,
          });
        }
      }
      update() {
        this.headY += this.speed;
        if (this.headY - this.charCount * config.rainCharSize > canvas.height) {
          this.headY = Math.random() * canvas.height * -0.5 - 100;
          this.speed = Math.random() * config.rainBaseSpeed + 0.15;
        }
        this.chars.forEach((c) => {
          c.tick++;
          if (c.tick >= c.changeTimer) {
            c.char = codeChars[Math.floor(Math.random() * codeChars.length)];
            c.tick = 0;
            c.changeTimer = Math.floor(Math.random() * 200) + 50;
          }
        });
      }
      draw() {
        ctx.font = `${config.rainCharSize}px ${monoFont}`;
        this.chars.forEach((c, i) => {
          const y = this.headY - i * config.rainCharSize;
          if (y < -20 || y > canvas.height + 20) return;
          const fadeRatio = 1 - i / this.charCount;
          let opacity = fadeRatio * 0.08 + 0.01;
          if (i === 0) opacity = 0.18;
          if (i === 1) opacity = 0.12;
          if (mouse.x !== null) {
            const dx = this.x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < config.mouseRadius) {
              const boost = (1 - dist / config.mouseRadius) * 0.25;
              opacity += boost * fadeRatio;
            }
          }
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(opacity, 0.5)})`;
          ctx.fillText(c.char, this.x, y);
        });
      }
    }

    function createRain() {
      rainColumns = [];
      const colCount = Math.floor(canvas.width / config.rainColumnWidth);
      for (let i = 0; i < colCount; i++) {
        if (Math.random() < 0.35) {
          const x = i * config.rainColumnWidth + Math.random() * 10;
          rainColumns.push(new RainColumn(x));
        }
      }
    }

    class CursorNode {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.blinkSpeed = Math.random() * 0.03 + 0.01;
        this.blinkOffset = Math.random() * Math.PI * 2;
        this.size = Math.random() * 3 + 4;
        this.type = Math.random() > 0.6 ? "block" : "underscore";
        this.label = this.generateLabel();
      }
      generateLabel() {
        const labels = [
          "node_0x",
          "ptr_",
          "buf[",
          "0xff",
          "pid:",
          "tcp:",
          "usr@",
          "dev/",
          "sys:",
          "io_",
          "mem:",
          "cpu%",
          "eth0",
          "tmp/",
          "var_",
          "src>",
          "out:",
          "log>",
          "err!",
          "ack_",
        ];
        return (
          labels[Math.floor(Math.random() * labels.length)] +
          Math.floor(Math.random() * 999)
        );
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 20 || this.x > canvas.width - 20) this.vx *= -1;
        if (this.y < 20 || this.y > canvas.height - 20) this.vy *= -1;
        if (mouse.x !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.mouseRadius * 0.7) {
            const force =
              (config.mouseRadius * 0.7 - dist) / (config.mouseRadius * 0.7);
            this.x += (dx / dist) * force * 0.4;
            this.y += (dy / dist) * force * 0.4;
          }
        }
      }
      draw(currentTime) {
        const blink =
          Math.sin(currentTime * this.blinkSpeed + this.blinkOffset) * 0.5 +
          0.5;
        let opacity = blink * 0.3 + 0.05;
        let isNearMouse = false;
        if (mouse.x !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.mouseRadius) {
            const boost = (1 - dist / config.mouseRadius) * 0.4;
            opacity += boost;
            isNearMouse = dist < config.mouseRadius * 0.6;
          }
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(opacity, 0.7)})`;
        if (this.type === "block") {
          ctx.fillRect(
            this.x - this.size / 2,
            this.y - this.size / 2,
            this.size,
            this.size,
          );
        } else {
          ctx.fillRect(this.x - this.size / 2, this.y + 2, this.size, 2);
        }
        if (isNearMouse) {
          ctx.font = `9px ${monoFont}`;
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.7})`;
          ctx.fillText(this.label, this.x + this.size, this.y - 4);
        }
      }
    }

    function createNodes() {
      cursorNodes = [];
      for (let i = 0; i < config.cursorNodes; i++) {
        cursorNodes.push(new CursorNode());
      }
    }

    function drawConnections() {
      for (let i = 0; i < cursorNodes.length; i++) {
        for (let j = i + 1; j < cursorNodes.length; j++) {
          const a = cursorNodes[i];
          const b = cursorNodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.nodeMaxDist) {
            const opacity = (1 - dist / config.nodeMaxDist) * 0.1;
            ctx.save();
            ctx.setLineDash([3, 6]);
            ctx.lineDashOffset = -time * 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.restore();
            if (mouse.x !== null) {
              const midX = (a.x + b.x) / 2;
              const midY = (a.y + b.y) / 2;
              const mouseDist = Math.sqrt(
                Math.pow(midX - mouse.x, 2) + Math.pow(midY - mouse.y, 2),
              );
              if (mouseDist < config.mouseRadius * 0.8) {
                const boost =
                  (1 - mouseDist / (config.mouseRadius * 0.8)) * 0.15;
                ctx.save();
                ctx.setLineDash([3, 6]);
                ctx.lineDashOffset = -time * 0.5;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${boost})`;
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.restore();
              }
            }
          }
        }
      }
    }

    class FloatingCommand {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * config.commandSpeed;
        this.vy = (Math.random() - 0.5) * 0.1;
        this.text =
          "$ " + keywords[Math.floor(Math.random() * keywords.length)];
        this.opacity = Math.random() * 0.04 + 0.015;
        this.fontSize = Math.floor(Math.random() * 3) + 10;
        this.life = 0;
        this.maxLife = Math.random() * 2000 + 1000;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (
          this.life > this.maxLife ||
          this.x < -200 ||
          this.x > canvas.width + 200 ||
          this.y < -50 ||
          this.y > canvas.height + 50
        ) {
          this.reset();
        }
      }
      draw() {
        const lifeRatio = this.life / this.maxLife;
        let fade = 1;
        if (lifeRatio < 0.1) fade = lifeRatio / 0.1;
        if (lifeRatio > 0.8) fade = (1 - lifeRatio) / 0.2;
        let opacity = this.opacity * Math.max(fade, 0);
        if (mouse.x !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.mouseRadius) {
            const boost = (1 - dist / config.mouseRadius) * 0.12;
            opacity += boost;
          }
        }
        ctx.font = `${this.fontSize}px ${monoFont}`;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(opacity, 0.3)})`;
        ctx.fillText(this.text, this.x, this.y);
      }
    }

    function createCommands() {
      floatingCommands = [];
      for (let i = 0; i < config.commandCount; i++) {
        floatingCommands.push(new FloatingCommand());
      }
    }

    function drawMouseSpotlight() {
      if (mouse.x === null) return;
      const grad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        config.mouseRadius,
      );
      grad.addColorStop(0, "rgba(255, 255, 255, 0.015)");
      grad.addColorStop(0.5, "rgba(255, 255, 255, 0.005)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(
        mouse.x - config.mouseRadius,
        mouse.y - config.mouseRadius,
        config.mouseRadius * 2,
        config.mouseRadius * 2,
      );
    }

    function animate() {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      rainColumns.forEach((col) => {
        col.update();
        col.draw();
      });
      floatingCommands.forEach((cmd) => {
        cmd.update();
        cmd.draw();
      });
      cursorNodes.forEach((node) => {
        node.update();
        node.draw(time);
      });
      drawConnections();
      drawMouseSpotlight();
      requestAnimationFrame(animate);
    }

    function init() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        canvas.style.display = "none";
        return;
      }
      function setup() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createRain();
        createNodes();
        createCommands();
      }
      setup();
      animate();
      window.addEventListener("resize", setup);
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
        delay = 2500;
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

      const bootScreen = document.getElementById("bootScreen");
      const bootAlreadyDone =
        !bootScreen ||
        bootScreen.classList.contains("boot-screen--hidden") ||
        sessionStorage.getItem("portfolio-booted");

      if (bootAlreadyDone) {
        const heroReveals = document.querySelectorAll(".hero .reveal");
        setTimeout(() => {
          heroReveals.forEach((el) => el.classList.add("reveal--visible"));
        }, 200);
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal--visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
      );

      reveals.forEach((el) => {
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

    let isOpen = false;
    let scrollLocked = false;

    function handleScroll() {
      if (window.scrollY > 50) {
        nav.classList.add("nav--scrolled");
      } else {
        nav.classList.remove("nav--scrolled");
      }

      const sections = document.querySelectorAll(".section, .hero");
      let current = "";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200) {
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

    function lockScroll() {
      if (scrollLocked) return;
      scrollLocked = true;
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = scrollY;
    }

    function unlockScroll() {
      if (!scrollLocked) return;
      scrollLocked = false;
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    }

    function openMenu() {
      if (isOpen) return;
      isOpen = true;
      links.classList.add("nav__links--open");
      toggle.classList.add("nav__hamburger--open");
      toggle.setAttribute("aria-expanded", "true");
      lockScroll();
    }

    function closeMenu() {
      if (!isOpen) return;
      isOpen = false;
      links.classList.remove("nav__links--open");
      toggle.classList.remove("nav__hamburger--open");
      toggle.setAttribute("aria-expanded", "false");
      unlockScroll();
    }

    function toggleMenu() {
      if (isOpen) closeMenu();
      else openMenu();
    }

    function init() {
      window.addEventListener("scroll", handleScroll, { passive: true });
      if (toggle) {
        toggle.addEventListener("click", (e) => {
          e.stopPropagation();
          toggleMenu();
        });
      }
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          closeMenu();
        });
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen) closeMenu();
      });
      window.addEventListener("resize", () => {
        if (window.innerWidth > 768 && isOpen) closeMenu();
      });
      if (links) {
        links.addEventListener(
          "touchmove",
          (e) => {
            const isScrollable = links.scrollHeight > links.clientHeight;
            if (!isScrollable) e.preventDefault();
          },
          { passive: false },
        );
      }
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
  // 6. CONTACT FORM (Web3Forms)
  // ─────────────────────────────────────────
  const ContactForm = (() => {
    const form = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    const successMsg = document.getElementById("formSuccess");
    const errorMsg = document.getElementById("formError");
    const errorText = document.getElementById("formErrorText");

    if (!form) return { init: () => {} };

    async function handleSubmit(e) {
      e.preventDefault();
      if (successMsg) successMsg.hidden = true;
      if (errorMsg) errorMsg.hidden = true;

      form.classList.add("contact__form--submitting");
      submitBtn.classList.add("contact__submit-btn--loading");
      submitBtn.disabled = true;

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result.success) {
          if (successMsg) {
            successMsg.hidden = false;
            successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
          }
          form.reset();
          setTimeout(() => {
            if (successMsg) successMsg.hidden = true;
          }, 10000);
        } else {
          throw new Error(result.message || "Submission failed");
        }
      } catch (error) {
        console.error("Form error:", error);
        if (errorMsg) {
          errorMsg.hidden = false;
          if (errorText)
            errorText.textContent =
              error.message || "Failed to send. Please try again.";
          errorMsg.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } finally {
        form.classList.remove("contact__form--submitting");
        submitBtn.classList.remove("contact__submit-btn--loading");
        submitBtn.disabled = false;
      }
    }

    function setupValidation() {
      const inputs = form.querySelectorAll(".form-input");
      inputs.forEach((input) => {
        input.addEventListener("invalid", (e) => {
          e.preventDefault();
          input.classList.add("form-input--invalid");
        });
        input.addEventListener("input", () => {
          if (input.validity.valid)
            input.classList.remove("form-input--invalid");
        });
      });
    }

    function init() {
      form.addEventListener("submit", handleSubmit);
      setupValidation();
    }

    return { init };
  })();

  // ─────────────────────────────────────────
  // 8. FOOTER YEAR
  // ─────────────────────────────────────────
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─────────────────────────────────────────
  // 9. ANTI-GRAVITY TILT SYSTEM
  // ─────────────────────────────────────────
  const AntiGravityTilt = (() => {
    function init() {
      if ("ontouchstart" in window) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const panels = document.querySelectorAll(
        ".project-card, .skills__category, .about__bio-panel, .about__philosophy-panel, .contact__info-panel, .contact__form",
      );

      panels.forEach((panel) => {
        panel.setAttribute("data-tilt", "");
        const glow = document.createElement("div");
        glow.classList.add("tilt-glow");
        panel.style.position = "relative";
        panel.style.overflow = "hidden";
        panel.insertBefore(glow, panel.firstChild);

        panel.addEventListener("mouseenter", () => {
          panel.style.transition = "none";
        });
        panel.addEventListener("mousemove", (e) => {
          const rect = panel.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const intensity = 12;
          const rotateX = ((y - centerY) / centerY) * -intensity;
          const rotateY = ((x - centerX) / centerX) * intensity;
          const distFromCenter = Math.sqrt(
            Math.pow((x - centerX) / centerX, 2) +
              Math.pow((y - centerY) / centerY, 2),
          );
          const liftAmount = Math.max(0, (1 - distFromCenter) * 12);
          panel.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${liftAmount}px) scale3d(1.02, 1.02, 1.02)`;
          const glowX = (x / rect.width) * 100;
          const glowY = (y / rect.height) * 100;
          glow.style.setProperty("--glow-x", `${glowX}%`);
          glow.style.setProperty("--glow-y", `${glowY}%`);
        });
        panel.addEventListener("mouseleave", () => {
          panel.style.transition = `transform 0.6s cubic-bezier(0.03, 0.98, 0.52, 0.99), box-shadow 0.6s ease`;
          panel.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)`;
        });
      });

      document.querySelectorAll(".btn").forEach((btn) => {
        btn.setAttribute("data-magnetic", "");
      });
    }

    return { init };
  })();

  // ─────────────────────────────────────────
  // 10. MAGNETIC BUTTONS
  // ─────────────────────────────────────────
  const MagneticButtons = (() => {
    function init() {
      if ("ontouchstart" in window) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const buttons = document.querySelectorAll(".btn[data-magnetic]");
      buttons.forEach((btn) => {
        const strength = 0.3;
        btn.addEventListener("mousemove", (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * strength}px, ${y * strength}px) translateY(-2px)`;
        });
        btn.addEventListener("mouseleave", () => {
          btn.style.transform = "translate(0px, 0px) translateY(0px)";
        });
      });
    }
    return { init };
  })();

  // ─────────────────────────────────────────
  // 11. CURSOR GLOW ORB
  // ─────────────────────────────────────────
  const CursorGlow = (() => {
    let orb;
    function init() {
      if ("ontouchstart" in window) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      orb = document.createElement("div");
      orb.classList.add("cursor-glow");
      document.body.appendChild(orb);

      let currentX = 0,
        currentY = 0,
        targetX = 0,
        targetY = 0;

      function animate() {
        const ease = 0.12;
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;
        orb.style.left = currentX + "px";
        orb.style.top = currentY + "px";
        requestAnimationFrame(animate);
      }

      document.addEventListener("mousemove", (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!orb.classList.contains("cursor-glow--visible"))
          orb.classList.add("cursor-glow--visible");
      });
      document.addEventListener("mouseout", (e) => {
        if (e.relatedTarget === null)
          orb.classList.remove("cursor-glow--visible");
      });

      const interactives = document.querySelectorAll(
        ".glass-panel, .btn, .nav__link, .skill-tag, .contact__social-link",
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          orb.classList.add("cursor-glow--hover");
        });
        el.addEventListener("mouseleave", () => {
          orb.classList.remove("cursor-glow--hover");
        });
      });
      animate();
    }
    return { init };
  })();

  // ─────────────────────────────────────────
  // 12. ANTI-GRAVITY FLOATING ELEMENTS
  // ─────────────────────────────────────────
  const AntiGravityFloat = (() => {
    function init() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const floatTargets = [
        { selector: ".hero__scroll-indicator", delay: "" },
        {
          selector: ".about__photo-frame",
          delay: "antigravity-float--delay-1",
        },
        {
          selector: ".section__header .section__number",
          delay: "antigravity-float--delay-2",
        },
      ];
      floatTargets.forEach(({ selector, delay }) => {
        const el = document.querySelector(selector);
        if (el) {
          el.classList.add("antigravity-float");
          if (delay) el.classList.add(delay);
        }
      });
      document.querySelectorAll(".skill-tag").forEach((tag, i) => {
        tag.style.animationDelay = `${-(i * 0.4)}s`;
      });
    }
    return { init };
  })();

  // ─────────────────────────────────────────
  // 13. LOGO MODAL — Terminal Command Popup
  // ─────────────────────────────────────────
  const LogoModal = (() => {
    const modal = document.getElementById("logoModal");
    const backdrop = document.getElementById("logoModalBackdrop");
    const closeBtn = document.getElementById("logoModalClose");
    const headerTitle = document.getElementById("logoModalHeaderTitle");
    const cmdEl = document.getElementById("logoModalCmd");
    const outputEl = document.getElementById("logoModalOutput");
    const logoDisplay = document.getElementById("logoModalLogoDisplay");
    const textLinesEl = document.getElementById("logoModalTextLines");
    const cursorLine = document.querySelector(".logo-modal__cursor-line");

    if (!modal) return { init: () => {} };

    const logoData = {
      pup: {
        headerTitle: "pup_identity.sh",
        command: "cat /org/pup/identity.dat",
        lines: [
          "POLYTECHNIC UNIVERSITY",
          "OF THE PHILIPPINES",
          "LOPEZ, QUEZON CAMPUS",
        ],
        imgSrc: "assets/pup-logo.png",
        imgAlt: "PUP Logo",
      },
      ibits: {
        headerTitle: "ibits_identity.sh",
        command: "cat /org/ibits/identity.dat",
        lines: [
          "INSTITUTE OF BRILLIANT",
          "INFORMATION AND",
          "TECHNOLOGY STUDENTS",
        ],
        imgSrc: "assets/ibits-logo.png",
        imgAlt: "iBITS Logo",
      },
    };

    let isAnimating = false;
    let currentTimeouts = [];
    let scrollYBeforeOpen = 0;

    function sleep(ms) {
      return new Promise((resolve) => {
        const id = setTimeout(resolve, ms);
        currentTimeouts.push(id);
      });
    }

    function clearAllTimeouts() {
      currentTimeouts.forEach((id) => clearTimeout(id));
      currentTimeouts = [];
    }

    async function typeLineChars(lineEl, text) {
      const chars = text.split("");
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.classList.add("logo-modal__char");
        if (char === " ") {
          span.classList.add("logo-modal__char--space");
          span.innerHTML = "&nbsp;";
        } else {
          span.textContent = char;
        }
        lineEl.appendChild(span);
      });
      const allChars = lineEl.querySelectorAll(".logo-modal__char");
      for (let i = 0; i < allChars.length; i++) {
        allChars[i].classList.add("logo-modal__char--visible");
        const speed = 25 + (Math.random() > 0.85 ? 60 : Math.random() * 15);
        await sleep(speed);
      }
      lineEl.classList.add("logo-modal__text-line--scanned");
    }

    async function runAnimation(data) {
      isAnimating = true;
      headerTitle.textContent = data.headerTitle;
      cmdEl.style.width = "0";
      cmdEl.classList.remove("logo-modal__prompt-cmd--typing");
      logoDisplay.classList.remove("logo-modal__logo-display--visible");
      logoDisplay.innerHTML = "";
      textLinesEl.innerHTML = "";
      cursorLine.classList.remove("logo-modal__cursor-line--visible");

      cmdEl.textContent = data.command;
      await sleep(300);
      cmdEl.classList.add("logo-modal__prompt-cmd--typing");

      await sleep(1000);
      const logoImg = document.createElement("img");
      logoImg.src = data.imgSrc;
      logoImg.alt = data.imgAlt;
      logoImg.width = 80;
      logoImg.height = 80;
      logoDisplay.appendChild(logoImg);
      logoDisplay.classList.add("logo-modal__logo-display--visible");

      await sleep(500);
      for (let i = 0; i < data.lines.length; i++) {
        const lineEl = document.createElement("div");
        lineEl.classList.add("logo-modal__text-line");
        textLinesEl.appendChild(lineEl);
        await sleep(150);
        lineEl.classList.add("logo-modal__text-line--visible");
        await typeLineChars(lineEl, data.lines[i]);
        await sleep(200);
      }

      await sleep(300);
      cursorLine.classList.add("logo-modal__cursor-line--visible");
      closeBtn.classList.add("logo-modal__close--visible");
      isAnimating = false;
    }

    function openModal(logoKey) {
      const data = logoData[logoKey];
      if (!data) return;
      closeBtn.classList.add("logo-modal__close--visible");
      scrollYBeforeOpen = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYBeforeOpen}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      modal.classList.add("logo-modal--active", "logo-modal--entering");
      modal.setAttribute("aria-hidden", "false");
      setTimeout(() => {
        modal.classList.remove("logo-modal--entering");
      }, 500);
      runAnimation(data).catch((err) => {
        console.error("[LogoModal] Animation error:", err);
        isAnimating = false;
      });
    }

    function closeModal() {
      clearAllTimeouts();
      isAnimating = false;
      modal.classList.remove("logo-modal--active");
      modal.setAttribute("aria-hidden", "true");
      const scrollY = scrollYBeforeOpen;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
      setTimeout(() => {
        cmdEl.classList.remove("logo-modal__prompt-cmd--typing");
        cmdEl.style.width = "0";
        logoDisplay.classList.remove("logo-modal__logo-display--visible");
        logoDisplay.innerHTML = "";
        textLinesEl.innerHTML = "";
        cursorLine.classList.remove("logo-modal__cursor-line--visible");
        closeBtn.classList.remove("logo-modal__close--visible");
      }, 400);
    }

    function init() {
      const logos = document.querySelectorAll(".affiliation-logo");
      logos.forEach((logo) => {
        const alt = (logo.getAttribute("alt") || "").toLowerCase();
        let logoKey = null;
        if (alt.includes("polytechnic") || alt.includes("pup")) logoKey = "pup";
        else if (alt.includes("ibits") || alt.includes("bits"))
          logoKey = "ibits";

        if (logoKey) {
          logo.addEventListener("click", (e) => {
            e.preventDefault();
            logo.classList.add("affiliation-logo--tapped");
            setTimeout(() => {
              logo.classList.remove("affiliation-logo--tapped");
            }, 400);
            setTimeout(() => {
              openModal(logoKey);
            }, 200);
          });
          logo.setAttribute("tabindex", "0");
          logo.setAttribute("role", "button");
          logo.setAttribute(
            "aria-label",
            `View ${logoKey.toUpperCase()} information`,
          );
          logo.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              logo.click();
            }
          });
        }
      });
      if (closeBtn) closeBtn.addEventListener("click", closeModal);
      if (backdrop) backdrop.addEventListener("click", closeModal);
      document.addEventListener("keydown", (e) => {
        if (
          e.key === "Escape" &&
          modal.classList.contains("logo-modal--active")
        )
          closeModal();
      });
    }

    return { init };
  })();

  // ─────────────────────────────────────────
  // 14. CV MODAL — "Resume In Progress" Terminal
  // ─────────────────────────────────────────
  const CvModal = (() => {
    const modal = document.getElementById("cvModal");
    const backdrop = document.getElementById("cvModalBackdrop");
    const closeBtn = document.getElementById("cvModalClose");
    const linesContainer = document.getElementById("cvModalLines");
    const cursorLine = document.querySelector(".cv-modal__cursor-line");
    const cvBtn = document.getElementById("cvDownloadBtn");

    if (!modal || !cvBtn) return { init: () => {} };

    let isAnimating = false;
    let currentTimeouts = [];

    function sleep(ms) {
      return new Promise((resolve) => {
        const id = setTimeout(resolve, ms);
        currentTimeouts.push(id);
      });
    }

    function clearAllTimeouts() {
      currentTimeouts.forEach((id) => clearTimeout(id));
      currentTimeouts = [];
    }

    const terminalScript = [
      { type: "prompt", text: "❯ ./download_resume.sh", delay: 100 },
      { type: "blank", delay: 150 },
      { type: "system", text: "Initializing secure download...", delay: 200 },
      { type: "ok", text: "[OK] Authentication verified", delay: 120 },
      { type: "ok", text: "[OK] Clearance level: PUBLIC", delay: 100 },
      {
        type: "system",
        text: "Locating file: resume_petallano.pdf",
        delay: 250,
      },
      { type: "blank", delay: 100 },
      { type: "system", text: "Scanning classified archives...", delay: 300 },
      { type: "ok", text: "[OK] /vault/credentials/verified", delay: 100 },
      { type: "ok", text: "[OK] /vault/experience/loading", delay: 120 },
      {
        type: "warn",
        text: "[WARN] /vault/resume/status: INCOMPLETE",
        delay: 200,
      },
      { type: "blank", delay: 150 },
      { type: "progress", target: 67, delay: 0 },
      { type: "blank", delay: 100 },
      { type: "error", text: "✕ ERR_RESUME_NOT_READY", delay: 300 },
      { type: "error", text: "  File is still being compiled...", delay: 150 },
      { type: "blank", delay: 200 },
      {
        type: "header",
        text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        delay: 80,
      },
      { type: "blank", delay: 100 },
      {
        type: "ascii",
        text: "  ██╗███╗   ██╗    ██████╗ ██████╗  ██████╗  ██████╗",
        delay: 60,
      },
      {
        type: "ascii",
        text: "  ██║████╗  ██║    ██╔══██╗██╔══██╗██╔═══██╗██╔════╝",
        delay: 60,
      },
      {
        type: "ascii",
        text: "  ██║██╔██╗ ██║    ██████╔╝██████╔╝██║   ██║██║  ███╗",
        delay: 60,
      },
      {
        type: "ascii",
        text: "  ██║██║╚██╗██║    ██╔═══╝ ██╔══██╗██║   ██║██║   ██║",
        delay: 60,
      },
      {
        type: "ascii",
        text: "  ██║██║ ╚████║    ██║     ██║  ██║╚██████╔╝╚██████╔╝",
        delay: 60,
      },
      {
        type: "ascii",
        text: "  ╚═╝╚═╝  ╚═══╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚═════╝",
        delay: 60,
      },
      { type: "blank", delay: 150 },
      {
        type: "header",
        text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        delay: 80,
      },
      { type: "blank", delay: 200 },
      {
        type: "message",
        text: "⚠ Resume is currently under construction.",
        delay: 200,
      },
      {
        type: "sub",
        text: "  The developer is still leveling up...",
        delay: 150,
      },
      { type: "blank", delay: 100 },
      {
        type: "info",
        text: "  STATUS: Actively building experience",
        delay: 120,
      },
      { type: "info", text: "  ETA:    When it's ready™", delay: 120 },
      { type: "blank", delay: 100 },
      {
        type: "hint",
        text: "  // Check back later or reach out via the contact form.",
        delay: 200,
      },
      { type: "blank", delay: 100 },
      {
        type: "system",
        text: "Process exited with code 418 (I'm a teapot)",
        delay: 300,
      },
    ];

    async function createLine(entry) {
      const line = document.createElement("div");
      line.classList.add("cv-modal__line");

      if (entry.type === "blank") {
        line.classList.add("cv-modal__line--blank");
        linesContainer.appendChild(line);
        line.classList.add("cv-modal__line--visible");
        await sleep(entry.delay || 80);
        return;
      }
      if (entry.type === "prompt") {
        line.classList.add("cv-modal__line--prompt");
        line.innerHTML = `<span class="cv-prompt">❯</span> ${entry.text.replace("❯ ", "")}`;
        linesContainer.appendChild(line);
        await sleep(entry.delay || 100);
        line.classList.add("cv-modal__line--visible");
        await sleep(80);
        return;
      }
      if (entry.type === "progress") {
        line.classList.add("cv-modal__line--progress-text");
        line.textContent = `Building resume... 0%`;
        line.classList.add("cv-modal__line--visible");
        linesContainer.appendChild(line);

        const progressWrapper = document.createElement("div");
        progressWrapper.classList.add(
          "cv-modal__line",
          "cv-modal__line--visible",
        );
        const progressEl = document.createElement("div");
        progressEl.classList.add("cv-modal__progress");
        const progressBar = document.createElement("div");
        progressBar.classList.add(
          "cv-modal__progress-bar",
          "cv-modal__progress-bar--warn",
        );
        progressEl.appendChild(progressBar);
        progressWrapper.appendChild(progressEl);
        linesContainer.appendChild(progressWrapper);

        const steps = [12, 25, 38, 45, 52, 58, 62, 65, 67];
        for (let i = 0; i < steps.length; i++) {
          progressBar.style.width = steps[i] + "%";
          line.textContent = `Building resume... ${steps[i]}%`;
          await sleep(Math.random() * 150 + 80);
        }
        for (let i = 0; i < 3; i++) {
          line.textContent = `Building resume... 67%`;
          await sleep(300);
          if (i === 2) {
            const spinner = document.createElement("span");
            spinner.classList.add("cv-modal__spinner");
            spinner.innerHTML = `<span class="cv-modal__spinner-dot"></span><span class="cv-modal__spinner-dot"></span><span class="cv-modal__spinner-dot"></span>`;
            line.appendChild(spinner);
          }
          await sleep(200);
        }
        await sleep(500);
        line.textContent = `Building resume... 67% — STALLED`;
        line.style.color = "rgba(255, 80, 80, 0.6)";
        progressBar.style.background =
          "linear-gradient(90deg, rgba(255, 80, 80, 0.4), rgba(255, 80, 80, 0.7))";
        await sleep(400);
        return;
      }

      const typeClass = `cv-modal__line--${entry.type}`;
      line.classList.add(typeClass);
      line.textContent = entry.text;
      linesContainer.appendChild(line);
      await sleep(entry.delay || 100);
      line.classList.add("cv-modal__line--visible");
      linesContainer.scrollTop = linesContainer.scrollHeight;
    }

    async function runTerminal() {
      isAnimating = true;
      linesContainer.innerHTML = "";
      cursorLine.classList.remove("cv-modal__cursor-line--visible");
      closeBtn.classList.remove("cv-modal__close--visible");
      await sleep(400);
      for (let i = 0; i < terminalScript.length; i++) {
        if (!modal.classList.contains("cv-modal--active")) break;
        await createLine(terminalScript[i]);
        linesContainer.scrollTop = linesContainer.scrollHeight;
      }
      await sleep(300);
      cursorLine.classList.add("cv-modal__cursor-line--visible");
      closeBtn.classList.add("cv-modal__close--visible");
      isAnimating = false;
    }

    function openModal() {
      document.body.style.overflow = "hidden";
      modal.classList.add("cv-modal--active", "cv-modal--entering");
      modal.setAttribute("aria-hidden", "false");
      setTimeout(() => {
        modal.classList.remove("cv-modal--entering");
      }, 500);
      runTerminal();
    }

    function closeModal() {
      clearAllTimeouts();
      isAnimating = false;
      modal.classList.remove("cv-modal--active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      setTimeout(() => {
        linesContainer.innerHTML = "";
        cursorLine.classList.remove("cv-modal__cursor-line--visible");
        closeBtn.classList.remove("cv-modal__close--visible");
      }, 400);
    }

    function init() {
      cvBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
      });
      if (closeBtn) closeBtn.addEventListener("click", closeModal);
      if (backdrop) backdrop.addEventListener("click", closeModal);
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("cv-modal--active"))
          closeModal();
      });
    }

    return { init };
  })();

  // ─────────────────────────────────────────
  // 15. TERMINAL ARCADE — Mini Games Console
  // ─────────────────────────────────────────
  const TerminalArcade = (() => {
    const modal = document.getElementById("tgame");
    const backdrop = document.getElementById("tgameBackdrop");
    const closeBtn = document.getElementById("tgameClose");
    const openBtn = document.getElementById("navGamesBtn");
    const headerTitle = document.getElementById("tgameHeaderTitle");
    const menuScreen = document.getElementById("tgameMenu");
    const gameScreen = document.getElementById("tgameGameScreen");
    const bootLinesEl = document.getElementById("tgameBootLines");
    const menuContent = document.getElementById("tgameMenuContent");
    const gameArea = document.getElementById("tgameGameArea");
    const gameTitleEl = document.getElementById("tgameGameTitle");
    const scoreEl = document.getElementById("tgameScore");
    const infoEl = document.getElementById("tgameInfo");
    const backBtn = document.getElementById("tgameBackBtn");
    const dpad = document.getElementById("tgameDpad");

    if (!modal || !openBtn) return { init: () => {} };

    let currentGame = null,
      gameLoopId = null,
      gameIntervalId = null,
      bootDone = false;
    let timeouts = [],
      activeKeyHandlers = [],
      activeTouchHandlers = [];
    const monoFont = '"JetBrains Mono","Fira Code","Consolas",monospace';

    function sleep(ms) {
      return new Promise((resolve) => {
        const id = setTimeout(resolve, ms);
        timeouts.push(id);
      });
    }
    function clearAllTimeouts() {
      timeouts.forEach((id) => clearTimeout(id));
      timeouts = [];
    }
    function removeAllHandlers() {
      activeKeyHandlers.forEach((h) =>
        document.removeEventListener(h.type, h.fn),
      );
      activeKeyHandlers = [];
      activeTouchHandlers.forEach((h) =>
        h.el.removeEventListener(h.type, h.fn),
      );
      activeTouchHandlers = [];
    }
    function addKeyHandler(type, fn) {
      document.addEventListener(type, fn);
      activeKeyHandlers.push({ type, fn });
    }
    function addTouchHandler(el, type, fn) {
      el.addEventListener(type, fn, { passive: false });
      activeTouchHandlers.push({ el, type, fn });
    }
    function isMobile() {
      return "ontouchstart" in window || window.innerWidth <= 768;
    }

    function getCanvasSize() {
      const areaRect = gameArea.getBoundingClientRect();
      const maxW = Math.floor(areaRect.width - 8);
      const maxH = Math.floor(areaRect.height - 8);
      return Math.min(maxW, maxH, 400);
    }

    function getRectSize() {
      const areaRect = gameArea.getBoundingClientRect();
      return {
        w: Math.min(Math.floor(areaRect.width - 8), 400),
        h: Math.min(Math.floor(areaRect.height - 8), 300),
      };
    }

    const bootScript = [
      { text: "> Initializing arcade subsystem...", cls: "" },
      { text: "[OK] Loading game engines", cls: "--ok" },
      { text: "[OK] Allocating pixel buffer", cls: "--ok" },
      { text: "[OK] Input handlers ready", cls: "--ok" },
      { text: "> All systems nominal.", cls: "--ready" },
    ];

    async function runBoot() {
      bootLinesEl.innerHTML = "";
      menuContent.style.display = "none";
      for (let i = 0; i < bootScript.length; i++) {
        const el = document.createElement("div");
        el.classList.add("tgame__boot-line");
        if (bootScript[i].cls)
          el.classList.add("tgame__boot-line" + bootScript[i].cls);
        el.textContent = bootScript[i].text;
        bootLinesEl.appendChild(el);
        await sleep(120 + Math.random() * 80);
        el.classList.add("tgame__boot-line--visible");
      }
      await sleep(300);
      menuContent.style.display = "flex";
      menuContent.style.flexDirection = "column";
      menuContent.style.flex = "1";
      bootDone = true;
    }

    function openModal() {
      document.body.style.overflow = "hidden";
      modal.classList.add("tgame--active", "tgame--entering");
      modal.setAttribute("aria-hidden", "false");
      setTimeout(() => modal.classList.remove("tgame--entering"), 500);
      showMenu();
      if (!bootDone) runBoot();
    }

    function closeModal() {
      clearAllTimeouts();
      stopGame();
      modal.classList.remove("tgame--active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    function showMenu() {
      stopGame();
      menuScreen.style.display = "flex";
      gameScreen.style.display = "none";
      headerTitle.textContent = "arcade.exe";
      dpad.style.display = "none";
    }

    function showGame(gameName) {
      stopGame();
      menuScreen.style.display = "none";
      gameScreen.style.display = "flex";
      dpad.style.display = "none";
      gameArea.innerHTML = "";
      scoreEl.textContent = "0";
      infoEl.textContent = "";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (gameName === "snake") launchSnake();
          else if (gameName === "pong") launchPong();
          else if (gameName === "memory") launchMemory();
        });
      });
    }

    function stopGame() {
      if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
        gameLoopId = null;
      }
      if (gameIntervalId) {
        clearInterval(gameIntervalId);
        gameIntervalId = null;
      }
      removeAllHandlers();
      currentGame = null;
    }

    function showGameOver(finalScore, retryFn, customTitle) {
      const overlay = document.createElement("div");
      overlay.classList.add("tgame__gameover");
      overlay.innerHTML = `
        <div class="tgame__gameover-text">${customTitle || "GAME OVER"}</div>
        <div class="tgame__gameover-score">Final Score: ${finalScore}</div>
        <button class="tgame__gameover-btn" data-action="retry">[ RETRY ]</button>
        <button class="tgame__gameover-btn" data-action="menu">[ MENU ]</button>`;
      overlay
        .querySelector('[data-action="retry"]')
        .addEventListener("click", () => {
          overlay.remove();
          retryFn();
        });
      overlay
        .querySelector('[data-action="menu"]')
        .addEventListener("click", () => {
          overlay.remove();
          showMenu();
        });
      gameArea.appendChild(overlay);
    }

    // ═══ SNAKE ═══
    function launchSnake() {
      currentGame = "snake";
      gameTitleEl.textContent = "SNAKE.exe";
      headerTitle.textContent = "snake.exe";
      infoEl.textContent = isMobile()
        ? "// Use D-pad to move"
        : "// Arrow keys or WASD";
      const canvas = document.createElement("canvas");
      canvas.classList.add("tgame__canvas");
      gameArea.appendChild(canvas);
      const cellSize = isMobile() ? 14 : 16;
      const canvasPixels = getCanvasSize();
      const cols = Math.floor(canvasPixels / cellSize);
      const rows = Math.floor(canvasPixels / cellSize);
      canvas.width = cols * cellSize;
      canvas.height = rows * cellSize;
      canvas.style.width = canvas.width + "px";
      canvas.style.height = canvas.height + "px";
      const ctx = canvas.getContext("2d");
      if (isMobile()) dpad.style.display = "flex";

      let snake = [{ x: Math.floor(cols / 2), y: Math.floor(rows / 2) }];
      let dir = { x: 1, y: 0 },
        nextDir = { x: 1, y: 0 },
        food = null,
        score = 0,
        alive = true;
      let baseSpeed = isMobile() ? 160 : 140,
        speed = baseSpeed,
        lastTick = 0,
        dirChanged = false;

      function spawnFood() {
        let pos,
          attempts = 0;
        do {
          pos = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows),
          };
          attempts++;
        } while (
          snake.some((s) => s.x === pos.x && s.y === pos.y) &&
          attempts < 200
        );
        return pos;
      }
      food = spawnFood();

      function setDir(d) {
        if (dirChanged) return;
        const map = {
          up: { x: 0, y: -1 },
          down: { x: 0, y: 1 },
          left: { x: -1, y: 0 },
          right: { x: 1, y: 0 },
        };
        const nd = map[d];
        if (!nd) return;
        if (snake.length > 1 && nd.x === -dir.x && nd.y === -dir.y) return;
        nextDir = { ...nd };
        dirChanged = true;
      }

      const keyDown = (e) => {
        if (currentGame !== "snake" || !alive) return;
        const keyMap = {
          ArrowUp: "up",
          ArrowDown: "down",
          ArrowLeft: "left",
          ArrowRight: "right",
          w: "up",
          s: "down",
          a: "left",
          d: "right",
          W: "up",
          S: "down",
          A: "left",
          D: "right",
        };
        if (keyMap[e.key]) {
          e.preventDefault();
          setDir(keyMap[e.key]);
        }
      };
      addKeyHandler("keydown", keyDown);
      document.querySelectorAll(".tgame__dpad-btn").forEach((btn) => {
        addTouchHandler(btn, "click", (e) => {
          e.preventDefault();
          if (currentGame === "snake" && alive) setDir(btn.dataset.dir);
        });
      });
      let touchStartX = 0,
        touchStartY = 0;
      addTouchHandler(canvas, "touchstart", (e) => {
        const t = e.touches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
      });
      addTouchHandler(canvas, "touchend", (e) => {
        if (currentGame !== "snake" || !alive) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - touchStartX;
        const dy = t.clientY - touchStartY;
        if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return;
        if (Math.abs(dx) > Math.abs(dy)) setDir(dx > 0 ? "right" : "left");
        else setDir(dy > 0 ? "down" : "up");
      });

      function tick() {
        dir = { ...nextDir };
        dirChanged = false;
        const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
          alive = false;
          return;
        }
        if (snake.some((s) => s.x === head.x && s.y === head.y)) {
          alive = false;
          return;
        }
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
          score += 10;
          scoreEl.textContent = score;
          food = spawnFood();
          if (speed > 70) speed -= 2;
        } else snake.pop();
      }

      function draw() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(255,255,255,0.025)";
        for (let x = 0; x < cols; x++)
          for (let y = 0; y < rows; y++)
            ctx.fillRect(
              x * cellSize + cellSize - 1,
              y * cellSize + cellSize - 1,
              1,
              1,
            );
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 1;
        ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
        snake.forEach((seg, i) => {
          const brightness =
            i === 0 ? 1 : Math.max(0.25, 1 - (i / snake.length) * 0.75);
          ctx.fillStyle = `rgba(255,255,255,${brightness})`;
          const padding = i === 0 ? 0 : 1;
          ctx.fillRect(
            seg.x * cellSize + padding,
            seg.y * cellSize + padding,
            cellSize - padding * 2,
            cellSize - padding * 2,
          );
        });
        const pulse = Math.sin(Date.now() * 0.005) * 0.2 + 0.8;
        ctx.fillStyle = `rgba(255,255,255,${pulse})`;
        ctx.font = `bold ${cellSize - 2}px ${monoFont}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          "◆",
          food.x * cellSize + cellSize / 2,
          food.y * cellSize + cellSize / 2,
        );
      }

      function gameLoop(timestamp) {
        if (currentGame !== "snake") return;
        if (!alive) {
          draw();
          showGameOver(score, () => {
            stopGame();
            showGame("snake");
          });
          return;
        }
        if (!lastTick) lastTick = timestamp;
        if (timestamp - lastTick >= speed) {
          tick();
          lastTick = timestamp;
        }
        draw();
        gameLoopId = requestAnimationFrame(gameLoop);
      }
      gameLoopId = requestAnimationFrame(gameLoop);
    }

    // ═══ PONG ═══
    function launchPong() {
      currentGame = "pong";
      gameTitleEl.textContent = "PONG.exe";
      headerTitle.textContent = "pong.exe";
      infoEl.textContent = isMobile()
        ? "// Use D-pad or drag"
        : "// Arrow Up/Down or W/S";
      const canvas = document.createElement("canvas");
      canvas.classList.add("tgame__canvas");
      gameArea.appendChild(canvas);
      const { w, h } = getRectSize();
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      const ctx = canvas.getContext("2d");
      if (isMobile()) dpad.style.display = "flex";

      const paddleW = 6,
        paddleH = Math.max(40, Math.floor(h * 0.18)),
        ballSize = 6,
        paddleMargin = 14,
        paddleSpeed = 4,
        aiSpeedFactor = 0.055;
      let playerY = h / 2 - paddleH / 2,
        aiY = h / 2 - paddleH / 2;
      let ballX = w / 2,
        ballY = h / 2,
        ballVX = 2.5 * (Math.random() > 0.5 ? 1 : -1),
        ballVY = (Math.random() - 0.5) * 3;
      let playerScore = 0,
        aiScore = 0,
        playerMove = 0,
        alive = true;

      function resetBall(tp) {
        ballX = w / 2;
        ballY = h / 2;
        ballVX = 2.5 * (tp ? -1 : 1);
        ballVY = (Math.random() - 0.5) * 3;
      }

      const keyDown = (e) => {
        if (currentGame !== "pong") return;
        if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
          e.preventDefault();
          playerMove = -1;
        } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
          e.preventDefault();
          playerMove = 1;
        }
      };
      const keyUp = (e) => {
        if (currentGame !== "pong") return;
        if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
          if (playerMove === -1) playerMove = 0;
        }
        if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
          if (playerMove === 1) playerMove = 0;
        }
      };
      addKeyHandler("keydown", keyDown);
      addKeyHandler("keyup", keyUp);

      document.querySelectorAll(".tgame__dpad-btn").forEach((btn) => {
        const dh = (e) => {
          e.preventDefault();
          if (currentGame !== "pong") return;
          if (btn.dataset.dir === "up") playerMove = -1;
          if (btn.dataset.dir === "down") playerMove = 1;
        };
        const uh = (e) => {
          e.preventDefault();
          if (currentGame !== "pong") return;
          playerMove = 0;
        };
        addTouchHandler(btn, "touchstart", dh);
        addTouchHandler(btn, "touchend", uh);
        addTouchHandler(btn, "touchcancel", uh);
        addTouchHandler(btn, "mousedown", dh);
        addTouchHandler(btn, "mouseup", uh);
        addTouchHandler(btn, "mouseleave", uh);
      });
      addTouchHandler(canvas, "touchmove", (e) => {
        if (currentGame !== "pong") return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const t = e.touches[0];
        playerY =
          (t.clientY - rect.top) * (canvas.height / rect.height) - paddleH / 2;
        playerY = Math.max(0, Math.min(h - paddleH, playerY));
      });
      addTouchHandler(canvas, "touchstart", (e) => {
        e.preventDefault();
      });

      function update() {
        if (playerMove !== 0) playerY += playerMove * paddleSpeed;
        playerY = Math.max(0, Math.min(h - paddleH, playerY));
        const aiCenter = aiY + paddleH / 2;
        const aiTarget = ballVX > 0 ? ballY : h / 2;
        aiY += (aiTarget - aiCenter) * aiSpeedFactor;
        aiY = Math.max(0, Math.min(h - paddleH, aiY));
        ballX += ballVX;
        ballY += ballVY;
        if (ballY <= 0) {
          ballY = 0;
          ballVY = Math.abs(ballVY);
        }
        if (ballY >= h - ballSize) {
          ballY = h - ballSize;
          ballVY = -Math.abs(ballVY);
        }
        const ppr = paddleMargin + paddleW;
        if (
          ballX <= ppr &&
          ballX + ballSize >= paddleMargin &&
          ballY + ballSize >= playerY &&
          ballY <= playerY + paddleH &&
          ballVX < 0
        ) {
          ballX = ppr;
          ballVX = Math.abs(ballVX) * 1.05;
          ballVY =
            ((ballY + ballSize / 2 - (playerY + paddleH / 2)) / (paddleH / 2)) *
            4;
          playerScore++;
          scoreEl.textContent = playerScore;
        }
        const apl = w - paddleMargin - paddleW;
        if (
          ballX + ballSize >= apl &&
          ballX <= apl + paddleW &&
          ballY + ballSize >= aiY &&
          ballY <= aiY + paddleH &&
          ballVX > 0
        ) {
          ballX = apl - ballSize;
          ballVX = -Math.abs(ballVX) * 1.03;
          ballVY =
            ((ballY + ballSize / 2 - (aiY + paddleH / 2)) / (paddleH / 2)) *
            3.5;
        }
        const ms = 8;
        ballVX = Math.max(-ms, Math.min(ms, ballVX));
        ballVY = Math.max(-ms, Math.min(ms, ballVY));
        if (ballX < -20) {
          aiScore++;
          infoEl.textContent = `// You: ${playerScore} | CPU: ${aiScore}`;
          if (aiScore >= 5) {
            alive = false;
            return;
          }
          resetBall(true);
        }
        if (ballX > w + 20) {
          playerScore += 3;
          scoreEl.textContent = playerScore;
          infoEl.textContent = `// You: ${playerScore} | CPU: ${aiScore}`;
          resetBall(false);
        }
      }

      function draw() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        ctx.strokeRect(0.5, 0.5, w - 1, h - 1);
        ctx.setLineDash([4, 8]);
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.beginPath();
        ctx.moveTo(Math.floor(w / 2) + 0.5, 0);
        ctx.lineTo(Math.floor(w / 2) + 0.5, h);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.font = `16px ${monoFont}`;
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(String(playerScore), w / 2 - 30, 10);
        ctx.fillText(String(aiScore), w / 2 + 30, 10);
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fillRect(paddleMargin, Math.round(playerY), paddleW, paddleH);
        ctx.fillStyle = "rgba(255,255,255,0.45)";
        ctx.fillRect(
          w - paddleMargin - paddleW,
          Math.round(aiY),
          paddleW,
          paddleH,
        );
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.fillRect(
          Math.round(ballX - ballVX * 0.5),
          Math.round(ballY - ballVY * 0.5),
          ballSize,
          ballSize,
        );
        ctx.fillStyle = "#fff";
        ctx.fillRect(Math.round(ballX), Math.round(ballY), ballSize, ballSize);
      }

      function loop() {
        if (currentGame !== "pong") return;
        if (!alive) {
          draw();
          showGameOver(playerScore, () => {
            stopGame();
            showGame("pong");
          });
          return;
        }
        update();
        draw();
        gameLoopId = requestAnimationFrame(loop);
      }
      gameLoopId = requestAnimationFrame(loop);
    }

    // ═══ MEMORY ═══
    function launchMemory() {
      currentGame = "memory";
      gameTitleEl.textContent = "MEMORY.exe";
      headerTitle.textContent = "memory.exe";
      infoEl.textContent = "// Find all matching pairs";
      dpad.style.display = "none";
      const symbols = ["★", "◆", "▲", "●", "■", "✕", "♦", "◈"];
      let cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
      let flipped = [],
        matched = [],
        score = 0,
        moves = 0,
        locked = false;
      const grid = document.createElement("div");
      grid.classList.add("tgame__memory-grid");
      gameArea.appendChild(grid);

      cards.forEach((symbol, i) => {
        const card = document.createElement("button");
        card.classList.add("tgame__memory-card");
        card.textContent = "?";
        card.dataset.index = i;
        card.dataset.symbol = symbol;
        card.addEventListener("click", () => {
          if (
            currentGame !== "memory" ||
            locked ||
            matched.includes(i) ||
            flipped.includes(i)
          )
            return;
          card.textContent = symbol;
          card.classList.add("tgame__memory-card--flipped");
          flipped.push(i);
          if (flipped.length === 2) {
            locked = true;
            moves++;
            const [a, b] = flipped;
            const cardA = grid.children[a],
              cardB = grid.children[b];
            if (cards[a] === cards[b]) {
              matched.push(a, b);
              score += 20;
              scoreEl.textContent = score;
              cardA.classList.add("tgame__memory-card--matched");
              cardB.classList.add("tgame__memory-card--matched");
              flipped = [];
              locked = false;
              if (matched.length === cards.length)
                setTimeout(() => {
                  showGameOver(
                    score,
                    () => {
                      stopGame();
                      showGame("memory");
                    },
                    "MEMORY CLEARED",
                  );
                }, 500);
            } else {
              cardA.classList.add("tgame__memory-card--wrong");
              cardB.classList.add("tgame__memory-card--wrong");
              setTimeout(() => {
                cardA.textContent = "?";
                cardB.textContent = "?";
                cardA.classList.remove(
                  "tgame__memory-card--flipped",
                  "tgame__memory-card--wrong",
                );
                cardB.classList.remove(
                  "tgame__memory-card--flipped",
                  "tgame__memory-card--wrong",
                );
                flipped = [];
                locked = false;
              }, 700);
            }
            infoEl.textContent = `// Moves: ${moves} | Pairs: ${matched.length / 2}/${symbols.length}`;
          }
        });
        grid.appendChild(card);
      });
    }

    function init() {
      openBtn.addEventListener("click", openModal);
      if (closeBtn) closeBtn.addEventListener("click", closeModal);
      if (backdrop) backdrop.addEventListener("click", closeModal);
      if (backBtn) backBtn.addEventListener("click", showMenu);
      document.querySelectorAll(".tgame__menu-item").forEach((item) => {
        item.addEventListener("click", () => showGame(item.dataset.game));
      });
      document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("tgame--active")) return;
        if (e.key === "Escape") {
          e.preventDefault();
          if (currentGame) showMenu();
          else closeModal();
          return;
        }
        if (
          !currentGame &&
          menuContent &&
          menuContent.style.display !== "none"
        ) {
          if (e.key === "1") showGame("snake");
          if (e.key === "2") showGame("pong");
          if (e.key === "3") showGame("memory");
        }
      });
    }

    return { init };
  })();

  // ─────────────────────────────────────────
  // 7. SMOOTH SCROLL
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
            const offset = 80;
            const top =
              target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
          }
        });
      });
    }
    return { init };
  })();

  // ─────────────────────────────────────────
  // INITIALIZE EVERYTHING ON DOM READY
  // ─────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", () => {
    BootSequence.init();
    ParticleNetwork.init();
    TypingEffect.init();
    ScrollReveal.init();
    Navigation.init();
    ScrollProgress.init();
    ContactForm.init();
    SmoothScroll.init();
    AntiGravityTilt.init();
    MagneticButtons.init();
    CursorGlow.init();
    AntiGravityFloat.init();
    LogoModal.init();
    CvModal.init();
    TerminalArcade.init();
  });
})();
