// Kairos Natural Market - JavaScript para animaciones suaves
document.addEventListener('DOMContentLoaded', function() {
    
    // Configuración de animaciones
    const animationConfig = {
        duration: 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        delay: 100
    };

    // Función para animar elementos al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.main-content > *');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * animationConfig.delay);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity ${animationConfig.duration}ms ${animationConfig.easing}, transform ${animationConfig.duration}ms ${animationConfig.easing}`;
            observer.observe(element);
        });
    }

    // Animación suave del logo al cargar
    function animateLogo() {
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.style.transform = 'scale(0.8)';
            logo.style.opacity = '0';
            
            setTimeout(() => {
                logo.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s ease';
                logo.style.transform = 'scale(1)';
                logo.style.opacity = '1';
            }, 200);
        }
    }

    // Efecto parallax suave para elementos de fondo
    function initParallaxEffect() {
        const backgroundElements = document.querySelectorAll('.leaf, .flower');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            backgroundElements.forEach((element, index) => {
                const speed = 0.1 + (index * 0.05);
                element.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }

    // Animación de escritura para el texto principal
    function typeWriterEffect() {
        const title = document.querySelector('.main-title');
        const subtitle = document.querySelector('.subtitle');
        
        if (title && subtitle) {
            const titleText = title.textContent;
            const subtitleText = subtitle.textContent;
            
            title.textContent = '';
            subtitle.textContent = '';
            
            let titleIndex = 0;
            let subtitleIndex = 0;
            
            function typeTitle() {
                if (titleIndex < titleText.length) {
                    title.textContent += titleText.charAt(titleIndex);
                    titleIndex++;
                    setTimeout(typeTitle, 100);
                } else {
                    setTimeout(typeSubtitle, 500);
                }
            }
            
            function typeSubtitle() {
                if (subtitleIndex < subtitleText.length) {
                    subtitle.textContent += subtitleText.charAt(subtitleIndex);
                    subtitleIndex++;
                    setTimeout(typeSubtitle, 50);
                }
            }
            
            setTimeout(typeTitle, 1000);
        }
    }

    // Efecto de hover mejorado para el logo
    function enhanceLogoHover() {
        const logo = document.querySelector('.logo');
        
        if (logo) {
            logo.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) rotate(2deg)';
                this.style.boxShadow = '0 15px 40px rgba(76, 88, 60, 0.3)';
            });
            
            logo.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.boxShadow = '0 10px 30px rgba(76, 88, 60, 0.1)';
            });
        }
    }

    // Animación de partículas flotantes
    function createFloatingParticles() {
        const container = document.querySelector('.container');
        const particleCount = 8;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: ${i % 2 === 0 ? '#4C583C' : '#E67C30'};
                border-radius: 50%;
                opacity: 0.3;
                pointer-events: none;
                z-index: 1;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${8 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            container.appendChild(particle);
        }
        
        // Agregar keyframes para las partículas
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translateY(0px) translateX(0px);
                    opacity: 0.3;
                }
                25% {
                    transform: translateY(-20px) translateX(10px);
                    opacity: 0.6;
                }
                50% {
                    transform: translateY(-10px) translateX(-5px);
                    opacity: 0.4;
                }
                75% {
                    transform: translateY(-30px) translateX(15px);
                    opacity: 0.5;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Efecto de carga progresiva
    function progressiveLoad() {
        const elements = [
            '.logo-container',
            '.text-content',
            '.progress-container',
            '.decorative-elements'
        ];
        
        elements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 300);
            }
        });
    }

    // Verificar si el usuario prefiere animaciones reducidas
    function checkReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Desactivar animaciones complejas
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            return false;
        }
        return true;
    }



    // Smooth scroll para navegación interna
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Mejorar accesibilidad con navegación por teclado
    function enhanceKeyboardNavigation() {
        const focusableElements = document.querySelectorAll(
            'button, input, a, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(element => {
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (this.tagName === 'BUTTON' || this.tagName === 'A') {
                        e.preventDefault();
                        this.click();
                    }
                }
            });
        });
    }

    // Inicializar todas las animaciones
    function initAnimations() {
        const shouldAnimate = checkReducedMotion();
        
        if (shouldAnimate) {
            // Animaciones suaves
            animateLogo();
            enhanceLogoHover();
            initParallaxEffect();
            
            // Solo crear partículas en pantallas grandes
            if (window.innerWidth > 768) {
                createFloatingParticles();
            }
            
            // Carga progresiva
            progressiveLoad();
        } else {
            // Carga simple sin animaciones
            const elements = document.querySelectorAll('.main-content > *');
            elements.forEach(element => {
                element.style.opacity = '1';
                element.style.transform = 'none';
            });
        }
    }

    // Manejar redimensionamiento de ventana
    function handleResize() {
        // Recalcular posiciones de elementos flotantes si es necesario
        const particles = document.querySelectorAll('.floating-particle');
        particles.forEach(particle => {
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
        });
    }

    // Event listeners
    window.addEventListener('resize', handleResize);
    
    // Inicializar cuando el DOM esté listo
    initAnimations();
    initSmoothScroll();
    enhanceKeyboardNavigation();
    
    // Mensaje de consola para desarrolladores
    console.log('🌿 KairosMarket - Kairos Natural Market - Página en construcción');
    console.log('✨ Animaciones suaves activadas');
    console.log('💻 Desarrollado por WebXpert - Julio Pintos');
    console.log('🌐 www.webxpert.com.ar');
});

// Función para agregar efectos de sonido suaves (opcional)
function addSoundEffects() {
    // Solo si el usuario interactúa primero
    document.addEventListener('click', function() {
        // Aquí se podrían agregar efectos de sonido sutiles
        // Por ejemplo, un sonido suave al hacer clic en el logo
    }, { once: true });
}

// Exportar funciones para uso externo si es necesario
window.KairosAnimations = {
    initAnimations: function() {
        // Función pública para reinicializar animaciones
        document.dispatchEvent(new Event('DOMContentLoaded'));
    }
};
