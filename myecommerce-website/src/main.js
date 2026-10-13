import './style.css';
import { supabase } from './lib/supabase.js';

const products = [
  { name: 'Ankara', category: 'Fabrics', price: 6000, image: '/my_ankara.jpeg' },
  { name: 'Ankara2', category: 'Fabrics', price: 6000, image: '/my_ankara2.jpeg' },
  { name: 'Lace', category: 'Fabrics', price: 10000, image: '/my_lace.jpeg' },
  { name: 'Aso-oke', category: 'Fabrics', price: 14000, image: '/my_aso-oke.jpeg' },
  { name: 'Damask', category: 'Fabrics', price: 30000, image: '/my_damask.jpeg' },
  { name: 'High-target', category: 'Fabrics', price: 16000, image: '/my_high_target.jpeg' },
  { name: 'Jonkoso', category: 'Fabrics', price: 3000, image: '/my_jonkoso.jpeg' },
  { name: 'Scuba', category: 'Fabrics', price: 3000, image: '/my_scuba.jpeg' },
  { name: 'Crepe', category: 'Fabrics', price: 3000, image: '/my_crepe.jpeg' },
  { name: 'Vintage', category: 'Fabrics', price: 2000, image: '/my_vintage.jpeg' },
  { name: 'Button', category: 'Accessories', price: 2000, image: '/my_button.jpeg' },
  { name: 'Zipper', category: 'Accessories', price: 1000, image: '/my_zip.jpeg' },
  { name: 'Ribbon', category: 'Accessories', price: 1500, image: '/myribbon.jpeg' },
  { name: 'Trimming', category: 'Accessories', price: 2500, image: '/mytrimming.jpeg' },
  { name: 'Thread', category: 'Accessories', price: 1500, image: '/my_thread.jpeg' },
  { name: 'Cup-chain', category: 'Accessories', price: 6500, image: '/my_cup-chain.jpeg' },
];

let cartItems = [];
let currentSlide = 0;
let currentAuthMode = 'login';

function formatPrice(n) {
  return n.toLocaleString();
}

function updateCartCount() {
  const el = document.querySelector('#cart-count');
  if (el) {
    el.textContent = cartItems.length;
  }
}

function addToCart(index) {
  const product = products[index];
  if (!product) return;
  cartItems.push(product);
  updateCartCount();
}

function renderProducts(filter) {
  filter = filter || 'all';
  const grid = document.querySelector('#product-grid');
  const countLabel = document.querySelector('#product-count');
  if (!grid) return;

  const filtered =
    filter === 'all'
      ? products
      : products.filter((p) => p.category === filter);

  grid.innerHTML = filtered
    .map(
      (p, i) => `
    <div class="product-card" data-category="${p.category}">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" />
        <button class="heart" type="button">♡</button>
      </div>
      <div class="product-info">
        <small>${p.category}</small>
        <h3>${p.name}</h3>
        <div class="product-button">
          <span class="price">&#8358; ${formatPrice(p.price)}</span>
          <button class="add-btn" type="button" onclick="addToCart(${i})">Add to Cart</button>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  if (countLabel) {
    countLabel.textContent = `${filtered.length} products`;
  }
}

function filterProducts(category) {
  renderProducts(category);
}

function renderSlides() {
  const container = document.querySelector('.cart-slides');
  const indicators = document.querySelector('.cart-indicators');
  const emptyMsg = document.querySelector('.cart-empty');

  if (!container) return;

  if (cartItems.length === 0) {
    container.innerHTML = '';
    indicators.innerHTML = '';
    emptyMsg.style.display = 'flex';
    return;
  }

  emptyMsg.style.display = 'none';

  container.innerHTML = cartItems
    .map(
      (item, i) => `
    <div class="cart-slide ${i === 0 ? 'active' : ''}">
      <img src="${item.image}" alt="${item.name}" />
      <div class="slide-info">
        <h4>${item.name}</h4>
        <p class="slide-category">${item.category}</p>
        <p class="slide-price">&#8358; ${formatPrice(item.price)}</p>
      </div>
    </div>
  `
    )
    .join('');

  indicators.innerHTML = cartItems
    .map(
      (_, i) =>
        `<button type="button" class="indicator-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></button>`
    )
    .join('');

  currentSlide = 0;
}

function showSlide(index) {
  const slides = document.querySelectorAll('.cart-slide');
  const dots = document.querySelectorAll('.indicator-dot');
  if (slides.length === 0) return;

  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  slides.forEach((s, i) => {
    s.classList.toggle('active', i === index);
  });
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function goToSlide(index) {
  showSlide(index);
}

function openCart() {
  const modal = document.getElementById('cart-modal');
  if (!modal) return;
  renderSlides();
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const modal = document.getElementById('cart-modal');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function toggleNav() {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.classList.toggle('open');
  }
}

function openAuthModal(mode) {
  currentAuthMode = mode;
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  switchAuthMode(mode);
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
  clearAuthForms();
}

function switchAuthMode(mode) {
  currentAuthMode = mode;
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  if (mode === 'login') {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  }
  clearAuthErrors();
}

function clearAuthForms() {
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');
  const signupEmail = document.getElementById('signup-email');
  const signupPassword = document.getElementById('signup-password');
  const signupConfirm = document.getElementById('signup-confirm');
  
  if (loginEmail) loginEmail.value = '';
  if (loginPassword) loginPassword.value = '';
  if (signupEmail) signupEmail.value = '';
  if (signupPassword) signupPassword.value = '';
  if (signupConfirm) signupConfirm.value = '';
  
  clearAuthErrors();
}

function clearAuthErrors() {
  document.querySelectorAll('.auth-error').forEach(el => el.remove());
  document.querySelectorAll('input').forEach(el => el.classList.remove('error'));
}

function showAuthError(inputId, message) {
  const input = document.getElementById(inputId);
  if (input) {
    input.classList.add('error');
    const error = document.createElement('p');
    error.className = 'auth-error';
    error.style.color = '#e84f8a';
    error.style.fontSize = '12px';
    error.style.marginTop = '4px';
    error.textContent = message;
    input.parentNode.appendChild(error);
  }
}

async function handleLogin(event) {
  event.preventDefault();
  clearAuthErrors();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    showAuthError('login-email', 'Please fill in all fields');
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    showAuthError('login-password', error.message);
    return;
  }

  closeAuthModal();
  updateAuthUI();
}

async function handleSignup(event) {
  event.preventDefault();
  clearAuthErrors();

  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;

  if (!email || !password || !confirm) {
    showAuthError('signup-email', 'Please fill in all fields');
    return;
  }

  if (password !== confirm) {
    showAuthError('signup-confirm', 'Passwords do not match');
    return;
  }

  if (password.length < 6) {
    showAuthError('signup-password', 'Password must be at least 6 characters');
    return;
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    showAuthError('signup-email', error.message);
    return;
  }

  alert('Account created! Please check your email to confirm.');
  switchAuthMode('login');
}

async function signOut() {
  await supabase.auth.signOut();
  updateAuthUI();
}

function updateAuthUI() {
  const authButtons = document.querySelector('.auth-buttons');
  const userMenu = document.getElementById('user-menu');
  const userEmail = document.getElementById('user-email');

  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
      authButtons.style.display = 'none';
      userMenu.style.display = 'flex';
      userEmail.textContent = session.user.email;
    } else {
      authButtons.style.display = 'flex';
      userMenu.style.display = 'none';
    }
  });
}

supabase.auth.onAuthStateChange((_event, session) => {
  updateAuthUI();
});

window.filterProducts = filterProducts;
window.addToCart = addToCart;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
window.openCart = openCart;
window.closeCart = closeCart;
window.toggleNav = toggleNav;
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthMode = switchAuthMode;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.signOut = signOut;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
    updateAuthUI();
  });
} else {
  renderProducts();
  updateCartCount();
  updateAuthUI();
}