* ABooks Production Script
 * Manages Catalog, Cart State, and UI Interactions
 */

// 1. DATABASE (Normally this would come from an API)
const PRODUCT_CATALOG = [
    {
        id: 'p1',
        name: 'Science Class 10 NCERT',
        price: 195.00,
        category: 'Middle/Senior',
        img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=200',
        color: 'blue'
    },
    {
        id: 'p2',
        name: 'Mathematics RD Sharma X',
        price: 540.00,
        category: 'Senior Secondary',
        img: 'https://images.unsplash.com/photo-1543004271-991f3355478b?auto=format&fit=crop&q=80&w=200',
        color: 'purple'
    },
    {
        id: 'p3',
        name: 'Oxford Mini Dictionary',
        price: 320.00,
        category: 'Essential',
        img: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=200',
        color: 'orange'
    },
    {
        id: 'p4',
        name: 'Apsara Stationery Kit',
        price: 150.00,
        category: 'Stationery',
        img: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=200',
        color: 'emerald'
    }
];

// 2. STATE MANAGEMENT
let cart = [];

// 3. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderProducts();
    updateCartDisplay();
});

// 4. RENDER CATALOG
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = PRODUCT_CATALOG.map(product => `
        <div class="product-card group">
            <div class="product-image-container">
                <img src="${product.img}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute top-4 left-4">
                    <span class="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-500 shadow-sm">
                        ${product.category}
                    </span>
                </div>
            </div>
            <h3 class="font-bold text-slate-800 mb-1 leading-tight">${product.name}</h3>
            <div class="flex items-center justify-between mt-4">
                <div class="flex flex-col">
                    <span class="text-xs text-slate-400 font-bold uppercase">Price</span>
                    <span class="text-xl font-black text-blue-900">₹${product.price.toFixed(2)}</span>
                </div>
                <button onclick="addToCart('${product.id}')" 
                    class="bg-slate-900 text-white p-4 rounded-2xl hover:bg-blue-600 transition-all active:scale-90 shadow-lg shadow-slate-200">
                    <i data-lucide="plus" class="w-5 h-5"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// 5. CART ACTIONS
function toggleCart(isOpen) {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    if (isOpen) {
        sidebar.classList.add('open');
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.style.opacity = "1", 10);
    } else {
        sidebar.classList.remove('open');
        overlay.style.opacity = "0";
        setTimeout(() => overlay.classList.add('hidden'), 300);
    }
}

function addToCart(productId) {
    const product = PRODUCT_CATALOG.find(p => p.id === productId);
    if (!product) return;

    // Add to cart array
    cart.push({ ...product, cartId: Date.now() });
    
    // UI Feedback
    updateCartDisplay();
    animateCartButton();
    toggleCart(true);
}

function removeFromCart(cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    updateCartDisplay();
}

// 6. UI UPDATES
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total-price');
    const cartStatus = document.getElementById('cart-status');

    // Update count labels
    cartCount.innerText = cart.length;
    cartStatus.innerText = `${cart.length} item${cart.length !== 1 ? 's' : ''} selected`;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div class="bg-slate-50 p-6 rounded-full text-slate-300">
                    <i data-lucide="shopping-cart" class="w-12 h-12"></i>
                </div>
                <p class="font-bold text-slate-400">Your bag is empty.<br>Start adding books!</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="flex gap-4 items-center bg-white p-4 rounded-2xl border border-slate-50 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
                <div class="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img src="${item.img}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <h4 class="font-bold text-sm text-slate-800 leading-tight">${item.name}</h4>
                    <p class="text-blue-600 font-black mt-1">₹${item.price.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${item.cartId})" class="p-2 text-slate-300 hover:text-red-500 transition-colors">
                    <i data-lucide="trash-2" class="w-5 h-5"></i>
                </button>
            </div>
        `).join('');
    }

    // Update Totals
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    subtotalEl.innerText = `₹${total.toFixed(2)}`;
    totalEl.innerText = `₹${total.toFixed(2)}`;
    
    lucide.createIcons();
}

function animateCartButton() {
    const btn = document.querySelector('nav button');
    btn.classList.add('cart-pop');
    setTimeout(() => btn.classList.remove('cart-pop'), 300);
}