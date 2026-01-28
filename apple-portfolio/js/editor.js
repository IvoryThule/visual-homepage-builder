// js/editor.js - 个人主页生成器核心逻辑
const iframe = document.getElementById('preview-iframe');
const nameInput = document.getElementById('name');
const taglineInput = document.getElementById('tagline');
const avatarUpload = document.getElementById('avatar-upload');
const avatarPreview = document.getElementById('avatar-preview');
const bgUpload = document.getElementById('bg-images-upload');
const bgList = document.getElementById('bg-image-list');
const aboutTextarea = document.getElementById('about-content');
const worksTextarea = document.getElementById('works-content');
const previewBtn = document.getElementById('preview-btn');
const exportBtn = document.getElementById('export-btn');

let avatarBase64 = '';
let bgBase64List = [];

// 加载保存的数据（如果有 localStorage）
function loadSavedData() {
    const saved = localStorage.getItem('portfolioConfig');
    if (saved) {
        const config = JSON.parse(saved);
        nameInput.value = config.name || '';
        taglineInput.value = config.tagline || '';
        aboutTextarea.value = config.about || '';
        worksTextarea.value = config.works || '';
        avatarBase64 = config.avatar || '';
        bgBase64List = config.bg || [];
        updateAvatarPreview();
        updateBgList();
    }
}
loadSavedData();

// 保存到 localStorage
function saveConfig() {
    const config = {
        name: nameInput.value,
        tagline: taglineInput.value,
        avatar: avatarBase64,
        bg: bgBase64List,
        about: aboutTextarea.value,
        works: worksTextarea.value
    };
    localStorage.setItem('portfolioConfig', JSON.stringify(config));
}

// 头像上传
avatarUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
            avatarBase64 = ev.target.result;
            updateAvatarPreview();
            saveConfig();
            updatePreview();
        };
        reader.readAsDataURL(file);
    }
});

function updateAvatarPreview() {
    if (avatarBase64) avatarPreview.src = avatarBase64;
}

// 背景图上传
bgUpload.addEventListener('change', (e) => {
    const files = e.target.files;
    [...files].forEach(file => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            bgBase64List.push(ev.target.result);
            updateBgList();
            saveConfig();
            updatePreview();
        };
        reader.readAsDataURL(file);
    });
});

function updateBgList() {
    bgList.innerHTML = '';
    bgBase64List.forEach((src, i) => {
        const item = document.createElement('div');
        item.className = 'bg-image-item';
        item.innerHTML = `<img src="${src}" alt="bg">
                          <span>背景图 ${i+1}</span>
                          <button class="remove-bg-btn" data-index="${i}">删除</button>`;
        item.querySelector('.remove-bg-btn').addEventListener('click', () => {
            bgBase64List.splice(i, 1);
            updateBgList();
            saveConfig();
            updatePreview();
        });
        bgList.appendChild(item);
    });
}

// 输入变化实时保存 + 更新预览
[nameInput, taglineInput, aboutTextarea, worksTextarea].forEach(el => {
    el.addEventListener('input', () => {
        saveConfig();
        updatePreview();
    });
});

// 更新预览（通过 postMessage，需主页 main.js 支持，或 reload）
function updatePreview() {
    saveConfig();
    // 简单方式：reload iframe（内容会从 localStorage 读取，如果主页支持）
    iframe.contentWindow.location.reload();
}

// 预览按钮
previewBtn.addEventListener('click', updatePreview);

// 导出 ZIP（关键：必须用本地服务器运行，否则 fetch 失败）
exportBtn.addEventListener('click', async () => {
    const zip = new JSZip();
    
    // 需要用服务器运行才能 fetch 文件！否则报 CORS
    const files = [
        'index.html', 'about.html', 'blog.html', 'works.html', 'project.html',
        'css/styles.css', 'js/main.js', 'js/background.js'
    ];
    
    for (const file of files) {
        try {
            const response = await fetch(file);
            let content = await response.text();
            
            // 简单替换（你主页需有占位或用 localStorage）
            // 这里假设导出时用保存的 config 替换（实际可扩展）
            content = content.replace('IvoryThule', nameInput.value || 'IvoryThule');
            content = content.replace('Design Engineer · Hong Kong', taglineInput.value || 'Design Engineer · Hong Kong');
            
            zip.file(file, content);
        } catch (err) {
            alert(`加载文件失败：${file}（必须用本地服务器运行，如 Live Server）`);
            return;
        }
    }
    
    // 添加 images 目录结构
    const imagesDir = zip.folder('images');
    
    // 添加 avatar 目录
    const avatarDir = imagesDir.folder('avatar');
    if (avatarBase64) {
        // 提取 base64 数据部分
        const base64Data = avatarBase64.split(',')[1];
        avatarDir.file('avatar.jpg', base64Data, {base64: true});
    }
    
    // 添加 backgrounds 目录
    const backgroundsDir = imagesDir.folder('backgrounds');
    bgBase64List.forEach((bgBase64, index) => {
        if (bgBase64) {
            const base64Data = bgBase64.split(',')[1];
            backgroundsDir.file(`background${index + 1}.jpg`, base64Data, {base64: true});
        }
    });
    
    // 添加 icons 目录
    const iconsDir = imagesDir.folder('icons');
    // 添加 QQ 和 Bilibili 图标（空文件作为占位符）
    iconsDir.file('QQ.png', '', {base64: true});
    iconsDir.file('bilibili.png', '', {base64: true});
    
    // 生成并下载 ZIP
    zip.generateAsync({type: 'blob'}).then(blob => {
        saveAs(blob, 'ivorythule-portfolio.zip');
    });
});