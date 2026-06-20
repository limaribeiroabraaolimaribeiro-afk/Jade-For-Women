// ========== NUMERO DO WHATSAPP ==========
// Troque aqui o numero do WhatsApp (com DDI + DDD, sem espacos ou caracteres especiais)
const WHATSAPP_NUMBER = '5511978723422';

const WHATSAPP_MESSAGE = encodeURIComponent('Olá, vim pelo site Jade For Women e quero saber mais sobre as peças');
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

function updateWhatsAppLinks() {
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        const isProductLink = link.id === 'modalWhatsappBtn';
        if (!isProductLink) {
            link.href = WHATSAPP_URL;
        }
    });
}

// ========== MENU LATERAL (MOBILE) ==========
const menuBtn = document.querySelector('.menu-btn');
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');
const closeMenuBtn = document.getElementById('closeMenuBtn');

function openMenu() {
    sideMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    sideMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (menuBtn) menuBtn.addEventListener('click', openMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

document.querySelectorAll('.side-menu-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ========== PESQUISA ==========
const searchBtns = document.querySelectorAll('.search-btn');
const searchOverlay = document.getElementById('searchOverlay');
const searchCloseBtn = document.getElementById('searchCloseBtn');
const searchInput = document.getElementById('searchInput');

searchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    });
});

if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
    });
}

// ========== MODAL PRODUTO ==========
const productModal = document.getElementById('productModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');

document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.product;
        const price = btn.dataset.price;
        const img = btn.dataset.img;
        const desc = btn.dataset.desc;

        modalImage.src = img;
        modalImage.alt = name;
        modalName.textContent = name;
        modalPrice.textContent = price;
        modalDesc.textContent = desc;

        const productMessage = encodeURIComponent(`Olá, vim pelo site Jade For Women e tenho interesse no produto: ${name} - ${price}`);
        modalWhatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${productMessage}`;

        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
if (productModal) {
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeModal();
    });
}

// ========== FAVORITOS ==========
document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
    });
});

// ========== MENU INFERIOR - ACTIVE STATE ==========
const bottomNavItems = document.querySelectorAll('.bottom-nav-item');

bottomNavItems.forEach(item => {
    item.addEventListener('click', () => {
        bottomNavItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// ========== DESKTOP NAV - ACTIVE STATE ==========
const desktopNavLinks = document.querySelectorAll('.header-desktop-nav a');

function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            desktopNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });

            bottomNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${id}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// ========== FECHAR COM ESC ==========
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
        closeModal();
        searchOverlay.classList.remove('active');
    }
});

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
    updateWhatsAppLinks();
});
