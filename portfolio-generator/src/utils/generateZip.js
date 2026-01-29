import JSZip from "jszip";
import { saveAs } from "file-saver";

const getIconSVG = (type) => {
  switch (type) {
    case "github":
      return `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.648.5.5 5.648.5 12c0 5.088 3.293 9.389 7.87 10.91.575.106.786-.25.786-.557 0-.276-.01-1.013-.016-1.99-3.201.696-3.878-1.543-3.878-1.543-.523-1.33-1.277-1.684-1.277-1.684-1.043-.713.079-.699.079-.699 1.154.081 1.762 1.185 1.762 1.185 1.026 1.758 2.693 1.251 3.35.957.104-.744.402-1.252.73-1.54-2.554-.291-5.238-1.277-5.238-5.683 0-1.256.449-2.283 1.184-3.087-.119-.29-.513-1.463.112-3.052 0 0 .965-.309 3.163 1.18A10.96 10.96 0 0 1 12 5.812c.978.005 1.963.133 2.884.39 2.196-1.49 3.159-1.18 3.159-1.18.627 1.589.233 2.762.114 3.052.737.804 1.183 1.832 1.183 3.087 0 4.418-2.689 5.389-5.253 5.673.414.356.781 1.057.781 2.131 0 1.538-.014 2.777-.014 3.154 0 .31.207.669.792.556C20.21 21.383 23.5 17.083 23.5 12c0-6.352-5.148-11.5-11.5-11.5Z"/></svg>`;
    case "twitter":
      return `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.633 7.997c.013.176.013.353.013.53 0 5.394-4.106 11.616-11.616 11.616-2.31 0-4.457-.676-6.266-1.84.321.038.63.051.964.051a8.21 8.21 0 0 0 5.096-1.754 4.105 4.105 0 0 1-3.833-2.848c.25.038.497.064.76.064.366 0 .733-.051 1.076-.14A4.098 4.098 0 0 1 2.8 7.641v-.051c.54.302 1.17.485 1.836.51A4.095 4.095 0 0 1 2.78 5.13c0-.76.202-1.456.558-2.063a11.65 11.65 0 0 0 8.45 4.287 4.62 4.62 0 0 1-.102-.938 4.094 4.094 0 0 1 7.086-2.802 8.06 8.06 0 0 0 2.598-.99 4.09 4.09 0 0 1-1.8 2.26 8.19 8.19 0 0 0 2.356-.634 8.8 8.8 0 0 1-2.293 2.316Z"/></svg>`;
    case "linkedin":
      return `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.5h4.56V24H.22V8.5zM8.59 8.5h4.38v2.11h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 6.99V24h-4.56v-7.26c0-1.73-.03-3.95-2.41-3.95-2.41 0-2.78 1.88-2.78 3.82V24H8.59V8.5z"/></svg>`;
    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
  }
};

export const generateZip = async (data) => {
  const zip = new JSZip();
  const assetsFolder = zip.folder("assets");

  let avatarPath = data.avatarPreview;
  if (data.avatar instanceof File || data.avatar instanceof Blob) {
    const ext = data.avatar.name?.split(".").pop() || "png";
    const filename = `avatar.${ext}`;
    assetsFolder.file(filename, data.avatar);
    avatarPath = `assets/${filename}`;
  }

  let bgPath = data.bgPreview;
  if (data.background instanceof File || data.background instanceof Blob) {
    const ext = data.background.name?.split(".").pop() || "jpg";
    const filename = `background.${ext}`;
    assetsFolder.file(filename, data.background);
    bgPath = `assets/${filename}`;
  }

  const primary = data.primaryColor || "#60a5fa";
  const safeName = (data.name || "My_Portfolio").replace(/\s+/g, "_");

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${data.name || "个人主页"} - Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --primary: ${primary};
    }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Inter",
        "PingFang SC", "HarmonyOS Sans", "Microsoft YaHei", sans-serif;
      background-color: #09090b;
    }
    .scrollbar-thin::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
      background: rgba(148, 163, 184, 0.7);
      border-radius: 999px;
    }
    @keyframes subtleGlow {
      0% { opacity: 0.15; transform: translate3d(0,0,0) scale(1); }
      50% { opacity: 0.3; transform: translate3d(8px,-6px,0) scale(1.03); }
      100% { opacity: 0.15; transform: translate3d(0,0,0) scale(1); }
    }
    .bg-glow-animated {
      animation: subtleGlow 18s ease-in-out infinite alternate;
    }
    .noise-surface {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='noStitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
      background-size: 120px 120px;
    }
  </style>
</head>
<body class="text-slate-100 min-h-screen flex items-center justify-center">
  <div class="fixed inset-0 -z-10 overflow-hidden">
    <img src="${bgPath}" class="w-full h-full object-cover" alt="Background" />
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.45),transparent_60%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.75),#020617)]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(124,124,255,0.25),transparent_55%),radial-gradient(circle_at_bottom_left,_rgba(244,244,245,0.12),transparent_55%)] bg-glow-animated mix-blend-screen" style="opacity:0.25;"></div>
    <div class="absolute inset-0 opacity-20">
      <div class="absolute inset-[-100px] bg-[radial-gradient(circle,_rgba(255,255,255,0.12)_0,transparent_45%)] bg-[length:260px_260px] bg-glow-animated"></div>
    </div>
  </div>

  <main class="relative z-10 max-w-5xl w-full px-4 py-8 md:px-8 md:py-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <section class="md:col-span-2 rounded-3xl border border-zinc-800/90 bg-[#18181b] noise-surface p-5 md:p-6 shadow-[0_18px_45px_rgba(0,0,0,0.7)]">
        <div class="flex flex-col md:flex-row md:items-center gap-5">
          <div class="flex-shrink-0 flex justify-center md:justify-start">
            <div class="relative">
              <img src="${avatarPath}" alt="Avatar" class="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover border border-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.8)] bg-black/80" />
            </div>
          </div>
          <div class="flex-1 text-center md:text-left space-y-3">
            <div>
              <h1 class="text-2xl md:text-3xl font-semibold text-zinc-50 tracking-tight mb-1">${data.name || "你的名字"}</h1>
              <p class="text-sm md:text-base font-medium" style="color: var(--primary);">
                ${data.title || "你的职业 / 标语"}
              </p>
            </div>
            <div class="flex flex-wrap gap-2 justify-center md:justify-start">
              ${(data.tags || [])
                .map(
                  (tag) =>
                    `<span class="px-3 py-1 rounded-full text-[11px] bg-zinc-900/80 text-zinc-200 border border-zinc-700/80">#${tag}</span>`
                )
                .join("")}
            </div>
            <p class="text-xs md:text-sm text-zinc-300/80 leading-relaxed whitespace-pre-wrap max-h-24 overflow-auto scrollbar-thin">
              ${data.about || ""}
            </p>
            ${
              (data.socials || []).length
                ? `<div class="pt-1 flex flex-wrap justify-center md:justify-start gap-3">
              ${(data.socials || [])
                .map(
                  (s) => `
                <a href="${s.url || "#"}" target="_blank" rel="noreferrer" class="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-zinc-900/80 border border-zinc-700/80 flex items-center justify-center text-zinc-200 hover:border-zinc-400 hover:text-white transition-colors" aria-label="${s.platform || "Social"}">
                  ${getIconSVG(s.icon)}
                </a>`
                )
                .join("")}
            </div>`
                : ""
            }
          </div>
        </div>
      </section>

      <section class="rounded-3xl border border-zinc-800/90 bg-[#18181b] noise-surface p-4 md:p-5 flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[11px] uppercase tracking-wide text-zinc-500">Snapshot</span>
          <span class="text-[11px] text-zinc-400">${new Date().toLocaleDateString()}</span>
        </div>
        <div class="mt-6">
          <p class="text-4xl font-semibold text-zinc-100 tracking-tight">01</p>
          <p class="text-xs text-zinc-500 mt-1">Personal portfolio layout</p>
        </div>
      </section>

      <section class="rounded-3xl border border-zinc-800/90 bg-[#18181b] noise-surface p-5 md:p-6 md:col-span-2">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-sm font-semibold text-zinc-50 tracking-tight">Tech Stack</h2>
          <span class="text-[10px] text-zinc-500">技术栈</span>
        </div>
        <div class="flex flex-wrap gap-2">
          ${
            (data.tags || []).length
              ? (data.tags || [])
                  .map(
                    (tag) =>
                      `<span class="px-3 py-1.5 rounded-xl text-[11px] bg-zinc-900/80 text-zinc-100 border border-zinc-700/90">${tag}</span>`
                  )
                  .join("")
              : `<p class="text-xs text-zinc-500">在左侧添加一些标签（React、Node.js 等），这里会自动展示为技术栈。</p>`
          }
        </div>
      </section>

      <section class="rounded-3xl border border-zinc-800/90 bg-[#18181b] noise-surface p-5 md:p-6">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-sm font-semibold text-zinc-50 tracking-tight">Articles</h2>
          <span class="text-[10px] text-zinc-500">博客 / 文章</span>
        </div>
        <div class="space-y-2 max-h-40 overflow-auto scrollbar-thin">
          ${(data.articles || [])
            .map(
              (a) => `
          <a href="${a.link || "#"}" target="_blank" rel="noreferrer" class="block px-2 py-1.5 rounded-lg hover:bg-zinc-900/80 transition-colors">
            <p class="text-xs font-medium text-zinc-100 truncate">${a.title || ""}</p>
            <p class="text-[10px] text-zinc-500">${a.date || ""}</p>
          </a>`
            )
            .join("")}
        </div>
      </section>

      ${(data.projects || [])
        .map(
          (p) => `
      <section class="relative rounded-3xl border border-zinc-800/90 bg-gradient-to-br from-[#18181b] via-[#18181b] to-[#111827] noise-surface p-5 md:p-6 hover:-translate-y-1 hover:border-[color:var(--primary)]/60 transition-all shadow-[0_16px_40px_rgba(0,0,0,0.75)]">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-500 border border-zinc-300/40 flex items-center justify-center text-lg text-zinc-50">
              <span>${p.emoji || (p.title ? p.title.trim().charAt(0).toUpperCase() : "★")}</span>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-zinc-50">${p.title || "项目标题"}</h3>
              <p class="text-[10px] text-zinc-500 mt-0.5">Portfolio Project</p>
            </div>
          </div>
          ${
            p.link
              ? `<span class="inline-flex items-center justify-center w-7 h-7 rounded-full border border-zinc-600 text-zinc-300 text-[11px]">↗</span>`
              : ""
          }
        </div>
        <p class="text-xs text-zinc-300/85 mb-2 leading-relaxed">
          ${p.desc || ""}
        </p>
      </section>`
        )
        .join("")}
    </div>
  </main>
</body>
</html>`;

  zip.file("index.html", html);

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `${safeName}_Portfolio.zip`);
};

