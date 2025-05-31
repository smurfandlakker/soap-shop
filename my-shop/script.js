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
