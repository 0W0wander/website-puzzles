const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));

const pulseBtn = qs("#pulse-btn");
const scrambleBtn = qs("#scramble-btn");
const sparkSlider = qs("#spark-density");
const noiseSlider = qs("#noise-level");
const glitchSlider = qs("#glitch-intensity");
const statusLine = qs("#status-line");
const terminalStream = qs("#terminal-stream");
const asciiArt = qs("#ascii-art");
const noiseOverlay = qs(".noise-overlay");
const navChips = qsa(".chip-link");
const gridRoot = qs(".grid");
const leftColumn = qs(".grid-left-column");
const logoBlock = qs(".logo-block");
const aboutPanel = qs("#about-panel");
const contactPanel = qs("#contact-panel");
const projectVaultPanel = qs("#projects-vault-panel");

const baseAscii = asciiArt ? String(asciiArt.textContent) : "";

const logQueue = [
  "loading profile: candidate_profile",
  "education: B.A. Computer Science @ Hunter College (CUNY) // NYC",
  "languages: Python, C++, Kotlin, JavaScript, SQL",
  "projects: media tagger, stock analytics app, Roblox extension",
  "experience: NYC DOE OPT, RK Blueprints, MTA IT",
  "open to: software engineering & data-focused roles",
];

function scrollTerminalToBottom() {
  if (!terminalStream) return;
  terminalStream.scrollTop = terminalStream.scrollHeight;
}

function appendLog(line, opts = {}) {
  if (!terminalStream) return;
  const el = document.createElement("div");
  el.className = "terminal-line";
  if (opts.faint) el.classList.add("faint");
  el.textContent = `[ ${new Date().toLocaleTimeString()} ] ${line}`;
  terminalStream.appendChild(el);
  scrollTerminalToBottom();
}

function setStatus(text) {
  if (statusLine) statusLine.textContent = text;
}

function igniteCore() {
  if (terminalStream) {
    terminalStream.innerHTML = "";
  }
  document.body.classList.add("core-ignited");
  setStatus("portfolio online // ready to explore");
  appendLog("IGNITION accepted. Bringing Kevin's portfolio online...", {
    faint: false,
  });

  let i = 0;
  const interval = setInterval(() => {
    if (i >= logQueue.length) {
      clearInterval(interval);
      appendLog("profile fully forged. explore panels & puzzles.", {
        faint: false,
      });
      return;
    }
    appendLog(logQueue[i++], { faint: true });
  }, 320);
}

function mildGlitch(duration = 260) {
  document.body.classList.add("glitch");
  setTimeout(() => {
    document.body.classList.remove("glitch");
  }, duration);
}

function pulseMonolith() {
  const tracks = qsa(".track");
  if (!tracks.length) return;

  tracks.forEach((t) => t.classList.remove("active"));

  const choice = tracks[Math.floor(Math.random() * tracks.length)];
  if (!choice) return;
  choice.classList.add("active");

  const energy = choice.dataset.energy || "MID";
  const label = choice.querySelector(".track-name")?.textContent?.trim() ?? "";
  appendLog(`focused on "${label}" at energy=${energy}`, { faint: false });

  mildGlitch(320);
}

function scrambleGlyphs() {
  if (!asciiArt || !baseAscii) return;
  const chars = "/\\|_-=+*#@";
  const lines = baseAscii.split("\n");
  const intensity = (Number(glitchSlider?.value) || 50) / 100;

  const glitched = lines
    .map((line) =>
      line
        .split("")
        .map((ch) => {
          if (ch === " " || Math.random() > intensity * 0.4) return ch;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("")
    )
    .join("\n");

  asciiArt.textContent = glitched;
  mildGlitch(260);
  appendLog("scrambled identity.monolith // glyphs briefly unstable", {
    faint: true,
  });

  setTimeout(() => {
    asciiArt.textContent = baseAscii;
  }, 550);
}

function updateNoise() {
  if (!noiseOverlay) return;
  const noiseLevel = (Number(noiseSlider?.value) || 35) / 100;
  noiseOverlay.style.opacity = `${0.05 + noiseLevel * 0.4}`;
}

function updateSparkDensity() {
  if (!terminalStream) return;
  const density = (Number(sparkSlider?.value) || 40) / 100;
  terminalStream.style.boxShadow = `0 0 0 1px rgba(62,71,115,0.9), 0 0 ${
    15 + density * 25
  }px rgba(255,75,129,${0.3 + density * 0.6})`;
}

function updateGlitchIntensity() {
  const intensity = (Number(glitchSlider?.value) || 50) / 100;
  document.documentElement.style.setProperty(
    "--glitch-intensity",
    String(0.2 + intensity * 0.8)
  );
}

function printCommandToTerminal(commandText) {
  if (!terminalStream) return;
  const line = document.createElement("div");
  line.className = "terminal-line";

  const promptSpan = document.createElement("span");
  promptSpan.className = "prompt";
  promptSpan.textContent = "kevin@portfolio";

  const chevronSpan = document.createElement("span");
  chevronSpan.className = "chevron";
  chevronSpan.textContent = "≫";

  const cmdSpan = document.createElement("span");
  cmdSpan.className = "cmd";
  cmdSpan.textContent = commandText;

  line.appendChild(promptSpan);
  line.appendChild(chevronSpan);
  line.appendChild(cmdSpan);

  terminalStream.appendChild(line);
  scrollTerminalToBottom();
}

// --- Left-column overlay panels (stackable for contact, about, projects, etc.) ---
function createLeftColumnOverlay(mode = "contact") {
  if (!leftColumn) return null;

  const panel = document.createElement("section");
  panel.className = "panel left-column-overlay";

  const header = document.createElement("div");
  header.className = "panel-header";

  const title = document.createElement("span");
  title.className = "title";

  if (mode === "about") {
    title.textContent = "/profile/profile.asc";
  } else if (mode === "projects") {
    title.textContent = "/vault/latest-projects.asc";
  } else {
    title.textContent = "/controls/contact.cfg";
  }

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "btn ghost";
  closeBtn.style.fontSize = "0.6rem";
  closeBtn.textContent = "CLOSE";

  header.appendChild(title);
  header.appendChild(closeBtn);

  const body = document.createElement("div");
  body.className = "panel-body overlay-body";

  if (mode === "about") {
    const aboutBody = aboutPanel?.querySelector(".panel-body");
    if (aboutBody) {
      Array.from(aboutBody.children).forEach((child) => {
        body.appendChild(child.cloneNode(true));
      });
    } else {
      const fallback = document.createElement("p");
      fallback.textContent = "loading profile...";
      body.appendChild(fallback);
    }
  } else if (mode === "projects") {
    const vaultBody = projectVaultPanel?.querySelector(".panel-body");
    if (vaultBody) {
      Array.from(vaultBody.children).forEach((child) => {
        body.appendChild(child.cloneNode(true));
      });
      
      // Re-wire the cloned vault controls after appending
      setTimeout(() => {
        wireClonedVault(body);
      }, 0);
    } else {
      const fallback = document.createElement("p");
      fallback.textContent = "loading latest projects feed...";
      body.appendChild(fallback);
    }
  } else {
    const sourceContactList = contactPanel?.querySelector(".contact-list");
    if (sourceContactList) {
      const clonedList = sourceContactList.cloneNode(true);
      body.appendChild(clonedList);
    } else {
      const fallback = document.createElement("p");
      fallback.textContent = "opening contact channel...";
      body.appendChild(fallback);
    }
  }

  panel.appendChild(header);
  panel.appendChild(body);

  // Prepend to left column so new panels stack on top
  leftColumn.prepend(panel);

  closeBtn.addEventListener("click", () => {
    panel.remove();
  });

  return panel;
}

function wireTracks() {
  qsa(".track").forEach((track) => {
    const role = track.dataset.role;
    const link = track.dataset.link;
    const cmdText = track.dataset.cmd;

    if (role === "about") {
      track.addEventListener("click", () => {
        qsa(".track").forEach((t) => t.classList.remove("active"));
        track.classList.add("active");
        igniteCore();
      });
      return;
    }

    if (role === "contact") {
      track.addEventListener("click", () => {
        qsa(".track").forEach((t) => t.classList.remove("active"));
        track.classList.add("active");
        createLeftColumnOverlay("contact");
      });
      return;
    }

    if (link) {
      track.addEventListener("click", () => {
        qsa(".track").forEach((t) => t.classList.remove("active"));
        track.classList.add("active");

        if (cmdText) {
          printCommandToTerminal(cmdText);
        }

        setTimeout(() => {
          window.location.href = link;
        }, 480);
      });
    }
  });
}

function wireNavChips() {
  navChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const targetId = chip.dataset.target;
      navChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      if (!targetId) return;

      // Map nav chips to overlay behaviors that mirror the tracks
      if (targetId === "contact-panel") {
        // CONTACT: create sliding overlay in the left column
        createLeftColumnOverlay("contact");
        printCommandToTerminal("nav contact --panel /controls/contact.cfg");
        return;
      }

      if (targetId === "about-panel") {
        // ABOUT: create sliding overlay with profile info
        createLeftColumnOverlay("about");
        printCommandToTerminal("nav about --panel /profile/profile.asc");
        return;
      }

      // PROJECTS: create sliding overlay with projects vault
      if (targetId === "projects-vault-panel") {
        createLeftColumnOverlay("projects");
        printCommandToTerminal("nav projects --panel /vault/latest-projects.asc");
        return;
      }
    });
  });
}

// --- Project Vault wiring ---

function wireClonedVault(containerBody) {
  const template = document.getElementById("vault-projects-template");
  if (!template) return;

  const projectNodes = Array.from(
    template.content.querySelectorAll("[data-link]")
  );
  if (!projectNodes.length) return;

  const projects = projectNodes.map((node) => ({
    index: node.dataset.index || "",
    title: node.dataset.title || "",
    tagline: node.dataset.tagline || "",
    blurb: node.dataset.blurb || "",
    difficulty: node.dataset.difficulty || "",
    tech: node.dataset.tech || "",
    link: node.dataset.link || "",
    cmd: node.dataset.cmd || "",
  }));

  const feature = containerBody.querySelector(".vault-feature");
  const indexEl = feature?.querySelector(".vault-feature-index");
  const titleEl = feature?.querySelector(".vault-feature-title");
  const taglineEl = feature?.querySelector(".vault-feature-tagline");
  const blurbEl = feature?.querySelector(".vault-feature-blurb");
  const metaDifficultyEl = feature?.querySelector(
    ".vault-chip:nth-child(1) .vault-chip-value"
  );
  const metaTechEl = feature?.querySelector(
    ".vault-chip:nth-child(2) .vault-chip-value"
  );
  const pathEl = feature?.querySelector(".vault-footer-path");
  const openBtn = feature?.querySelector(".vault-open-btn");
  const leftArrow = containerBody.querySelector(".vault-arrow-left");
  const rightArrow = containerBody.querySelector(".vault-arrow-right");
  const dotsContainer = containerBody.querySelector(".vault-dots");

  if (
    !feature ||
    !indexEl ||
    !titleEl ||
    !taglineEl ||
    !blurbEl ||
    !metaDifficultyEl ||
    !metaTechEl ||
    !pathEl ||
    !openBtn ||
    !leftArrow ||
    !rightArrow ||
    !dotsContainer
  ) {
    return;
  }

  let currentIndex = 0;

  function renderProject(idx) {
    const project = projects[idx];
    if (!project) return;

    indexEl.textContent = project.index;
    titleEl.textContent = project.title;
    taglineEl.textContent = project.tagline;
    blurbEl.textContent = project.blurb;
    metaDifficultyEl.textContent = project.difficulty;
    metaTechEl.textContent = project.tech;
    pathEl.textContent = project.link ? `./${project.link}` : "";

    openBtn.onclick = () => {
      if (project.cmd) {
        printCommandToTerminal(project.cmd);
      }
      if (project.link) {
        setTimeout(() => {
          window.location.href = project.link;
        }, 420);
      }
    };

    Array.from(dotsContainer.children).forEach((dot, dotIdx) => {
      dot.classList.toggle("active", dotIdx === idx);
      dot.setAttribute("aria-selected", dotIdx === idx ? "true" : "false");
    });
  }

  // Clear and rebuild dots
  dotsContainer.innerHTML = "";
  projects.forEach((project, idx) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "vault-dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", project.title || `Project ${project.index}`);
    dot.addEventListener("click", () => {
      currentIndex = idx;
      renderProject(currentIndex);
      mildGlitch(160);
    });
    dotsContainer.appendChild(dot);
  });

  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    renderProject(currentIndex);
    mildGlitch(160);
  });

  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % projects.length;
    renderProject(currentIndex);
    mildGlitch(160);
  });

  // Initial render
  renderProject(currentIndex);
}

function wireProjectVault() {
  if (!projectVaultPanel) return;

  const template = document.getElementById("vault-projects-template");
  if (!template) return;

  const projectNodes = Array.from(
    template.content.querySelectorAll("[data-link]")
  );
  if (!projectNodes.length) return;

  const projects = projectNodes.map((node) => ({
    index: node.dataset.index || "",
    title: node.dataset.title || "",
    tagline: node.dataset.tagline || "",
    blurb: node.dataset.blurb || "",
    difficulty: node.dataset.difficulty || "",
    tech: node.dataset.tech || "",
    link: node.dataset.link || "",
    cmd: node.dataset.cmd || "",
  }));

  const feature = projectVaultPanel.querySelector(".vault-feature");
  const indexEl = feature?.querySelector(".vault-feature-index");
  const titleEl = feature?.querySelector(".vault-feature-title");
  const taglineEl = feature?.querySelector(".vault-feature-tagline");
  const blurbEl = feature?.querySelector(".vault-feature-blurb");
  const metaDifficultyEl = feature?.querySelector(
    ".vault-chip:nth-child(1) .vault-chip-value"
  );
  const metaTechEl = feature?.querySelector(
    ".vault-chip:nth-child(2) .vault-chip-value"
  );
  const pathEl = feature?.querySelector(".vault-footer-path");
  const openBtn = feature?.querySelector(".vault-open-btn");
  const leftArrow = projectVaultPanel.querySelector(".vault-arrow-left");
  const rightArrow = projectVaultPanel.querySelector(".vault-arrow-right");
  const dotsContainer = projectVaultPanel.querySelector(".vault-dots");

  if (
    !feature ||
    !indexEl ||
    !titleEl ||
    !taglineEl ||
    !blurbEl ||
    !metaDifficultyEl ||
    !metaTechEl ||
    !pathEl ||
    !openBtn ||
    !leftArrow ||
    !rightArrow ||
    !dotsContainer
  ) {
    return;
  }

  let currentIndex = 0;

  function renderProject(idx) {
    const project = projects[idx];
    if (!project) return;

    indexEl.textContent = project.index;
    titleEl.textContent = project.title;
    taglineEl.textContent = project.tagline;
    blurbEl.textContent = project.blurb;
    metaDifficultyEl.textContent = project.difficulty;
    metaTechEl.textContent = project.tech;
    pathEl.textContent = project.link ? `./${project.link}` : "";

    openBtn.onclick = () => {
      if (project.cmd) {
        printCommandToTerminal(project.cmd);
      }
      if (project.link) {
        setTimeout(() => {
          window.location.href = project.link;
        }, 420);
      }
    };

    Array.from(dotsContainer.children).forEach((dot, dotIdx) => {
      dot.classList.toggle("active", dotIdx === idx);
      dot.setAttribute("aria-selected", dotIdx === idx ? "true" : "false");
    });
  }

  // Build dots
  projects.forEach((project, idx) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "vault-dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", project.title || `Project ${project.index}`);
    dot.addEventListener("click", () => {
      currentIndex = idx;
      renderProject(currentIndex);
      mildGlitch(160);
    });
    dotsContainer.appendChild(dot);
  });

  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    renderProject(currentIndex);
    mildGlitch(160);
  });

  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % projects.length;
    renderProject(currentIndex);
    mildGlitch(160);
  });

  // Initial render
  renderProject(currentIndex);
}

pulseBtn?.addEventListener("click", pulseMonolith);
scrambleBtn?.addEventListener("click", scrambleGlyphs);

sparkSlider?.addEventListener("input", updateSparkDensity);
noiseSlider?.addEventListener("input", updateNoise);
glitchSlider?.addEventListener("input", updateGlitchIntensity);

wireTracks();
wireNavChips();
wireProjectVault();

// Default active nav item
if (navChips.length) {
  navChips[0].classList.add("active");
}

updateSparkDensity();
updateNoise();
updateGlitchIntensity();

scrollTerminalToBottom();

function setupProfileHoverPopout() {
  const frames = qsa(".profile-frame");
  if (!frames.length) return;

  let popover;
  let popoverImg;
  let popoverCaption;

  function ensurePopover() {
    if (popover) return;
    popover = document.createElement("figure");
    popover.className = "profile-popover";

    const inner = document.createElement("div");
    inner.className = "profile-popover-inner";

    popoverImg = document.createElement("img");
    popoverCaption = document.createElement("figcaption");

    inner.appendChild(popoverImg);
    inner.appendChild(popoverCaption);
    popover.appendChild(inner);
    document.body.appendChild(popover);
  }

  frames.forEach((frame) => {
    frame.addEventListener("mouseenter", () => {
      const img = frame.querySelector("img");
      const caption = frame.querySelector("figcaption");
      if (!img) return;

      ensurePopover();

      popoverImg.src = img.src;
      popoverImg.alt = img.alt || "";
      popoverCaption.textContent = caption?.textContent ?? "";

      const rect = frame.getBoundingClientRect();
      const margin = 16;
      const estimatedWidth = 320;
      const estimatedHeight = 360;

      let top = rect.top;
      let left = rect.right + margin;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (left + estimatedWidth > vw - margin) {
        left = rect.left - estimatedWidth - margin;
      }

      if (top + estimatedHeight > vh - margin) {
        top = vh - estimatedHeight - margin;
      }

      if (top < margin) top = margin;

      popover.style.top = `${top}px`;
      popover.style.left = `${left}px`;
      popover.classList.add("visible");
    });

    frame.addEventListener("mouseleave", () => {
      if (popover) {
        popover.classList.remove("visible");
      }
    });
  });
}

setupProfileHoverPopout();

// Toggle profile photo between two versions on click
const profilePhoto = qs("#profile-photo");
if (profilePhoto) {
  const jpegSrc = "resources/me.jpeg";
  const jpgSrc = "resources/me.jpg";

  profilePhoto.addEventListener("click", () => {
    const current = profilePhoto.getAttribute("src") || "";
    const nextSrc = current.endsWith("me.jpg") ? jpegSrc : jpgSrc;
    profilePhoto.setAttribute("src", nextSrc);

    // If the hover popover is open, keep it in sync with the new image
    const popoverImgEl = document.querySelector(".profile-popover img");
    if (popoverImgEl) {
      popoverImgEl.setAttribute("src", nextSrc);
    }
  });
}