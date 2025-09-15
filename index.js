document.addEventListener('DOMContentLoaded', function() {
    // Data for services and portfolio
    const services = [
        'Ad Films & Commercials', '2D/3D Animation', 'Copywriting', 'Corporate Films',
        'Logo Design & Brand Identity', 'Events & Launch Films', 'Brand Stories', 'Photography',
        'Merchandise Design', 'Packaging Design', 'Post-Production', 'Motion Graphics',
        'Campaign Creative', 'Digital & Social Media', 'Performance Marketing', 'Influencer Management'
    ];

    const portfolioItems = [
        { category: 'film', img: 'https://placehold.co/600x400/1a1a1a/c026d3?text=Perfume+Ad', title: 'RIGGS London', type: 'Product Film' },
        { category: 'branding', img: 'https://placehold.co/600x400/1a1a1a/eab308?text=Logo+Design', title: 'SPICE RUSH', type: 'Brand Identity' },
        { category: 'digital', img: 'https://placehold.co/600x400/1a1a1a/22c55e?text=Social+Media', title: 'Zama Organics', type: 'Social Media Campaign' },
        { category: 'design', img: 'https://placehold.co/600x400/1a1a1a/4f46e5?text=Illustration', title: 'EGO', type: 'Digital Illustration' },
        { category: 'design', img: 'https://placehold.co/600x400/1a1a1a/be185d?text=Packaging', title: 'Zama Hamper', type: 'Packaging Design' },
        { category: 'film', img: 'https://placehold.co/600x400/1a1a1a/0ea5e9?text=Phone+Ad', title: 'Oppo Mobile', type: 'Commercial' },
    ];

    // Populate Services
    const servicesContainer = document.querySelector('#services .grid');
    services.forEach((service, index) => {
        const serviceEl = document.createElement('div');
        serviceEl.className = 'glass-card p-6 text-center scroll-reveal';
        serviceEl.style.transitionDelay = `${(index % 4) * 100}ms`;
        serviceEl.innerHTML = `<h3 class="font-semibold text-lg">${service}</h3>`;
        servicesContainer.appendChild(serviceEl);
    });

    // Populate Portfolio
    const portfolioGrid = document.getElementById('portfolio-grid');
    portfolioItems.forEach((item, index) => {
        const portfolioEl = document.createElement('div');
        portfolioEl.className = 'portfolio-item group overflow-hidden rounded-xl relative cursor-pointer scroll-reveal';
        portfolioEl.dataset.category = item.category;
        portfolioEl.style.transitionDelay = `${(index % 3) * 100}ms`;
        portfolioEl.innerHTML = `
            <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-white/70 dark:bg-black/70 backdrop-blur-sm flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">${item.title}</h3>
                <p class="text-gray-600 dark:text-gray-300">${item.type}</p>
            </div>
        `;
        portfolioGrid.appendChild(portfolioEl);
    });
    
    // Scroll reveal animation logic
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Initial check

    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioAllItems = document.querySelectorAll('.portfolio-item');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            portfolioAllItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Stat counter animation
    const counters = document.querySelectorAll('.stat-counter');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.dataset.target;
            const updateCount = () => {
                const count = +counter.innerText.replace(/,/g, '');
                const increment = target / 200;
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment).toLocaleString();
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCount();
        });
    };

    const statsSection = document.getElementById('reach');
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);

    // Header background on scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = document.documentElement.classList.contains('dark') ? 'rgba(17, 17, 17, 0.8)' : 'rgba(253, 253, 253, 0.8)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.backdropFilter = 'none';
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    const toggleMenu = () => {
        mobileMenu.classList.toggle('translate-x-full');
        document.body.classList.toggle('overflow-hidden');
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    
    // Style active filter button
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    filterButtons.forEach(button => {
        button.classList.add(
            'px-5', 'py-2', 'rounded-full', 'font-semibold', 'transition-all', 'duration-300', 'border', 'border-gray-300', 'dark:border-gray-700'
        );
        if (button.classList.contains('active')) {
            button.classList.add('bg-indigo-600', 'text-white', 'border-transparent');
        } else {
            button.classList.add('text-gray-600', 'dark:text-gray-400', 'hover:bg-gray-200', 'dark:hover:bg-gray-800', 'hover:border-gray-400', 'dark:hover:border-gray-600');
        }
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-indigo-600', 'text-white', 'border-transparent');
                btn.classList.add('text-gray-600', 'dark:text-gray-400', 'hover:bg-gray-200', 'dark:hover:bg-gray-800', 'hover:border-gray-400', 'dark:hover:border-gray-600');
            });
            e.target.classList.add('active', 'bg-indigo-600', 'text-white', 'border-transparent');
            e.target.classList.remove('text-gray-600', 'dark:text-gray-400', 'hover:bg-gray-200', 'dark:hover:bg-gray-800', 'hover:border-gray-400', 'dark:hover:border-gray-600');
        });
    });

    // Theme toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    if (document.documentElement.classList.contains('dark')) {
        themeToggleLightIcon.classList.remove('hidden');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', function() {
        themeToggleDarkIcon.classList.toggle('hidden');
        themeToggleLightIcon.classList.toggle('hidden');

        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }
        // update header color on toggle
        window.dispatchEvent(new Event('scroll'));
    });

});
