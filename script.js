// Guard: диагностировать и предотвратить фатальную ошибку
if (typeof document.addEventListener !== 'function') {
  console.error('ERROR: document.addEventListener is not a function (was overwritten). Aborting DOM listeners.');
} else {
  // остальной существующий код со слушателями остаётся как есть
}

// Header Hide/Show on Scroll
let lastScrollTop = 0;
const header = document.getElementById('header');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    // Hide/show header based on scroll direction
    if (scrollTop < scrollThreshold) {
        header.style.transform = 'translateY(0)';
    } else if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav a, .mobile-nav-link, .mobile-nav-sub');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Desktop Dropdown Navigation
const navDropdown = document.querySelector('.nav-dropdown');
if (navDropdown) {
    const dropdownBtn = navDropdown.querySelector('.nav-dropdown-btn');
    const dropdownMenu = navDropdown.querySelector('.nav-dropdown-menu');
    
    dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!navDropdown.contains(e.target)) {
            navDropdown.classList.remove('active');
        }
    });
    
    // Close dropdown when clicking on a link
    dropdownMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navDropdown.classList.remove('active');
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = header.offsetHeight;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerHeight - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Here you would normally send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
        
        // Reset form
        contactForm.reset();
    });
}

// Appointment buttons
const appointmentButtons = document.querySelectorAll('.btn-primary');
appointmentButtons.forEach(button => {
    if (button.textContent.includes('Записаться')) {
        button.addEventListener('click', () => {
            window.location.replace('templates/appointment.html')
        });
    }
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, advantage cards, doctor cards, review cards, and blog cards
const animatedElements = document.querySelectorAll('.service-card, .advantage-card, .doctor-card, .review-card, .stat-box, .blog-card, .video-review-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Phone number formatting for Uzbekistan
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        // Format for Uzbekistan phone numbers
        if (value.length > 0) {
            let formatted = '+998';
            
            if (value.length > 3) {
                formatted += ' ' + value.substring(3, 5);
            }
            if (value.length >= 5) {
                formatted += ' ' + value.substring(5, 8);
            }
            if (value.length >= 8) {
                formatted += '-' + value.substring(8, 10);
            }
            if (value.length >= 10) {
                formatted += '-' + value.substring(10, 12);
            }
            
            e.target.value = formatted;
        }
    });
}

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a, .mobile-nav a, .nav-dropdown-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Service cards hover effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.borderColor = 'var(--primary)';
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.borderColor = 'var(--border)';
        card.style.transform = 'translateY(0)';
    });
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Initialize counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const hasPlus = element.textContent.includes('+');
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (hasPlus ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (hasPlus ? '+' : '');
        }
    }, 16);
};

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const text = entry.target.textContent;
            const target = parseInt(text.replace('+', ''));
            if (!isNaN(target)) {
                animateCounter(entry.target, target);
            }
        }
    });
}, { threshold: 0.5 });

const statNumbers = document.querySelectorAll('.stat-number, .stat-number-large');
statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Video review placeholder click
const videoPlaceholders = document.querySelectorAll('.video-placeholder');
videoPlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', () => {
        alert('Здесь будет воспроизведен видео-отзыв');
    });
});

// "Show All Reviews" button
const showAllReviewsBtn = document.querySelector('.reviews-footer .btn-outline');
if (showAllReviewsBtn && showAllReviewsBtn.textContent.includes('Показать все')) {
    showAllReviewsBtn.addEventListener('click', () => {
        window.location.replace('templates/feedback.html')
    });
}

// "Show All Blog Posts" button
const showAllBlogBtn = document.querySelector('.blog .section-footer .btn-outline');
if (showAllBlogBtn && showAllBlogBtn.textContent.includes('Все статьи')) {
    showAllBlogBtn.addEventListener('click', () => {
        window.location.replace('templates/blog.html')
    });
}

// Add transition to header
header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

// Logo fallback handling
const logoImg = document.querySelector('.logo-img');
const fallback = document.querySelector('.logo-fallback');
if (logoImg && fallback) {
    logoImg.addEventListener('error', () => {
        logoImg.style.display = 'none';
        fallback.style.display = 'flex';
    });
}

// Footer logo handling
const footerLogo = document.querySelector('.footer-logo');
if (footerLogo) {
    footerLogo.addEventListener('error', () => {
        footerLogo.style.display = 'none';
    });
}

console.log('Сайт клиники Visus загружен успешно!');

// ...existing code...
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');

  if (!mobileMenuBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenuBtn.classList.add('active');
    document.body.classList.add('no-scroll');
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  mobileMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });
  }

  // close by clicking backdrop (only when click target is the backdrop)
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  // close when a link is clicked — also allows navigation to work
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
      // NOTE: do not call preventDefault — allow navigation
    });
  });

  // close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });
});
// ...existing code...

// ...existing code...
document.addEventListener('DOMContentLoaded', function () {
  // --- Dropdown: открыть по клику и по наведению (если устройство поддерживает hover) ---
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  const canHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;

  document.querySelectorAll('.nav-dropdown').forEach(drop => {
    const btn = drop.querySelector('.nav-dropdown-btn');
    const menu = drop.querySelector('.nav-dropdown-menu');
    if (!btn || !menu) return;

    // aria
    const id = menu.id || ('navmenu-' + Math.random().toString(36).slice(2, 9));
    menu.id = id;
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-controls', id);
    btn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');

    let hoverTimer;

    function openDrop() {
      drop.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-hidden', 'false');
    }
    function closeDrop() {
      drop.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    }
    function toggleDrop() {
      if (drop.classList.contains('open')) closeDrop(); else openDrop();
    }

    // click toggles (works on touch and mouse)
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDrop();
    });

    // hover only when device supports hover (prevents accidental opens on touch)
    if (canHover && !isTouch) {
      drop.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(openDrop, 80);
      });
      drop.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(closeDrop, 120);
      });
    }

    // keyboard accessibility
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') return closeDrop();
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDrop();
        // focus first link
        const firstLink = menu.querySelector('a, button');
        if (firstLink) firstLink.focus();
      }
    });

    // close when focus moves outside dropdown
    drop.addEventListener('focusout', (e) => {
      // relatedTarget может быть null; закрываем с небольшой задержкой чтобы дать время фокус-перемещению
      setTimeout(() => {
        if (!drop.contains(document.activeElement)) closeDrop();
      }, 10);
    });

    // close on click outside
    document.addEventListener('click', (e) => {
      if (!drop.contains(e.target)) closeDrop();
    });
  });
});
// ...existing code...


// Breadcrumb generator (fills #siteBreadcrumb)
(function(){
  const el = document.getElementById('siteBreadcrumb');
  if (!el) return;

  // optional: укажите базовый путь публикации (например "/repo-name") через meta
  const baseMeta = document.querySelector('meta[name="site-base"]');
  const basePath = baseMeta ? baseMeta.getAttribute('content').replace(/\/$/, '') : '';

  // человекопонятные названия для сегментов
  const map = {
    '': 'Главная',
    'templates': '', // скрываем техническую папку
    'articles': 'Заболевания и лечение',
    'echinococcosis': 'Эхинококкоз и Альвеококкоз',
    'giardiasis': 'Гиардиаз (лямблиоз)',
    'rheumatoidArthritis': 'Ревматоидный артрит',
    'rheumatism': 'Ревматизм',
    'polyarthritis': 'Полиартрит',
    'feedback.html': 'Отзывы',
    'about.html': 'О клинике',
    'specialist.html': 'Специалисты',
    'blog.html': 'Блог',
    'appointment.html': 'Контакты',
    'price.html': 'Прайс-лист',
    'sitemap.html': 'Карта сайта'
  };

  // убираем query/hash и конечный слеш
  let path = location.pathname.replace(/\/$/, '');
  // убираем базовый путь если сайт опубликован в поддиректории
  if (basePath && path.indexOf(basePath) === 0) path = path.slice(basePath.length) || '/';
  const parts = path.split('/').filter(Boolean);

  // собрать массив крошек
  const crumbs = [];
  // первая — Главная (с учётом basePath)
  const homeHref = basePath || '/';
  crumbs.push({ name: map[''] || 'Главная', href: homeHref });

  let accum = basePath || '';
  parts.forEach((seg, idx) => {
    accum += '/' + seg;
    // если сег — файл (contains .html) используем его полностью, иначе пробуем маппинг
    const keyFile = seg;
    let title = map[keyFile] || map[seg] || prettifySegment(seg);
    // игнорировать технические сегменты (например 'templates')
    if (map[seg] === '') return;
    crumbs.push({ name: title, href: accum });
  });

  // отрисовка
  el.innerHTML = '';
  crumbs.forEach((c, i) => {
    const isLast = i === crumbs.length - 1;
    if (!isLast) {
      const a = document.createElement('a');
      a.href = c.href;
      a.textContent = c.name;
      el.appendChild(a);
      const sep = document.createElement('span');
      sep.className = 'sep';
      sep.textContent = '›';
      el.appendChild(sep);
    } else {
      const span = document.createElement('span');
      span.className = 'current';
      span.textContent = c.name;
      el.appendChild(span);
    }
  });

  // helper
  function prettifySegment(s){
    // убрать расширение .html
    s = s.replace(/\.html$/i, '');
    // заменить дефисы и подчёркивания
    s = s.replace(/[-_]/g, ' ');
    // camelCase -> words
    s = s.replace(/([a-z])([A-Z])/g, '$1 $2');
    // ucfirst
    s = s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return decodeURIComponent(s);
  }
})();

// ...existing code...
document.addEventListener('DOMContentLoaded', function () {
  const el = document.getElementById('siteBreadcrumb');
  if (!el) return;

  const baseMeta = document.querySelector('meta[name="site-base"]');
  const basePath = baseMeta ? baseMeta.getAttribute('content').replace(/\/$/, '') : '';
  const homeHref = basePath || '/';

  const map = {
    '': 'Главная',
    'templates': '', // скрываем техническую папку
    'articles': 'Заболевания и лечение',
    'echinococcosis': 'Эхинококкоз и Альвеококкоз',
    'giardiasis': 'Лямблиоз',
    'rheumatoidArthritis': 'Ревматоидный артрит',
    'rheumatoidArthritis.html': 'Ревматоидный артрит',
    'rheumatism': 'Ревматизм',
    'polyarthritis': 'Полиартрит',
    'feedback.html': 'Отзывы',
    'about.html': 'О клинике',
    'specialist.html': 'Специалисты',
    'blog.html': 'Блог',
    'appointment.html': 'Контакты',
    'price.html': 'Прайс-лист',
    'sitemap.html': 'Карта сайта'
  };

  // path без завершающего слеша
  let path = location.pathname.replace(/\/$/, '');
  if (basePath && path.indexOf(basePath) === 0) path = path.slice(basePath.length) || '/';
  const parts = path.split('/').filter(Boolean);

  const crumbs = [];
  crumbs.push({ name: map[''] || 'Главная', href: homeHref });

  let accum = basePath || '';
  parts.forEach((seg, idx) => {
    accum += '/' + seg;

    // пропускаем технические сегменты
    if (map[seg] === '') return;

    // если сег == 'articles' — показываем как "Заболевания и лечение" и ведём на главную (по просьбе)
    if (seg === 'articles') {
      crumbs.push({ name: map['articles'], href: homeHref });
      return;
    }

    // для файлов .html используем ключ с расширением, но показываем локализованное название если есть
    const key = seg;
    const title = map[key] || prettifySegment(seg);

    // Если это сегмент-страница (например файл статьи) и пользователь просил, чтобы и он вел на главную:
    // — если ключ присутствует в map и соответствует заболеванию, делаем href → homeHref
    const diseaseKeys = ['rheumatoidArthritis', 'rheumatoidArthritis.html', 'echinococcosis', 'giardiasis', 'rheumatism', 'polyarthritis'];
    if (diseaseKeys.includes(key)) {
      crumbs.push({ name: title, href: homeHref });
    } else {
      // стандартное поведение — ссылка на накопленный путь
      crumbs.push({ name: title, href: accum });
    }
  });

  // Рендер
  el.innerHTML = '';
  crumbs.forEach((c, i) => {
    const isLast = i === crumbs.length - 1;
    // если ссылка ведёт на главную (homeHref), отображаем как ссылку даже для последнего элемента (по просьбе)
    const makeLink = !isLast || c.href === homeHref;
    if (makeLink) {
      const a = document.createElement('a');
      a.href = c.href;
      a.textContent = c.name;
      el.appendChild(a);
      if (!isLast) {
        const sep = document.createElement('span');
        sep.className = 'sep';
        sep.textContent = '›';
        el.appendChild(sep);
      }
    } else {
      const span = document.createElement('span');
      span.className = 'current';
      span.textContent = c.name;
      el.appendChild(span);
    }
  });

  function prettifySegment(s) {
    s = s.replace(/\.html$/i, '');
    s = s.replace(/[-_]/g, ' ');
    s = s.replace(/([a-z])([A-Z])/g, '$1 $2');
    return decodeURIComponent(s.split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
  }
});
// ...existing code...
