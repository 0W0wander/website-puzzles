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

const baseAscii = asciiArt ? String(asciiArt.textContent) : "";

const logQueue = [
  "forging profile: KEVIN_WANDER.asc",
  "binding: CS major @ Hunter College // NYC",
  "languages loaded: C++, Python, Kotlin",
  "skills mounted: data structures, problem solving, collaboration",
  "injecting: interactive puzzles (tic-tac-toe, 2048, ascii forge)",
  "scanning: opportunities for internships & collabs",
];

function appendLog(line, opts = {}) {
  if (!terminalStream) return;
  const el = document.createElement("div");
  el.className = "terminal-line";
  if (opts.faint) el.classList.add("faint");
  el.textContent = `[ ${new Date().toLocaleTimeString()} ] ${line}`;
  terminalStream.appendChild(el);
  terminalStream.scrollTop = terminalStream.scrollHeight;
}

function setStatus(text) {
  if (statusLine) statusLine.textContent = text;
}

function igniteCore() {
  if (terminalStream) {
    terminalStream.innerHTML = "";
  }
  document.body.classList.add("core-ignited");
  setStatus("core online // portfolio humming");
  appendLog("IGNITION accepted. Bringing Kevin's steel-core online...", {
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
  promptSpan.textContent = "kevin@steel-core";

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
  terminalStream.scrollTop = terminalStream.scrollHeight;
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
      if (!targetId) return;
      const panel = document.getElementById(targetId);
      if (!panel) return;
      panel.scrollIntoView({ behavior: "smooth", block: "center" });
      mildGlitch(180);
    });
  });
}

pulseBtn?.addEventListener("click", pulseMonolith);
scrambleBtn?.addEventListener("click", scrambleGlyphs);

sparkSlider?.addEventListener("input", updateSparkDensity);
noiseSlider?.addEventListener("input", updateNoise);
glitchSlider?.addEventListener("input", updateGlitchIntensity);

wireTracks();
wireNavChips();

updateSparkDensity();
updateNoise();
updateGlitchIntensity();


