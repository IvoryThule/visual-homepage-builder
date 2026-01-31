# 🍱 visual-homepage-builder — 可视化个人主页生成器
# <p align="center">
  <strong>一个基于 React + Vite 的可视化个人主页编辑器</strong><br/>
  前端负责所见即所得的编辑、实时预览与导出静态站点；后端提供用户注册/登录与配置云端保存功能。
</p >

## 🎉 欢迎使用 Visual Homepage Builder!

> 推荐使用游客体验，因为藤子这个服务器上我其他项目在跑的时候偶尔重启可能会 pm2 进程

<div align="center">
  <a href="" target="_blank" style="display:inline-block; background-color:#4CAF50; color:white; padding:12px 24px; text-decoration:none; border-radius:4px; margin:8px; font-weight:bold;">🚀 点击此处体验</a>
  <a href="https://github.com/IvoryThule/visual-homepage-builder" target="_blank" style="display:inline-block; background-color:#24292e; color:white; padding:12px 24px; text-decoration:none; border-radius:4px; margin:8px; font-weight:bold;">⭐ GitHub 仓库</a>
  <p style="margin-top:8px; font-size:14px;">（欢迎⭐Star和🐛Fork）</p>
  <p>或者直接点击链接：<a href="http://1.14.207.212:8080">http://1.14.207.212:8080</a></p>
</div>

---

## 📱 主要界面以及演示

### 注册登录界面
提供用户注册登录功能以及游客访问功能：用户注册并登录之后支持将修改后的信息与配置云端保存；游客仅支持导出为静态页面功能

![注册登录界面](./MarkdownImages/screenshots/注册登录界面.png)

### 编辑器主页面
目前展示的是游客身份访问后能看到的页面，即本项目配置的默认头像、图像以及一些基本信息。

用户可以在左侧的编辑器实时配置并一键导出静态站点，包括：个人的基本信息、技术栈、一些个人的社交链接、项目描述以及链接、自己写的博客与文章等等，支持一键跳转与生成的主页预览。

此外，用户可以在右侧的歌曲播放栏目中播放歌曲，目前项目仅包括作者自选歌单。在后续开发计划中会考虑接入开源音乐 API、支持导入外部歌单链接并解析播放列表。

![编辑器界面](./MarkdownImages/screenshots/编辑器界面.png)

### 修改信息与导出演示
编辑器支持导出为静态 ZIP（包含 HTML/CSS/JS 与上传的资源），也可以直接预览生成的页面。

演示 GIF：
![](./MarkdownImages/gifs/演示gif.gif)

---

## 🛠️ 主要功能（当前）

- 可视化编辑器（实时预览 → 导出静态站点）
- 前端：React + Vite + Tailwind，支持图片上传、项目卡片、标签、内置音乐播放器
- 后端：Express + MySQL（连接池），提供注册/登录、JWT 验证、云端配置读取与保存（可选）
- 认证：注册需填写 `username`, `email`, `password`（邮箱格式校验），登录支持使用用户名或邮箱
- 本地与云端数据：已登录用户可以将配置保存到数据库；游客模式保存在本地 state（不上传）

---

## 🚀 快速开始（开发）

先决条件：Node.js 16+，MySQL（用于后端可选功能），npm

1) 启动后端（可选 — 如果你需要注册/登录与云端保存）

```powershell
cd .\backend
npm install
# 配置 .env（见下方说明），然后
npm run start
```

后端默认端口：`3001`（可通过 `backend/.env` 覆盖 `PORT`）。

2) 启动前端

```powershell
cd .\frontend
npm install
npm run dev
```

打开浏览器访问：

```
http://localhost:5173
```

页面说明：根路径会重定向到 `/login`；登录后进入 `/editor` 即可使用编辑器并（若已登录）保存到云端。

3) 构建生产（前端）

```powershell
cd .\frontend
npm run build
# 预览构建产物
npm --prefix frontend run preview
```

前端构建产物位于 `frontend/dist/`。

---

⚙️ 后端配置（.env）

在 `backend/.env` 中配置数据库与 JWT、例如：

```
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=portfolio_db
JWT_SECRET=please-change-this-secret
```

你也可以添加 SMTP 配置以便日后扩展邮件验证功能。

---

🔌 API 摘要（开发者参考）

- POST /api/auth/register — 注册：接收 { username, email, password }，返回 { token, username }
- POST /api/auth/login — 登录：接收 { username, password }（username 可为用户名或邮箱），返回 { token, username }
- GET /api/config — 获取当前用户配置（需 Authorization: Bearer <token>）
- POST /api/config — 保存/更新当前用户配置（需 Authorization）

---

## 📁 仓库结构（节选）

```
visual-homepage-builder/
├─ README.md                  # 本文件（项目说明、开发/运行步骤、迁移建议等）
├─ README.en.md               # 英文版说明（已同步更新）
├─ LICENSE                    # 项目许可（MIT）
├─ MarkdownImages/            # 项目文档中引用的本地图片目录（截图、GIF 等）
├─ frontend/                  # 前端应用（React + Vite）
│   ├─ index.html             # Vite 入口 HTML 模板
│   ├─ package.json           # 前端依赖与启动脚本（dev/build/preview）
│   ├─ vite.config.mts        # Vite 配置（插件、别名等）
│   ├─ postcss.config.js      # Tailwind / PostCSS 配置
│   ├─ tailwind.config.js     # Tailwind 配置
│   ├─ public/                # 静态公共资源（images/ 等，打包时会复制）
│   └─ src/                   # 前端源码
│       ├─ main.jsx           # React 挂载与路由（应用入口）
│       ├─ App.jsx            # 顶层组件：路由、数据加载与保存逻辑
│       ├─ index.css          # 全局样式（Tailwind 引导）
│       ├─ pages/             # 单页/路由组件
│       │   └─ Login.jsx      # 登录/注册页（支持用户名或邮箱登录、游客模式）
│       ├─ components/        # 可复用 UI 组件
│       │   ├─ Editor.jsx     # 编辑器主视图：表单、字段与"保存到云"交互
│       │   ├─ Preview.jsx    # 实时预览组件（根据 data 渲染页面外观）
│       │   └─ music/         # 音乐播放器相关组件与工具（audioUtils、播放列表、歌词解析）
│       ├─ utils/             # 工具函数
│       │   ├─ api.js         # axios 封装：baseURL、token 注入、401 处理
│       │   └─ generateZip.js # 将编辑结果导出为静态站点 ZIP 的逻辑
│       └─ ...                # 其他组件/样式/工具
├─ backend/                   # 后端（可选）：Node.js + Express API
│   ├─ package.json           # 后端依赖与启动脚本（start）
│   ├─ server.js              # 主服务器文件：路由、JWT 验证、中间件、DB 连接池
│   ├─ .env.example           # 环境变量示例（PORT, DB_HOST, DB_USER, DB_PASS, DB_NAME, JWT_SECRET）
│   └─ migrations/            # （可选）数据库迁移脚本目录（建议加入以便版本化）
└─ legacy-templates/          # 旧版静态模板示例（可作为导出模板参考）
```

---

## 🔭 后续开发计划 (Roadmap)

- **音乐播放增强**：接入开源音乐 API，支持导入外部歌单与解析多种音频来源。
- **导出增强**：增加自定义域名/部署说明模板与一键上传到 GitHub Pages 的选项。
- **测试与 CI**：加入单元与集成测试，配置 GitHub Actions 自动构建与预览部署。

---

## 📄 贡献与许可

- 欢迎提 Issue 与 PR。提交流程：Fork → 新分支 → 提交 → PR。
- 本项目采用 MIT 许可（详见 `LICENSE`）。

如果你想让我继续：我可以帮你把 README 中的图片缩放、优化路径、或者生成一个简短的英文主页（GitHub Pages 友好）。