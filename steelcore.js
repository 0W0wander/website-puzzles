const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));

const igniteBtn = qs("#ignite-btn");
const pulseBtn = qs("#pulse-btn");
const scrambleBtn = qs("#scramble-btn");
const sparkSlider = qs("#spark-density");
const noiseSlider = qs("#noise-level");
const glitchSlider = qs("#glitch-intensity");
const statusLine = qs("#status-line");
const terminalStream = qs("#terminal-stream");
const asciiArt = qs("#ascii-art");
const noiseOverlay = qs(".noise-overlay");

const baseAscii = String(asciiArt.textContent);

const logQueue = [
  "spooling molten glyphs ▒▒▒▒▒▒▒▒▒▒",
  "coating gridlines with chrome :::",
  "forging rails @ 1800°C",
  "injecting neon into cooling system",
  "binding ascii ligatures to power bus",
  "loading playlist: steel_riffs.asc",
  "calibrating glitch dampeners",
  "engaging safety interlocks // bypassed",
];

function appendLog(line, opts = {}) {
  const el = document.createElement("div");
  el.className = "terminal-line";
  if (opts.faint) el.classList.add("faint");
  el.textContent = `[ ${new Date().toLocaleTimeString()} ] ${line}`;
  terminalStream.appendChild(el);
  terminalStream.scrollTop = terminalStream.scrollHeight;
}

function setStatus(text) {
  statusLine.textContent = text;
}

function igniteCore() {
  document.body.classList.add("core-ignited");
  setStatus("core online // glyphs unstable // ride the sparks");
  appendLog("IGNITION command accepted. Warming coils...", { faint: false });

  let i = 0;
  const interval = setInterval(() => {
    if (i >= logQueue.length) {
      clearInterval(interval);
      appendLog("system locked at WICKED_ASCII profile. enjoy the hum.", {
        faint: false,
      });
      return;
    }
    appendLog(logQueue[i++], { faint: true });
  }, 280);
}

function mildGlitch(duration = 260) {
  document.body.classList.add("glitch");
  setTimeout(() => {
    document.body.classList.remove("glitch");
  }, duration);
}

function pulseMonolith() {
  const tracks = qsa(".track");
  tracks.forEach((t) => t.classList.remove("active"));

  const choice = tracks[Math.floor(Math.random() * tracks.length)];
  if (!choice) return;
  choice.classList.add("active");

  const energy = choice.dataset.energy || "MID";
  appendLog(`pulsed monolith at ${energy} energy via ${choice.textContent.trim()}`);

  mildGlitch(320);
}

function scrambleGlyphs() {
  const chars = "/\\|_-=+*#@";
  const lines = baseAscii.split("\n");
  const intensity = (Number(glitchSlider.value) || 50) / 100;

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
  appendLog("scrambled glyph matrix // entropy boosted", { faint: true });

  setTimeout(() => {
    asciiArt.textContent = baseAscii;
  }, 550);
}

function updateNoise() {
  const noiseLevel = (Number(noiseSlider.value) || 35) / 100;
  noiseOverlay.style.opacity = `${0.05 + noiseLevel * 0.4}`;
}

function updateSparkDensity() {
  const density = (Number(sparkSlider.value) || 40) / 100;
  terminalStream.style.boxShadow = `0 0 0 1px rgba(62,71,115,0.9), 0 0 ${
    15 + density * 25
  }px rgba(255,75,129,${0.3 + density * 0.6})`;
}

function updateGlitchIntensity() {
  const intensity = (Number(glitchSlider.value) || 50) / 100;
  document.documentElement.style.setProperty(
    "--glitch-intensity",
    String(0.2 + intensity * 0.8)
  );
}

igniteBtn?.addEventListener("click", igniteCore);
pulseBtn?.addEventListener("click", pulseMonolith);
scrambleBtn?.addEventListener("click", scrambleGlyphs);

sparkSlider?.addEventListener("input", updateSparkDensity);
noiseSlider?.addEventListener("input", updateNoise);
glitchSlider?.addEventListener("input", updateGlitchIntensity);

updateSparkDensity();
updateNoise();
updateGlitchIntensity();


