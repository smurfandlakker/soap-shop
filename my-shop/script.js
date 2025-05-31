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
    alert('Товар добавлен в корзину');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Обработчики для кнопок "В корзину"
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.dataset.id);
            const name = productCard.querySelector('h3').textContent;
            const price = parseFloat(productCard.querySelector('.product-price').textContent);
            const image = productCard.querySelector('img').src;
            
            addToCart(productId, name, price, image);
        }
    });
});
