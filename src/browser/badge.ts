import { publicEnv } from "./env";

export interface BadgeOptions {
  enabled?: boolean;
  tier?: string;
  appUrl?: string;
  upgradeUrl?: string;
  expiresAt?: string;
  variant?: "free-host" | "compact" | string;
  mount?: HTMLElement;
}

function isEnabled(value?: string): boolean {
  return value === "1" || value === "true" || value === "yes";
}

function daysUntil(expiresAt?: string): string {
  if (!expiresAt) return "7 days";
  const time = new Date(expiresAt).getTime();
  if (!Number.isFinite(time)) return "7 days";
  const days = Math.max(0, Math.ceil((time - Date.now()) / 86_400_000));
  return `${days} day${days === 1 ? "" : "s"}`;
}

function ensureStyles() {
  if (document.querySelector("style[data-jobbit-badge-style]")) return;
  const style = document.createElement("style");
  style.dataset.jobbitBadgeStyle = "true";
  style.textContent = `
    [data-jobbit-badge] {
      --jb-bg: #0a0a0a;
      --jb-fg: #fff;
      --jb-muted: rgba(255,255,255,.62);
      --jb-border: rgba(255,255,255,.18);
      position: relative;
      z-index: 2147483000;
      display: block;
      width: 100%;
      min-height: 72px;
      overflow: hidden;
      background: var(--jb-bg);
      color: var(--jb-fg);
      font: 500 12px/1.2 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      text-decoration: none;
      isolation: isolate;
    }
    [data-jobbit-badge] canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: .9;
    }
    [data-jobbit-badge] .jb-content {
      position: relative;
      z-index: 1;
      min-height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 18px;
      padding: 10px 18px;
    }
    [data-jobbit-badge] .jb-logo-wrap,
    [data-jobbit-badge] .jb-center {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    [data-jobbit-badge] .jb-made,
    [data-jobbit-badge] .jb-sep {
      color: var(--jb-muted);
    }
    [data-jobbit-badge] .jb-wordmark {
      color: #fff;
      font-weight: 850;
      font-size: 24px;
      line-height: 1;
      letter-spacing: 0;
    }
    [data-jobbit-badge] .jb-text {
      color: rgba(255,255,255,.72);
      white-space: nowrap;
    }
    [data-jobbit-badge] .jb-text b {
      color: #fff;
      font-weight: 700;
    }
    [data-jobbit-badge] .jb-pill,
    [data-jobbit-badge] .jb-upgrade {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 24px;
      border: 1px solid var(--jb-border);
      border-radius: 999px;
      padding: 3px 12px;
      color: rgba(255,255,255,.86);
      white-space: nowrap;
      text-decoration: none;
    }
    [data-jobbit-badge] .jb-upgrade {
      border-radius: 8px;
      color: #fff;
      font-weight: 750;
      transition: border-color .15s, background .15s;
    }
    [data-jobbit-badge] .jb-upgrade:hover {
      border-color: rgba(255,255,255,.72);
      background: rgba(255,255,255,.1);
    }
    @media (max-width: 720px) {
      [data-jobbit-badge] { min-height: 52px; }
      [data-jobbit-badge] .jb-content { min-height: 52px; gap: 8px; padding: 8px 10px; }
      [data-jobbit-badge] .jb-pill,
      [data-jobbit-badge] .jb-sep { display: none; }
      [data-jobbit-badge] .jb-text { font-size: 11px; }
      [data-jobbit-badge] .jb-wordmark { font-size: 21px; }
    }
  `;
  document.head.appendChild(style);
}

function drawParticles(canvas: HTMLCanvasElement) {
  if (navigator.userAgent.toLowerCase().includes("jsdom")) return;
  let ctx: CanvasRenderingContext2D | null = null;
  try {
    ctx = canvas.getContext("2d");
  } catch {
    return;
  }
  const host = canvas.closest<HTMLElement>("[data-jobbit-badge]");
  if (!ctx || !host) return;
  const context = ctx;
  const hostEl = host;
  const dpr = window.devicePixelRatio || 1;
  const particles = Array.from({ length: 44 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.8 + 0.5,
    a: Math.random() * 0.4 + 0.12,
    dx: (Math.random() - 0.5) * 0.0008,
    dy: (Math.random() - 0.5) * 0.0008
  }));

  function resize() {
    canvas.width = Math.max(1, hostEl.clientWidth * dpr);
    canvas.height = Math.max(1, hostEl.clientHeight * dpr);
  }
  resize();
  window.addEventListener("resize", resize);

  function frame() {
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > 1) p.dx *= -1;
      if (p.y < 0 || p.y > 1) p.dy *= -1;
      context.beginPath();
      context.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
      context.fillStyle = `rgba(255,255,255,${p.a})`;
      context.fill();
    }
    requestAnimationFrame(frame);
  }
  frame();
}

export function shouldShowJobbitBadge(options: BadgeOptions = {}): boolean {
  const enabled = options.enabled ?? isEnabled(publicEnv("NEXT_PUBLIC_JOBBIT_BADGE_ENABLED"));
  const tier = options.tier ?? publicEnv("NEXT_PUBLIC_JOBBIT_APP_TIER") ?? "free";
  return Boolean(enabled && tier === "free");
}

export function mountJobbitBadge(options: BadgeOptions = {}): HTMLElement | null {
  if (typeof document === "undefined" || !shouldShowJobbitBadge(options)) return null;
  const root = options.mount ?? document.body;
  const existing = document.querySelector<HTMLElement>("[data-jobbit-badge]");
  if (existing) return existing;
  ensureStyles();

  const banner = document.createElement("div");
  banner.dataset.jobbitBadge = "true";
  banner.dataset.variant = options.variant ?? publicEnv("NEXT_PUBLIC_JOBBIT_BADGE_VARIANT") ?? "free-host";

  const appId = publicEnv("NEXT_PUBLIC_JOBBIT_APP_ID");
  const plansUrl =
    options.upgradeUrl ??
    publicEnv("NEXT_PUBLIC_JOBBIT_UPGRADE_URL") ??
    (appId ? `https://jobbit.uk/deploys/${encodeURIComponent(appId)}/plans` : "https://jobbit.uk");
  const expiresAt = options.expiresAt ?? publicEnv("NEXT_PUBLIC_JOBBIT_FREE_HOST_EXPIRES_AT");
  banner.innerHTML = `
    <canvas aria-hidden="true"></canvas>
    <div class="jb-content">
      <div class="jb-logo-wrap">
        <span class="jb-made">Made by</span>
        <span class="jb-wordmark" aria-label="Jobbit">jobbit</span>
      </div>
      <span class="jb-sep">·</span>
      <div class="jb-center">
        <span class="jb-text">Your app is live! Free host expires in <b>${daysUntil(expiresAt)}</b></span>
        <span class="jb-pill">Custom domain</span>
        <span class="jb-pill">No expiry</span>
        <span class="jb-pill">Priority support</span>
        <a class="jb-upgrade" href="${plansUrl}" target="_blank" rel="noopener noreferrer">Upgrade -></a>
      </div>
    </div>
  `;
  root.prepend(banner);
  const canvas = banner.querySelector<HTMLCanvasElement>("canvas");
  if (canvas) drawParticles(canvas);
  return banner;
}
