# 🍱 Portfol.io Generator（visual-homepage-builder）

一个在浏览器中运行的可视化个人主页生成器，使用 React + Vite 实现。无需后端或手写页面，快速编辑、实时预览并导出可部署的静态站点。

![编辑器截图](./assets/screenshots/设置好信息之后的界面截图.png)

概览：使用可视化编辑器填写基础信息、替换头像与背景、管理标签与项目，最后一键导出静态网站（ZIP）。设计采用现代的玻璃拟态（glassmorphism）风格与响应式布局。

![导出示例 GIF](./assets/gifs/导出静态网站演示.gif)

# visual-homepage-builder — 作品集生成器与展示模板

**简介：**
visual-homepage-builder 汇集了若干静态个人主页模板和一个基于 React + Vite 的可视化 "Portfol.io Generator"，用于在浏览器中快速创建、预览并导出静态个人主页（无需后端）。

---


## 主要功能

- 所见即所得的可视化编辑器（编辑 → 实时预览 → 导出）
- Avatar / Background 上传与预览（使用 Object URL）
- 项目卡片、技能标签、社交链接等模块化组件
- 内置音乐播放器（支持播放 / 切歌 / 歌词）
- 浏览器端导出静态站点（ZIP）

---

## 快速开始（开发）

前置：Node.js 16+，npm 或 yarn

在仓库根目录执行前端开发：

```powershell
cd .\frontend
npm install
npm run dev
```

打开浏览器访问：

```
http://localhost:5173
```

构建生产（前端）：

```powershell
cd .\frontend
npm run build
cd ..
npm --prefix frontend run preview
```

前端构建产物位于 `frontend/dist/`，可直接部署到任意静态托管服务。

---

## 仓库结构（节选）

```
visual-homepage-builder/
├─ README.md                  # 本文件（中文）
├─ README.en.md               # 英文说明
├─ LICENSE
├─ assets/
│  ├─ screenshots/            # 项目截图（PNG 等）
│  └─ gifs/                   # 演示 GIF
├─ neo-portfolio.html         # 预制静态模板示例
├─ personal-portfolio.html    # 另一个静态模板示例
├─ frontend/                  # 可视化生成器（主要开发目录）
│  ├─ index.html              # 入口 HTML
│  ├─ package.json            # npm scripts / 依赖
│  ├─ vite.config.mts         # Vite 配置
│  ├─ postcss.config.js       # PostCSS 配置
│  ├─ tailwind.config.js      # Tailwind 配置
│  ├─ Dockerfile              # 可选容器化配置
│  ├─ src/
│  │  ├─ main.jsx             # React 挂载入口
│  │  ├─ App.jsx              # 根组件：连接 Editor 与 Preview
│  │  ├─ index.css            # 全局样式（Tailwind）
│  │  ├─ components/
│  │  │  ├─ Editor.jsx        # 左侧配置面板（上传、表单）
│  │  │  ├─ Preview.jsx       # 实时预览（右侧）
│  │  │  └─ music/            # 音乐播放器相关
│  │  │     ├─ MusicPlayer.jsx
│  │  │     ├─ playlist.js
│  │  │     ├─ lrc.js
│  │  │     └─ audioUtils.js
│  │  └─ utils/
│  │     └─ generateZip.js    # 浏览器端 ZIP 导出实现
│  └─ dist/                   # 构建产物（生产构建输出）
└─ backend/                   # 后端占位（可用于 API、部署脚本等）
```

---

## 贡献与许可

欢迎提交 Issue 与 PR。提交流程：Fork → 新分支 → 提交 → PR。

本项目采用 MIT 许可（详见 `LICENSE`）。