(function() {
    function getHeaderHeight() {
        const header = document.querySelector('.header');
        return header ? header.offsetHeight : 0;
    }
    
    function scrollToSectionHeader(element) {
        if (!element) return;
        const headerHeight = getHeaderHeight();
        const sectionHeader = element.querySelector('h2, h3');
        if (sectionHeader) {
            const headerPosition = sectionHeader.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: headerPosition - headerHeight - 20, behavior: 'smooth' });
        }
    }
    
    function scrollToHero() {
        const heroSection = document.querySelector('#hero');
        if (!heroSection) return;
        const headerHeight = getHeaderHeight();
        const heroPosition = heroSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: heroPosition - headerHeight - 10, behavior: 'smooth' });
    }
    
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function scrollToContacts(element) {
        if (!element) return;
        const footer = document.querySelector('.footer');
        const footerHeight = footer ? footer.offsetHeight : 0;
        const elementBottom = element.getBoundingClientRect().bottom + window.pageYOffset;
        const windowHeight = window.innerHeight;
        window.scrollTo({ top: elementBottom - windowHeight + footerHeight + 50, behavior: 'smooth' });
    }
    
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        const href = link.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        
        if (link.classList.contains('logo') && href === '#hero') {
            scrollToHero();
            return;
        }
        if (link.id === 'all-news-link' || link.classList.contains('news-link-compact')) {
            scrollToTop();
            return;
        }
        
        const targetElement = document.querySelector(href);
        if (!targetElement) return;
        href === '#contacts' ? scrollToContacts(targetElement) : scrollToSectionHeader(targetElement);
    });

    const directionBtn = document.querySelector('.btn-secondary');
    if (directionBtn) {
        directionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const directionsSection = document.querySelector('#directions');
            if (directionsSection) scrollToSectionHeader(directionsSection);
        });
    }
    
    if (window.location.hash) {
        setTimeout(function() {
            const element = document.querySelector(window.location.hash);
            if (!element) return;
            if (window.location.hash === '#contacts') scrollToContacts(element);
            else if (window.location.hash === '#hero') scrollToHero();
            else scrollToSectionHeader(element);
        }, 200);
    }
})();