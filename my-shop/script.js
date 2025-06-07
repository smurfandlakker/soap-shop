// Функция показа уведомления
function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <span>${message}</span>
    `;
    
    // Добавляем на страницу
    document.body.appendChild(notification);
    
    // Показываем с анимацией
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Убираем через 3 секунды
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Обработчик добавления в корзину
function handleAddToCart(event) {
    const button = event.target.closest('.add-to-cart');
    if (!button) return;
    
    // Анимация кнопки
    button.classList.add('add-to-cart-clicked');
    setTimeout(() => {
        button.classList.remove('add-to-cart-clicked');
    }, 800);
    
    // Получаем данные товара
    const productData = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: parseFloat(button.dataset.price),
        image: data-image,
        quantity: 1
    };
    
    // Обновляем корзину в localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productData.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(productData);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Обновляем счетчик в шапке
    updateCartCount();
    
    // Показываем уведомление
    showNotification(`${productData.name} добавлен в корзину`);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Обработчик кликов по кнопкам "В корзину"
    document.addEventListener('click', handleAddToCart);
    
    // Инициализация корзины
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Обновляем счетчик
    updateCartCount();
});

// Функция обновления счетчика корзины
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
        
        // Анимация иконки корзины
        if (count > parseInt(el.textContent || 0)) {
            const cartIcon = el.closest('.cart-link').querySelector('.cart-icon');
            cartIcon.style.animation = 'none';
            void cartIcon.offsetWidth; // Trigger reflow
            cartIcon.style.animation = 'bounce 0.8s';
        }
    });
}
