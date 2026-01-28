/* =====================
   Background Cycling Script
   ===================== */

class BackgroundCycler {
    constructor(images, options = {}) {
        this.images = images;
        this.currentIndex = 0;
        this.options = {
            interval: options.interval || 15000, // 15 seconds default
            transitionDuration: options.transitionDuration || 3000, // 3 seconds default
            container: options.container || 'body',
            ...options
        };
        this.container = document.querySelector(this.options.container);
        this.backgroundElements = [];
        this.isDarkMode = false;
        this.init();
    }

    init() {
        // Create background elements
        this.images.forEach((image, index) => {
            const bgElement = document.createElement('div');
            bgElement.className = 'background-layer';
            bgElement.style.position = 'fixed';
            bgElement.style.top = '0';
            bgElement.style.left = '0';
            bgElement.style.width = '100%';
            bgElement.style.height = '100%';
            bgElement.style.backgroundImage = `url(${image})`;
            bgElement.style.backgroundSize = 'cover';
            bgElement.style.backgroundPosition = 'center';
            bgElement.style.backgroundRepeat = 'no-repeat';
            bgElement.style.zIndex = '-1';
            bgElement.style.opacity = index === 0 ? '1' : '0';
            bgElement.style.transition = `opacity ${this.options.transitionDuration}ms ease-in-out`;
            bgElement.style.filter = 'blur(8px) brightness(0.7)';
            this.container.appendChild(bgElement);
            this.backgroundElements.push(bgElement);
        });

        // Start cycling
        this.startCycling();

        // Listen for dark mode changes
        this.listenForDarkMode();
    }

    startCycling() {
        setInterval(() => {
            this.nextBackground();
        }, this.options.interval);
    }

    nextBackground() {
        const currentElement = this.backgroundElements[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        const nextElement = this.backgroundElements[this.currentIndex];

        // Fade out current background
        currentElement.style.opacity = '0';

        // Fade in next background
        setTimeout(() => {
            nextElement.style.opacity = '1';
        }, 100);
    }

    listenForDarkMode() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isDark = document.body.classList.contains('dark-mode');
                    if (isDark !== this.isDarkMode) {
                        this.isDarkMode = isDark;
                        this.updateDarkMode();
                    }
                }
            });
        });

        observer.observe(document.body, { attributes: true });

        // Initial check
        this.isDarkMode = document.body.classList.contains('dark-mode');
        this.updateDarkMode();
    }

    updateDarkMode() {
        this.backgroundElements.forEach(element => {
            if (this.isDarkMode) {
                element.style.filter = 'blur(8px) brightness(0.3) saturate(0.7)';
            } else {
                element.style.filter = 'blur(8px) brightness(0.7)';
            }
        });
    }
}

// Initialize background cycler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // 本地背景图片
    const backgroundImages = [
        'images/backgrounds/ciallo.png'
    ];

    // Create background cycler
    window.backgroundCycler = new BackgroundCycler(backgroundImages, {
        interval: 15000, // 15 seconds
        transitionDuration: 3000 // 3 seconds crossfade
    });
});