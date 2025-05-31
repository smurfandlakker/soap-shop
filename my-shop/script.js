// Инициализация корзины
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция обновления счетчика корзины
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

// Функция добавления в корзину
function addToCart(productId, name, price, image) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Создаем и показываем уведомление
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${name} добавлен в корзину`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Обработчики для кнопок "В корзину" - делегирование событий
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productCard = e.target.closest('.product-card');
            if (!productCard) return;
            
            const productId = parseInt(productCard.dataset.id);
            const name = productCard.querySelector('h3').textContent;
            const priceText = productCard.querySelector('.product-price').textContent;
            const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
            const image = productCard.querySelector('img').src;
            
            addToCart(productId, name, price, image);
        }
    });
});

// Для страницы детализации товара
if (document.querySelector('.product-detail .add-to-cart')) {
    document.querySelector('.product-detail .add-to-cart').addEventListener('click', function() {
        const productId = parseInt(this.dataset.id);
        const name = document.querySelector('.product-detail h1').textContent;
        const priceText = document.querySelector('.product-detail .price').textContent;
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
        const image = document.querySelector('.product-detail .main-image').src;
        
        addToCart(productId, name, price, image);
    });
}
document.addEventListener('click', function(e) {
    console.log('Clicked element:', e.target);
    if (e.target.classList.contains('add-to-cart')) {
        console.log('Add to cart button clicked');
    }
});
/* Стили для уведомления */
.notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #6d6875;
    color: white;
    padding: 15px 30px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
    font-size: 16px;
    max-width: 80%;
    text-align: center;
    pointer-events: none;
}

.notification.show {
    opacity: 1;
    transform: translateX(-50%) translateY(-10px);
}

/* Анимация для иконки корзины */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-10px);}
    60% {transform: translateY(-5px);}
}

.cart-link:hover .cart-icon,
.add-to-cart-clicked {
    animation: bounce 0.8s;
}
