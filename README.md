<div align="center">

# 🎨 Visual Homepage Builder

**可视化个人主页生成器 | WYSIWYG Personal Homepage Generator**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.3-646CFF?logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000?logo=express)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)

[🇨🇳 中文](./README.md) | [🇬🇧 English](./README.en.md)

**[✨ 在线体验](http://1.14.207.212:8080)** | **[📖 文档](#-快速开始)** | **[🚀 部署指南](#-部署指南)**

</div>

---

## 📸 项目预览

<div align="center">

### 编辑器主界面
*实时可视化编辑，所见即所得*

![编辑器界面](./MarkdownImages/screenshots/编辑器界面.png)

### 完整工作流演示
*从编辑到导出的完整流程*

![演示 GIF](./MarkdownImages/gifs/演示gif.gif)

</div>

---

## ✨ 核心特性

<table>
<tr>
<td width="50%">

### 🎯 可视化编辑
- 🖱️ 拖拽式编辑，无需写代码
- 👁️ 实时预览，所见即所得
- 📦 一键导出静态站点（HTML/CSS/JS）
- 🎨 支持自定义主题色与背景

</td>
<td width="50%">

### 🎵 音乐播放器
- 🎶 内置音乐播放器组件
- 🔌 支持网易云歌单导入
- 🔍 支持 QQ 音乐搜索添加
- 📜 实时歌词滚动显示

</td>
</tr>
<tr>
<td width="50%">

### 👤 用户系统
- 🔐 JWT 身份验证
- ☁️ 云端配置保存
- 👻 支持游客模式体验
- 📧 邮箱格式校验

</td>
<td width="50%">

### 🛠️ 开发体验
- ⚡ Vite 极速热更新
- 🎭 TypeScript 类型支持
- 🎨 Tailwind CSS 原子化样式
- 📱 响应式设计

</td>
</tr>
</table>

---

## 🏗️ 技术栈

### 前端技术
```
React 18.3.1          # UI 框架
Vite 6.0.3            # 构建工具
Tailwind CSS 3.4.17   # 样式框架
Lucide React          # 图标库
JSZip                 # ZIP 打包
Axios                 # HTTP 客户端
```

### 后端技术
```
Node.js 16+           # 运行环境
Express 4.21.2        # Web 框架
MySQL 8.0             # 数据库
JWT                   # 身份验证
Bcrypt                # 密码加密
Multer                # 文件上传
```

### 音乐 API
```
NeteaseCloudMusicApi  # 网易云音乐 API
qq-music-api          # QQ 音乐 API
```

---

## 🗄️ 数据库架构

```sql
-- 用户表
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_email (email)
);

-- 用户配置表
CREATE TABLE user_configs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  config_data JSON,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);
```

**字段说明：**
- `users.password_hash`: bcrypt 加密后的密码
- `user_configs.config_data`: 存储完整的页面配置（JSON 格式）
  - 包含：个人信息、主题色、项目列表、文章列表、社交链接、音乐播放列表等

---

## 📁 项目结构

```
visual-homepage-builder/
├── 📄 README.md                    # 中文文档
├── 📄 README.en.md                 # 英文文档
├── 📜 LICENSE                      # MIT 许可证
├── 📁 frontend/                    # 前端应用
│   ├── 📄 vite.config.mts          # Vite 配置（含 API 代理）
│   ├── 📄 tailwind.config.js       # Tailwind 配置
│   ├── 📁 public/
│   │   └── 📁 images/              # 默认头像与背景资源
│   └── 📁 src/
│       ├── 📄 App.jsx              # 主应用（路由与状态管理）
│       ├── 📁 components/
│       │   ├── 📄 Editor.jsx       # 编辑器主面板
│       │   ├── 📄 Preview.jsx      # 实时预览组件
│       │   └── 📁 music/           # 音乐播放器模块
│       │       ├── 📄 MusicPlayer.jsx
│       │       ├── 📄 playlist.js
│       │       └── 📄 lrc.js       # 歌词解析器
│       ├── 📁 pages/
│       │   └── 📄 Login.jsx        # 登录/注册页
│       └── 📁 utils/
│           ├── 📄 api.js           # Axios 封装
│           ├── 📄 musicApi.js      # 音乐 API 适配层
│           └── 📄 generateZip.js   # 静态站点导出
├── 📁 backend/                     # 后端 API
│   ├── 📄 server.js                # Express 主服务
│   ├── 📄 .env                     # 环境变量配置
│   └── 📁 uploads/                 # 用户上传文件存储
├── 📁 MarkdownImages/              # 文档图片资源
│   ├── 📁 screenshots/             # 截图
│   └── 📁 gifs/                    # 演示动图
└── 📁 legacy-templates/            # 静态模板参考
```

---

## 🚀 快速开始

### 环境要求

- **Node.js**: 16.x 或更高版本
- **MySQL**: 8.0 或更高版本
- **npm**: 7.x 或更高版本

### 1️⃣ 克隆仓库

```bash
git clone https://github.com/IvoryThule/visual-homepage-builder.git
cd visual-homepage-builder
```

### 2️⃣ 配置后端

```bash
cd backend
npm install

# 创建并配置 .env 文件
cat > .env << EOF
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=portfolio_db
JWT_SECRET=$(openssl rand -base64 32)
UPLOADS_DIR=./uploads
EOF

# 初始化数据库（执行上方 SQL 建表语句）
mysql -u root -p portfolio_db < schema.sql

# 启动后端
npm start
```

**后端默认运行在**: `http://localhost:3001`

### 3️⃣ 配置前端

```bash
cd ../frontend
npm install

# 启动开发服务器
npm run dev
```

**前端默认运行在**: `http://localhost:5173`

### 4️⃣ 部署音乐 API（可选）

```bash
# 网易云音乐 API
git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git netease-api
cd netease-api
npm install
PORT=3002 pm2 start app.js --name "netease-api"

# QQ 音乐 API
cd ..
git clone https://github.com/jsososo/QQMusicApi.git qq-music-api
cd qq-music-api
npm install
PORT=3003 pm2 start app.js --name "qq-music-api"
```

### 5️⃣ 配置 Nginx 反向代理（生产环境）

```nginx
server {
    listen 8080;
    root /var/www/visual-homepage-builder/frontend/dist;

    # 前端静态文件
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 后端 API
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # 网易云音乐 API
    location /netease/ {
        proxy_pass http://127.0.0.1:3002/;
        proxy_set_header Host $host;
    }

    # QQ 音乐 API
    location /qqmusic/ {
        proxy_pass http://127.0.0.1:3003/;
        proxy_set_header Host $host;
    }

    # 上传文件
    location /uploads/ {
        alias /var/www/visual-homepage-builder/backend/uploads/;
    }
}
```

---

## 📖 使用指南

### 游客模式
1. 访问 [http://localhost:5173](http://localhost:5173)
2. 点击"游客登录"直接体验编辑器
3. 编辑完成后点击"Export"导出静态站点

### 注册用户
1. 点击"注册"，填写用户名、邮箱、密码
2. 登录后可使用"Save to Cloud"保存配置
3. 下次登录时自动加载云端配置

### 音乐配置
1. 在编辑器中找到"Music Player / 音乐播放器"卡片
2. 切换到"网易云导入"，输入歌单 ID（如 `24381616`）
3. 或切换到"QQ音乐搜索"，输入关键词搜索并添加
4. 导出时音乐列表会一并打包到静态站点中

---

## 🎯 API 接口文档

### 认证接口

#### POST `/api/auth/register`
**注册新用户**

```json
// Request
{
  "username": "demo",
  "email": "demo@example.com",
  "password": "password123"
}

// Response (200)
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "demo"
}
```

#### POST `/api/auth/login`
**用户登录**

```json
// Request
{
  "email": "example@example.com",
  "password": "password123"
}

// Response (200)
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "demo"
}
```

### 配置接口

#### GET `/api/config`
**获取用户配置**（需要 JWT Token）

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:3001/api/config
```

#### POST `/api/config`
**保存用户配置**（需要 JWT Token）

```json
// Request
{
  "name": "Your Name",
  "title": "Full Stack Developer",
  "bio": "...",
  "tags": ["React", "Node.js"],
  "socials": [...],
  "projects": [...],
  "articles": [...],
  "playlist": [...]
}
```

### 文件上传

#### POST `/api/upload`
**上传图片**（需要 JWT Token）

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@avatar.png" \
  http://localhost:3001/api/upload
```

---

## 🔧 环境变量配置

### 后端 `.env` 示例

```env
# 服务器配置
PORT=3001

# 数据库配置
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=portfolio_db

# JWT 配置
JWT_SECRET=your-super-secret-key-change-this-in-production

# 文件上传
UPLOADS_DIR=./uploads
MAX_FILE_SIZE=5242880  # 5MB

# 跨域配置（可选）
CORS_ORIGIN=http://localhost:5173
```

### 前端 Vite 代理配置

已在 `frontend/vite.config.mts` 中配置：

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
      '/netease': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/netease/, '')
      },
      '/qqmusic': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/qqmusic/, '')
      }
    }
  }
})
```

---

## 🚀 部署指南

### 使用 Docker（推荐）

```bash
# 构建镜像
docker build -t visual-homepage-builder .

# 运行容器
docker run -d \
  -p 8080:8080 \
  -p 3001:3001 \
  -e DB_HOST=your_mysql_host \
  -e DB_USER=root \
  -e DB_PASS=your_password \
  --name homepage-builder \
  visual-homepage-builder
```

### 手动部署

1. **构建前端**
```bash
cd frontend
npm run build
# 产物在 frontend/dist/
```

2. **部署到服务器**
```bash
# 上传 dist/ 到服务器 /var/www/visual-homepage-builder/frontend/dist
scp -r dist/* user@server:/var/www/visual-homepage-builder/frontend/dist/

# 上传后端代码
scp -r backend/* user@server:/var/www/visual-homepage-builder/backend/
```

3. **配置 PM2 守护进程**
```bash
# 后端
cd /var/www/visual-homepage-builder/backend
pm2 start server.js --name "homepage-backend"

# 音乐 API
pm2 start /var/www/netease-api/app.js --name "netease-api" -- --port 3002
pm2 start /var/www/qq-music-api/app.js --name "qq-music-api" -- --port 3003

# 保存配置
pm2 save
pm2 startup
```

4. **配置 Nginx**（参考上方 Nginx 配置）

5. **重启服务**
```bash
sudo systemctl reload nginx
pm2 restart all
```

---

## 📊 性能优化

- ✅ Vite 按需加载与代码分割
- ✅ 图片懒加载与压缩
- ✅ Tailwind CSS 生产环境自动 PurgeCSS
- ✅ MySQL 连接池复用
- ✅ JWT Token 过期自动刷新
- ✅ Nginx Gzip 压缩

---

## 🗺️ Roadmap

- [ ] **v2.0**
  - [ ] 拖拽式组件排序
  - [ ] 主题模板市场
  - [ ] 一键部署到 GitHub Pages/Vercel
  - [ ] 多语言国际化（i18n）
  
- [ ] **v2.1**
  - [ ] 组件库与复用
  - [ ] 协作编辑（多人实时）
  - [ ] SEO 优化建议
  - [ ] 暗色模式支持

- [ ] **v3.0**
  - [ ] AI 智能配色建议
  - [ ] 访问统计与分析
  - [ ] CDN 加速集成
  - [ ] 移动端 App

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### Commit 规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具链变更

---

## 📝 许可证

本项目采用 [MIT License](./LICENSE) 开源。

---

## 👨‍💻 作者

**荼白 (IvoryThule)**

- GitHub: [@IvoryThule](https://github.com/IvoryThule)
- 项目主页: [visual-homepage-builder](https://github.com/IvoryThule/visual-homepage-builder)

---

## 🙏 致谢

感谢以下开源项目：

- [React](https://reactjs.org/) - UI 框架
- [Vite](https://vitejs.dev/) - 构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 样式框架
- [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) - 网易云音乐 API
- [QQMusicApi](https://github.com/jsososo/QQMusicApi) - QQ 音乐 API

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐ Star！**

Made with ❤️ by [IvoryThule](https://github.com/IvoryThule)

</div>