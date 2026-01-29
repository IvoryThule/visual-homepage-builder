import React from "react";
import { Github, Twitter, Globe, Linkedin, ArrowUpRight } from "lucide-react";

export const IconMap = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  web: Globe,
};

export default function Preview({ data }) {
  const primary = data.primaryColor || "#60a5fa";

  return (
    <div className="relative min-h-full w-full flex items-center justify-center p-6 md:p-10 lg:p-16 bg-[#09090b] overflow-hidden font-sans text-slate-200">
      {/* --- 核心修复 1: 注入 CSS 动画 --- */}
      {/* 这种写法不需要配置 tailwind.config.js，直接生效 */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100%) translateX(0);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-20%) translateX(20px);
            opacity: 0;
          }
        }
        .particle-dot {
          position: absolute;
          background: white;
          border-radius: 50%;
          pointer-events: none; /* 这一点很重要，防止阻挡点击 */
          animation-name: floatUp;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          bottom: -20px; /* 从屏幕下方升起 */
        }
      `}</style>

      {/* --- 核心修复 2: 背景层 (清晰的图片) --- */}
      <div className="absolute inset-0 z-0">
        {/* 背景图：去掉 blur 类，保持 object-cover */}
        <img
          src={data.bgPreview}
          alt="Background"
          className="w-full h-full object-cover transition-opacity duration-700"
        />
        {/* 遮罩层：稍微加一点点黑，保证文字对比度，但不要太黑 */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* --- 核心修复 3: 动态粒子层 --- */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            // 随机生成参数
            const size = Math.random() * 3 + 1; // 1px 到 4px
            const left = Math.random() * 100; // 0% 到 100%
            const duration = Math.random() * 15 + 10; // 10s 到 25s
            const delay = Math.random() * 10; // 0s 到 10s
            const opacity = Math.random() * 0.4 + 0.1;

            return (
              <div
                key={i}
                className="particle-dot"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  opacity: opacity,
                  animationDuration: `${duration}s`,
                  animationDelay: `-${delay}s`, // 负延迟让动画直接开始，不用等
                }}
              />
            );
          })}
        </div>
      </div>

      {/* --- 内容层 (Z-Index 必须大于背景) --- */}
      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        
        {/* Profile Card */}
        {/* 核心修复 4: 卡片玻璃化 (bg-black/40 + backdrop-blur-md) */}
        <div className="md:col-span-2 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0 flex justify-center md:justify-start">
              <img
                src={data.avatarPreview}
                alt="Avatar"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-white/20 shadow-lg"
              />
            </div>
            <div className="flex-1 text-center md:text-left space-y-3">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-sm">
                  {data.name || "你的名字"}
                </h1>
                <p className="text-base font-medium mt-1" style={{ color: primary }}>
                  {data.title || "Full Stack Developer"}
                </p>
              </div>
              
              {/* 这里的 Tags 改为半透明胶囊 */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {data.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-[11px] bg-white/10 text-white/90 border border-white/5 backdrop-blur-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-200/90 leading-relaxed max-h-24 overflow-y-auto custom-scrollbar">
                {data.about}
              </p>
              
              {/* Social Icons */}
              {data.socials?.length > 0 && (
                <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3">
                  {data.socials.map((social, i) => {
                    const Icon = IconMap[social.icon] || Globe;
                    return (
                      <a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white/20 hover:text-white hover:scale-110 transition-all duration-300"
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 右侧 Snapshot 装饰卡片 */}
        <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-6 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-gray-400">Status</span>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] text-gray-300">Online</span>
            </div>
          </div>
          <div className="mt-8 space-y-1">
             <div className="text-4xl font-bold text-white/90">01</div>
             <div className="text-xs text-gray-400">Portfolio Version</div>
          </div>
        </div>

        {/* Tech Stack (改为图标化/胶囊化) */}
        <div className="md:col-span-2 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-6 shadow-xl">
          <h2 className="text-sm font-semibold text-white/90 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full" style={{background: primary}}></span>
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.tags?.length ? (
               data.tags.map((tag, i) => (
                <div key={i} className="px-4 py-2 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-xs text-white/80 hover:border-white/30 transition-colors">
                  {tag}
                </div>
               ))
            ) : (
              <p className="text-xs text-gray-500">Add tags in editor...</p>
            )}
          </div>
        </div>

        {/* Articles */}
        <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-6 shadow-xl">
          <h2 className="text-sm font-semibold text-white/90 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full" style={{background: primary}}></span>
            Latest Posts
          </h2>
          <div className="space-y-3">
             {data.articles?.map((a, i) => (
                <a key={i} href={a.link} target="_blank" className="group block">
                  <p className="text-xs font-medium text-gray-200 group-hover:text-blue-300 transition-colors truncate">
                    {a.title || "No Title"}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{a.date}</p>
                </a>
             ))}
          </div>
        </div>

        {/* Projects Cards */}
        {data.projects?.map((proj, i) => (
            <a
              key={i}
              href={proj.link}
              target="_blank"
              rel="noreferrer"
              className="relative rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-6 hover:-translate-y-1 hover:bg-black/50 hover:border-white/20 transition-all duration-300 shadow-xl group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-700/50 to-gray-900/50 border border-white/10 flex items-center justify-center text-xl">
                   {/* 这里可以用更复杂的图标逻辑 */}
                   {proj.title ? proj.title[0].toUpperCase() : "P"}
                </div>
                <ArrowUpRight className="text-gray-500 group-hover:text-white transition-colors" size={16}/>
              </div>
              <h3 className="text-sm font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                {proj.title || "Project Name"}
              </h3>
              <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                {proj.desc || "No description provided."}
              </p>
            </a>
        ))}

      </div>
    </div>
  );
}