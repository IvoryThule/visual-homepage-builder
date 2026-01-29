import React from "react";
import { Github, Twitter, Globe, Linkedin, ArrowUpRight } from "lucide-react";

export const IconMap = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  web: Globe,
};

export default function Preview({ data }) {
  const primary = data.primaryColor || "#7c7cff";

  return (
    <div className="relative min-h-full w-full flex items-center justify-center p-6 md:p-10 lg:p-16 bg-[#09090b]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src={data.bgPreview}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.45),transparent_60%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.75),#020617)]" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(124,124,255,0.25),transparent_55%),radial-gradient(circle_at_bottom_left,_rgba(244,244,245,0.12),transparent_55%)] bg-glow-animated mix-blend-screen"
          style={{ opacity: 0.25 }}
        />
        {/* 轻微动态粒子层 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-[-100px] bg-[radial-gradient(circle,_rgba(255,255,255,0.12)_0,transparent_45%)] bg-[length:260px_260px] animate-[subtleGlow_18s_ease-in-out_infinite_alternate]" />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* 顶部布局：Profile 2/3 + 右侧装饰卡片 */}
        <div className="md:col-span-2 rounded-3xl border border-zinc-800/90 bg-[#18181b] noise-surface p-5 sm:p-6 shadow-[0_18px_45px_rgba(0,0,0,0.7)]">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-shrink-0 flex justify-center md:justify-start">
              <div className="relative">
                <img
                  src={data.avatarPreview}
                  alt="Avatar"
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.8)] bg-black/80"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left space-y-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-50 tracking-tight">
                  {data.name || "你的名字"}
                </h1>
                <p
                  className="text-sm sm:text-base font-medium mt-1"
                  style={{ color: primary }}
                >
                  {data.title || "你的职业 / 标语"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {data.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-[11px] bg-zinc-900/80 text-zinc-200 border border-zinc-700/80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-zinc-300/80 leading-relaxed whitespace-pre-wrap max-h-24 overflow-y-auto custom-scrollbar">
                {data.about}
              </p>
              {data.socials?.length > 0 && (
                <div className="pt-1 flex flex-wrap justify-center md:justify-start gap-3">
                  {data.socials.map((social, i) => {
                    const Icon = IconMap[social.icon] || Globe;
                    return (
                      <a
                        key={i}
                        href={social.url || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-900/80 border border-zinc-700/80 flex items-center justify-center text-zinc-200 hover:border-zinc-400 hover:text-white transition-colors"
                        aria-label={social.platform}
                      >
                        <Icon size={17} />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 右侧时间 / 装饰卡片 */}
        <div className="rounded-3xl border border-zinc-800/90 bg-[#18181b] noise-surface p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wide text-zinc-500">
              Snapshot
            </span>
            <span className="text-[11px] text-zinc-400">
              {new Date().toLocaleDateString()}
            </span>
          </div>
          <div className="mt-6">
            <p className="text-4xl font-semibold text-zinc-100 tracking-tight">
              01
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Personal portfolio layout
            </p>
          </div>
        </div>

        {/* Tech Stack 替代原 About Me 卡片 */}
        <div className="md:col-span-2 rounded-3xl border border-zinc-800/90 bg-[#18181b] noise-surface p-5 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-50 tracking-tight">
              Tech Stack
            </h2>
            <span className="text-[10px] text-zinc-500">技术栈</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.tags?.length ? (
              data.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl text-[11px] bg-zinc-900/80 text-zinc-100 border border-zinc-700/90"
                >
                  {tag}
                </span>
              ))
            ) : (
              <p className="text-xs text-zinc-500">
                在左侧添加一些标签（React、Node.js 等），这里会自动展示为技术栈。
              </p>
            )}
          </div>
        </div>

        {/* Articles */}
        <div className="rounded-3xl border border-zinc-800/90 bg-[#18181b] noise-surface p-5 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-50 tracking-tight">
              Articles
            </h2>
            <span className="text-[10px] text-zinc-500">博客 / 文章</span>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
            {data.articles?.length ? (
              data.articles.map((a, i) => (
                <a
                  key={i}
                  href={a.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="block px-2 py-1.5 rounded-lg hover:bg-zinc-900/80 transition-colors"
                >
                  <p className="text-xs font-medium text-zinc-100 truncate">
                    {a.title || "文章标题"}
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    {a.date || "日期"}
                  </p>
                </a>
              ))
            ) : (
              <p className="text-xs text-zinc-500">
                在左侧添加你的博客或文章链接。
              </p>
            )}
          </div>
        </div>

        {/* Projects */}
        {data.projects?.map((proj, i) => {
          const symbol =
            proj.emoji ||
            (proj.title ? proj.title.trim().charAt(0).toUpperCase() : "★");
          const hasLink = !!proj.link;
          return (
            <a
              key={i}
              href={hasLink ? proj.link : undefined}
              target={hasLink ? "_blank" : undefined}
              rel={hasLink ? "noreferrer" : undefined}
              className="relative rounded-3xl border border-zinc-800/90 bg-gradient-to-br from-[#18181b] via-[#18181b] to-[#111827] noise-surface p-5 sm:p-6 hover:-translate-y-1 hover:border-[color:var(--tw-primary,_rgba(161,161,170,0.7))] transition-all shadow-[0_16px_40px_rgba(0,0,0,0.75)] group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-500 border border-zinc-300/40 flex items-center justify-center text-lg text-zinc-50">
                    <span>{symbol}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-50">
                      {proj.title || "项目标题"}
                    </h3>
                    <p className="text-[10px] text-zinc-500 mt-0.5">
                      Portfolio Project
                    </p>
                  </div>
                </div>
                {hasLink && (
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-zinc-600 text-zinc-300 text-[11px] group-hover:border-[color:var(--tw-primary,_#7c7cff)] group-hover:text-[color:var(--tw-primary,_#7c7cff)] transition-colors">
                    <ArrowUpRight size={14} />
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-300/85 leading-relaxed line-clamp-4">
                {proj.desc}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
}



