# 🍱 Portfol.io Generator | 个人主页生成器

无需编写代码，三分钟打造属于你的现代风格个人主页。

[在此处插入项目演示截图或GIF]
# 🍱 Portfol.io Generator（HomePageExample）

一款运行在浏览器端的个人主页可视化生成器 —— 无需编写代码，三分钟打造现代风格个人主页。

![在此处插入项目演示截图或 GIF（例如：portfolio-generator/docs/demo.gif）]
<!--
	README.md（中文）—— 专为 HomePageExample 仓库设计
	- 请把项目演示截图或 GIF 放在仓库根目录的 `assets/` 或 `docs/` 文件夹，
		然后替换下方的占位路径。
-->

# HomePageExample — 作品集生成器与展示模板

**简介：**
HomePageExample 汇集了若干静态个人主页模板和一个基于 React + Vite 的可视化 "Portfol.io Generator"，用于在浏览器中快速创建、预览并导出静态个人主页（无需后端）。

---

**演示 / 截图（占位）**

在这里插入项目演示的静态截图或 GIF：

![Demo GIF 或 Screenshot](./assets/demo.gif)

（提示：将实际图像放到 `assets/` 或 `docs/`，然后替换上面的路径）

---

**核心卖点**

- 所见即所得的可视化编辑器（编辑-实时预览-导出）
- Bento Grid 风格模板 + 磨砂玻璃（Glassmorphism）视觉
- 纯前端导出：生成可直接部署的静态 HTML/CSS/JS 包（ZIP）
- 可配置的模块化组件（标签、作品卡片、社交矩阵、背景/头像替换）

---

**快速开始（针对 `portfolio-generator`）**

前置要求：

- Node.js v16+
- 推荐使用 `npm`（或 `yarn`）

在仓库根目录中打开终端并执行：

```powershell
cd .\portfolio-generator
npm install
npm run dev
```

开发服务器默认地址（Vite）：

```
http://localhost:5173
```

生产构建：

```powershell
npm run build
npm run preview
```

生成的静态文件会输出到 `portfolio-generator/dist/`（可直接上传到 GitHub Pages / Vercel / 任何静态托管）。

---

**目录结构（更详细）**

```
HomePageExample/
├─ LICENSE
├─ README.md                # 本文件（中文）
├─ README.en.md             # 英文版
├─ neo-portfolio.html       # 现成静态模板示例
├─ personal-portfolio.html  # 另一个静态模板示例
├─ images/                  # 通用图片资源（avatar、backgrounds、icons）
├─ js/                      # 站点级别脚本（legacy）
└─ portfolio-generator/     # 可视化生成器（主要开发目录）
	 ├─ index.html
	 ├─ package.json
	 ├─ postcss.config.js
	 ├─ tailwind.config.js
	 ├─ vite.config.mts
	 ├─ src/
	 │  ├─ App.jsx            # 根组件：整合 Editor 与 Preview
	 │  ├─ main.jsx           # 入口（React mount）
	 │  ├─ index.css          # 全局样式（Tailwind +定制）
	 │  ├─ components/
	 │  │  ├─ Editor.jsx     # 左侧配置面板（表单与上传）
	 │  │  ├─ Preview.jsx    # 右侧实时预览（已拆分音乐播放器到 components/music）
	 │  │  └─ ui/            # 可复用小组件（Badge, Button, Input, Textarea 等）
	 │  └─ utils/
	 │     └─ generateZip.js # 导出 ZIP 的实现（浏览器端打包）
	 └─ dist/                # 构建产物（存在时）
```

---

**定制说明**

- 主题色：在编辑器中设置 `Primary Color` 即可。
- 背景与头像：通过编辑器上传本地图片（使用 `URL.createObjectURL` 生成预览），导出时会把图片嵌入到导出包。
- 技能标签：可以在侧边栏动态添加/删除，Preview 将以卡片形式展示。

---

**导出与部署**

- 点击编辑器右上角的“导出”会触发 `generateZip`，生成一个包含 HTML、CSS、图片与 JS 的 ZIP 包。
- 将 ZIP 解压并将 `index.html` 与关联文件夹上传到 GitHub Pages / Vercel / Netlify 即可上线。

---

**贡献指南**

感谢你的贡献！简单流程：

1. Fork 仓库并创建分支：

```bash
git checkout -b feature/your-feature
```

2. 本地开发、编写测试并提交：

```bash
git add .
git commit -m "feat: 描述你的改动"
git push origin feature/your-feature
```

3. 提交 Pull Request，我们会尽快 review。

---

**维护与联系方式**

如果你在使用中遇到问题，欢迎在 Issues 中描述复现步骤与浏览器控制台日志。

---

**许可证**

本项目遵循 MIT 许可。详见 `LICENSE` 文件。


## 🧭 功能概览

- 所见即所得编辑（左侧表单 + 右侧实时预览）
- Avatar / Background 上传与即时显示（使用 Object URLs 处理本地文件预览）
- 卡片组件（Profile、Tech Stack、Projects、Posts）
- 内置音乐播放器（支持基本播放 / 切歌 / 歌词显示）
- 一键导出静态站点（zip）

---

## 🧩 开发与调试提示

- 如果背景或头像无法预览，请确认浏览器控制台是否有错误（例如资源加载或跨域问题）。
- 音乐播放受浏览器自动播放策略与外链可用性影响（播放器包含自动切歌逻辑）。

---

## 🤝 贡献指南

欢迎任何形式的贡献：Issue、PR、文案与设计改进。

流程：

1. Fork 并新建分支：`git checkout -b feature/your-feature`
2. 本地实现并测试：`cd portfolio-generator; npm install; npm run dev`
3. 代码提交请使用说明性 commit message（例如 `feat: add export progress`）
4. 提交 PR 并在描述中添加测试步骤与预期行为

建议包含变更摘要、影响范围与可复现步骤。

---

## 📬 联系与致谢

如果你有问题或建议，请在 GitHub Issues 提交，或发送邮件到：`2728347417@qq.com`

感谢所有贡献者与早期用户的反馈。

---

## 📜 许可证

本项目采用 MIT 许可证，详见根目录 `LICENSE` 文件。

---

(完)
在项目根目录下运行以下命令安装依赖：
```bash
npm install
```

### 启动开发服务器
运行以下命令启动本地开发服务器：
```bash
npm run dev
```
启动后，打开浏览器访问 [http://localhost:5173](http://localhost:5173)。

### 构建项目
运行以下命令生成生产环境的静态文件：
```bash
npm run build
```
生成的文件将位于 `dist/` 目录下。

### 预览生产环境构建
运行以下命令预览生产环境构建：
```bash
npm run preview
```

## 🤝 贡献指南
我们非常欢迎社区贡献！无论是增加新的模板风格、优化 UI 细节，还是修复 Bug，您的每一次 Commit 都能让更多人轻松拥有个人主页。

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request