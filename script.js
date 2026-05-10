document.addEventListener('DOMContentLoaded', () => {
    const titleElement = document.querySelector('.main-title');
    const isIndex = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/');

    if (titleElement && isIndex) {
        const originalHTML = titleElement.innerHTML;
        titleElement.innerHTML = '';
        let i = 0;

        function typeWriter() {
            if (i < originalHTML.length) {
                if (originalHTML.charAt(i) === '<') {
                    let tagEnd = originalHTML.indexOf('>', i);
                    if (tagEnd !== -1) {
                        let fullTag;
                        if (originalHTML.substring(i, tagEnd + 1).includes('span')) {
                            let spanEnd = originalHTML.indexOf('</span>', tagEnd);
                            fullTag = originalHTML.substring(i, spanEnd + 7);
                            i = spanEnd + 7;
                        } else {
                            fullTag = originalHTML.substring(i, tagEnd + 1);
                            i = tagEnd + 1;
                        }
                        titleElement.innerHTML += fullTag;
                    }
                } else {
                    titleElement.innerHTML += originalHTML.charAt(i);
                    i++;
                }
                setTimeout(typeWriter, 50);
            }
        }
        typeWriter();
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('article, .gallery-grid, .info-grid, .contact-grid').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        revealObserver.observe(el);
    });

    const heroImage = document.querySelector('.image-frame img, .portrait-wrapper img');
    if (heroImage) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
            heroImage.style.transform = `scale(1.05) translate(${mouseX}px, ${mouseY}px)`;
        });
    }

    const currentPath = window.location.pathname.split("/").pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    console.log("DOM Tree Status: " + document.nodeName);
});