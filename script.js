document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#86fc79"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#86fc79",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    const copyButton = document.getElementById('copy-ip');
    const serverIp = document.getElementById('server-ip');
    
    if (copyButton && serverIp) {
        copyButton.addEventListener('click', function() {
            serverIp.select();
            serverIp.setSelectionRange(0, 99999);
            document.execCommand('copy');
            
            const originalText = copyButton.innerHTML;
            copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
            
            setTimeout(() => {
                copyButton.innerHTML = originalText;
            }, 2000);
        });
    }
    
    function triggerLightning() {
        const lightning = document.querySelector('.lightning');
        lightning.style.opacity = '0.2';
        lightning.style.background = 'white';
        
        setTimeout(() => {
            lightning.style.opacity = '0';
        }, 100);
    }
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            triggerLightning();
        }
    }, 10000 + Math.random() * 20000);

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .rule, .step');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    document.querySelectorAll('.feature-card, .rule, .step').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    async function updatePlayerCount() {
        const playerCountElement = document.getElementById('playerCount');
        const statusIndicator = document.querySelector('.server-status');
        
        const endpoints = [
            'https://api.winniepat.de/api/v1/status/hglabor.de'
        ];
    
        let data;
        let success = false;
    
        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (!response.ok) throw new Error('Bad response');
                
                data = await response.json();
                success = true;
                break;
            } catch (error) {
                console.log(`Failed with ${endpoint}, trying next...`);
            }
        }
    
        if (!success) {
            playerCountElement.textContent = '?';
            if (statusIndicator) {
                statusIndicator.className = 'server-status error';
                statusIndicator.title = 'Connection Error';
            }
            return;
        }
    
        if (data.online) {
            animateCount(playerCountElement, data.players);
            if (statusIndicator) {
                statusIndicator.className = 'server-status online';
                statusIndicator.title = 'Server Online';
            }
        } else {
            playerCountElement.textContent = '0';
            if (statusIndicator) {
                statusIndicator.className = 'server-status offline';
                statusIndicator.title = 'Server Offline';
            }
        }
    }
    
    function animateCount(element, targetCount) {
        let currentCount = parseInt(element.textContent) || 0;
        if (currentCount === targetCount) return;
    
        const increment = targetCount > currentCount ? 1 : -1;
        const interval = setInterval(() => {
            currentCount += increment;
            element.textContent = currentCount;
            element.classList.add('pulse-count');
            
            setTimeout(() => {
                element.classList.remove('pulse-count');
            }, 300);
    
            if ((increment === 1 && currentCount >= targetCount) || 
                (increment === -1 && currentCount <= targetCount)) {
                clearInterval(interval);
                element.textContent = targetCount;
            }
        }, 50);
    }
    
    updatePlayerCount();
    setInterval(updatePlayerCount, 30000);
    
    updatePlayerCount();
    setInterval(updatePlayerCount, 30000);
    
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
});