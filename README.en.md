<div align="center">

# 🎨 Visual Homepage Builder

**WYSIWYG Personal Homepage Generator | 可视化个人主页生成器**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.3-646CFF?logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000?logo=express)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)

[🇨🇳 中文](./README.md) | [🇬🇧 English](./README.en.md)

**[✨ Live Demo](http://1.14.207.212:8080)** | **[📖 Documentation](#-quick-start)** | **[🚀 Deployment Guide](#-deployment)**

</div>

---

## 📸 Project Preview

<div align="center">

### Editor Interface
*Real-time visual editing, WYSIWYG experience*

![Editor Interface](./MarkdownImages/screenshots/编辑器界面.png)

### Complete Workflow Demo
*From editing to export in action*

![Demo GIF](./MarkdownImages/gifs/演示gif.gif)

</div>

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🎯 Visual Editing
- 🖱️ Drag-and-drop editing, no code required
- 👁️ Real-time preview, WYSIWYG
- 📦 One-click export to static site (HTML/CSS/JS)
- 🎨 Custom theme colors and backgrounds

</td>
<td width="50%">

### 🎵 Music Player
- 🎶 Built-in music player component
- 🔌 Netease Cloud Music playlist import
- 🔍 QQ Music search and add
- 📜 Real-time lyrics scrolling

</td>
</tr>
<tr>
<td width="50%">

### 👤 User System
- 🔐 JWT authentication
- ☁️ Cloud config storage
- 👻 Guest mode support
- 📧 Email validation

</td>
<td width="50%">

### 🛠️ Developer Experience
- ⚡ Vite lightning-fast HMR
- 🎭 TypeScript support
- 🎨 Tailwind CSS atomic styling
- 📱 Responsive design

</td>
</tr>
</table>

---

## 🏗️ Tech Stack

### Frontend
```
React 18.3.1          # UI Framework
Vite 6.0.3            # Build Tool
Tailwind CSS 3.4.17   # CSS Framework
Lucide React          # Icon Library
JSZip                 # ZIP Packaging
Axios                 # HTTP Client
```

### Backend
```
Node.js 16+           # Runtime
Express 4.21.2        # Web Framework
MySQL 8.0             # Database
JWT                   # Authentication
Bcrypt                # Password Hashing
Multer                # File Upload
```

### Music APIs
```
NeteaseCloudMusicApi  # Netease Cloud Music API
qq-music-api          # QQ Music API
```

---

## 🗄️ Database Schema

```sql
-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_email (email)
);

-- User configurations table
CREATE TABLE user_configs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  config_data JSON,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);
```

**Field Descriptions:**
- `users.password_hash`: Bcrypt-hashed password
- `user_configs.config_data`: Complete page configuration (JSON format)
  - Includes: personal info, theme colors, projects, articles, social links, music playlist, etc.

---

## 📁 Project Structure

```
visual-homepage-builder/
├── 📄 README.md                    # Chinese Documentation
├── 📄 README.en.md                 # English Documentation
├── 📜 LICENSE                      # MIT License
├── 📁 frontend/                    # Frontend Application
│   ├── 📄 vite.config.mts          # Vite Config (with API proxy)
│   ├── 📄 tailwind.config.js       # Tailwind Config
│   ├── 📁 public/
│   │   └── 📁 images/              # Default avatar & background assets
│   └── 📁 src/
│       ├── 📄 App.jsx              # Main App (routing & state)
│       ├── 📁 components/
│       │   ├── 📄 Editor.jsx       # Editor Panel
│       │   ├── 📄 Preview.jsx      # Live Preview Component
│       │   └── 📁 music/           # Music Player Module
│       │       ├── 📄 MusicPlayer.jsx
│       │       ├── 📄 playlist.js
│       │       └── 📄 lrc.js       # Lyrics Parser
│       ├── 📁 pages/
│       │   └── 📄 Login.jsx        # Login/Register Page
│       └── 📁 utils/
│           ├── 📄 api.js           # Axios Wrapper
│           ├── 📄 musicApi.js      # Music API Adapter
│           └── 📄 generateZip.js   # Static Site Export
├── 📁 backend/                     # Backend API
│   ├── 📄 server.js                # Express Main Server
│   ├── 📄 .env                     # Environment Variables
│   └── 📁 uploads/                 # User Upload Storage
├── 📁 MarkdownImages/              # Documentation Assets
│   ├── 📁 screenshots/             # Screenshots
│   └── 📁 gifs/                    # Demo GIFs
└── 📁 legacy-templates/            # Static Template References
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 16.x or higher
- **MySQL**: 8.0 or higher
- **npm**: 7.x or higher

### 1️⃣ Clone Repository

```bash
git clone https://github.com/IvoryThule/visual-homepage-builder.git
cd visual-homepage-builder
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install

# Create and configure .env file
cat > .env << EOF
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=portfolio_db
JWT_SECRET=$(openssl rand -base64 32)
UPLOADS_DIR=./uploads
EOF

# Initialize database (execute SQL schema above)
mysql -u root -p portfolio_db < schema.sql

# Start backend
npm start
```

**Backend runs on**: `http://localhost:3001`

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install

# Start development server
npm run dev
```

**Frontend runs on**: `http://localhost:5173`

### 4️⃣ Deploy Music APIs (Optional)

```bash
# Netease Cloud Music API
git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git netease-api
cd netease-api
npm install
PORT=3002 pm2 start app.js --name "netease-api"

# QQ Music API
cd ..
git clone https://github.com/jsososo/QQMusicApi.git qq-music-api
cd qq-music-api
npm install
PORT=3003 pm2 start app.js --name "qq-music-api"
```

### 5️⃣ Configure Nginx Reverse Proxy (Production)

```nginx
server {
    listen 8080;
    root /var/www/visual-homepage-builder/frontend/dist;

    # Frontend static files
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Netease Music API
    location /netease/ {
        proxy_pass http://127.0.0.1:3002/;
        proxy_set_header Host $host;
    }

    # QQ Music API
    location /qqmusic/ {
        proxy_pass http://127.0.0.1:3003/;
        proxy_set_header Host $host;
    }

    # Uploaded files
    location /uploads/ {
        alias /var/www/visual-homepage-builder/backend/uploads/;
    }
}
```

---

## 📖 User Guide

### Guest Mode
1. Visit [http://localhost:5173](http://localhost:5173)
2. Click "Guest Login" to try the editor
3. Click "Export" to download static site after editing

### Registered Users
1. Click "Register", fill in username, email, password
2. After login, use "Save to Cloud" to persist config
3. Next login auto-loads cloud config

### Music Configuration
1. Find "Music Player / 音乐播放器" card in editor
2. Switch to "Netease Import", enter playlist ID (e.g., `24381616`)
3. Or switch to "QQ Search", search keywords and add songs
4. Music list will be packaged into exported static site

---

## 🎯 API Documentation

### Authentication

#### POST `/api/auth/register`
**Register new user**

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
**User login**

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

### Configuration

#### GET `/api/config`
**Get user config** (requires JWT Token)

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:3001/api/config
```

#### POST `/api/config`
**Save user config** (requires JWT Token)

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

### File Upload

#### POST `/api/upload`
**Upload image** (requires JWT Token)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@avatar.png" \
  http://localhost:3001/api/upload
```

---

## 🔧 Environment Variables

### Backend `.env` Example

```env
# Server Config
PORT=3001

# Database Config
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=portfolio_db

# JWT Config
JWT_SECRET=your-super-secret-key-change-this-in-production

# File Upload
UPLOADS_DIR=./uploads
MAX_FILE_SIZE=5242880  # 5MB

# CORS Config (Optional)
CORS_ORIGIN=http://localhost:5173
```

### Frontend Vite Proxy Config

Configured in `frontend/vite.config.mts`:

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

## 🚀 Deployment

### Using Docker (Recommended)

```bash
# Build image
docker build -t visual-homepage-builder .

# Run container
docker run -d \
  -p 8080:8080 \
  -p 3001:3001 \
  -e DB_HOST=your_mysql_host \
  -e DB_USER=root \
  -e DB_PASS=your_password \
  --name homepage-builder \
  visual-homepage-builder
```

### Manual Deployment

1. **Build Frontend**
```bash
cd frontend
npm run build
# Output in frontend/dist/
```

2. **Deploy to Server**
```bash
# Upload dist/ to server /var/www/visual-homepage-builder/frontend/dist
scp -r dist/* user@server:/var/www/visual-homepage-builder/frontend/dist/

# Upload backend code
scp -r backend/* user@server:/var/www/visual-homepage-builder/backend/
```

3. **Configure PM2 Process Manager**
```bash
# Backend
cd /var/www/visual-homepage-builder/backend
pm2 start server.js --name "homepage-backend"

# Music APIs
pm2 start /var/www/netease-api/app.js --name "netease-api" -- --port 3002
pm2 start /var/www/qq-music-api/app.js --name "qq-music-api" -- --port 3003

# Save config
pm2 save
pm2 startup
```

4. **Configure Nginx** (see Nginx config above)

5. **Restart Services**
```bash
sudo systemctl reload nginx
pm2 restart all
```

---

## 📊 Performance Optimization

- ✅ Vite on-demand loading & code splitting
- ✅ Image lazy loading & compression
- ✅ Tailwind CSS production PurgeCSS
- ✅ MySQL connection pool reuse
- ✅ JWT token auto-refresh
- ✅ Nginx Gzip compression

---

## 🗺️ Roadmap

- [ ] **v2.0**
  - [ ] Drag-and-drop component sorting
  - [ ] Theme template marketplace
  - [ ] One-click deploy to GitHub Pages/Vercel
  - [ ] Multi-language i18n
  
- [ ] **v2.1**
  - [ ] Component library & reuse
  - [ ] Collaborative editing (real-time)
  - [ ] SEO optimization suggestions
  - [ ] Dark mode support

- [ ] **v3.0**
  - [ ] AI-powered color suggestions
  - [ ] Analytics & statistics
  - [ ] CDN integration
  - [ ] Mobile app

---

## 🤝 Contributing

Issues and Pull Requests are welcome!

### Development Workflow

1. Fork this repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Submit Pull Request

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation update
- `style`: Code formatting
- `refactor`: Refactoring
- `test`: Tests
- `chore`: Build/tooling changes

---

## 📝 License

This project is licensed under [MIT License](./LICENSE).

---

## 👨‍💻 Author

**IvoryThule**

- GitHub: [@IvoryThule](https://github.com/IvoryThule)
- Project Home: [visual-homepage-builder](https://github.com/IvoryThule/visual-homepage-builder)

---

## 🙏 Acknowledgments

Thanks to these awesome open source projects:

- [React](https://reactjs.org/) - UI Framework
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) - Netease Music API
- [QQMusicApi](https://github.com/jsososo/QQMusicApi) - QQ Music API

---

<div align="center">

**If this project helps you, please give it a ⭐ Star!**

Made with ❤️ by [IvoryThule](https://github.com/IvoryThule)

</div>