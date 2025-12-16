// Данные о товарах
const products = [
    {
        id: 1,
        name: "Кожаная куртка",
        category: "tops",
        price: 4500,
        image: "images/kozkurtka.jpg",
        description: "Стильная кожаная куртка"
    },
    {
        id: 2,
        name: "Джинсы классические",
        category: "bottoms",
        price: 3200,
        image: "images/djins.png",
        description: "Классические синие джинсы"
    },
    {
        id: 3,
        name: "Летнее платье",
        category: "dresses",
        price: 2800,
        image: "images/plate.png",
        description: "Легкое летнее платье"
    },
    {
        id: 4,
        name: "Шерстяной свитер",
        category: "tops",
        price: 2200,
        image: "images/4.jpg",
        description: "Теплый шерстяной свитер"
    },
    {
        id: 5,
        name: "Юбка-карандаш",
        category: "bottoms",
        price: 1900,
        image: "images/5.png",
        description: "Элегантная юбка-карандаш"
    },
    {
        id: 6,
        name: "Кожаный ремень",
        category: "accessories",
        price: 1200,
        image: "images/6.png",
        description: "Качественный кожаный ремень"
    },

];

// Данные для таблицы размеров
const sizeData = [
    { type: "Футболки", size: "S", chest: 86, waist: 70, hips: 90, length: 66, height: "160-170" },
    { type: "Футболки", size: "M", chest: 92, waist: 76, hips: 96, length: 68, height: "170-175" },
    { type: "Футболки", size: "L", chest: 98, waist: 82, hips: 102, length: 70, height: "175-180" },
    { type: "Футболки", size: "XL", chest: 104, waist: 88, hips: 108, length: 72, height: "180-185" },
    { type: "Джинсы", size: "S", chest: 88, waist: 72, hips: 92, length: 102, height: "160-170" },
    { type: "Джинсы", size: "M", chest: 94, waist: 78, hips: 98, length: 104, height: "170-175" },
    { type: "Джинсы", size: "L", chest: 100, waist: 84, hips: 104, length: 106, height: "175-180" },
    { type: "Джинсы", size: "XL", chest: 106, waist: 90, hips: 110, length: 108, height: "180-185" },
    { type: "Платья", size: "S", chest: 84, waist: 68, hips: 88, length: 90, height: "160-170" },
    { type: "Платья", size: "M", chest: 90, waist: 74, hips: 94, length: 92, height: "170-175" },
    { type: "Платья", size: "L", chest: 96, waist: 80, hips: 100, length: 94, height: "175-180" },
    { type: "Платья", size: "XL", chest: 102, waist: 86, hips: 106, length: 96, height: "180-185" }
];

// Переменные для состояния приложения
let cartCount = 0;
let selectedCategory = "all";
let maxPrice = 5000;
let selectedTableRow = null;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация элементов
    initProducts();
    initTable();
    initFilters();
    initEventListeners();
});

// Инициализация каталога товаров
function initProducts() {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = '';
    
    // Фильтрация товаров
    const filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
        const priceMatch = product.price <= maxPrice;
        return categoryMatch && priceMatch;
    });
    
    // Отображение товаров
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price} руб.</div>
                <button class="add-to-cart" data-id="${product.id}">В корзину</button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Инициализация таблицы размеров
function initTable() {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '';
    
    sizeData.forEach((row, index) => {
        const tableRow = document.createElement('tr');
        tableRow.dataset.index = index;
        tableRow.innerHTML = `
            <td>${row.type}</td>
            <td>${row.size}</td>
            <td>${row.chest}</td>
            <td>${row.waist}</td>
            <td>${row.hips}</td>
            <td>${row.length}</td>
            <td>${row.height}</td>
        `;
        tableBody.appendChild(tableRow);
    });
}

// Инициализация фильтров
function initFilters() {
    const categoryFilter = document.getElementById('category');
    const priceFilter = document.getElementById('price');
    const priceValue = document.getElementById('price-value');
    const resetButton = document.getElementById('reset-filters');
    
    // Установка начальных значений
    categoryFilter.value = selectedCategory;
    priceFilter.value = maxPrice;
    priceValue.textContent = `${maxPrice} руб.`;
    
    // Обработчики событий для фильтров
    categoryFilter.addEventListener('change', function() {
        selectedCategory = this.value;
        initProducts();
    });
    
    priceFilter.addEventListener('input', function() {
        maxPrice = parseInt(this.value);
        priceValue.textContent = `${maxPrice} руб.`;
        initProducts();
    });
    
    resetButton.addEventListener('click', function() {
        selectedCategory = "all";
        maxPrice = 5000;
        categoryFilter.value = selectedCategory;
        priceFilter.value = maxPrice;
        priceValue.textContent = `${maxPrice} руб.`;
        initProducts();
    });
}

// Инициализация обработчиков событий
function initEventListeners() {
    // Добавление товаров в корзину
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            addToCart(e.target.dataset.id);
        }
    });
    
    // Обработка формы обратной связи
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получение данных формы
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // В реальном приложении здесь был бы AJAX-запрос к серверу
        alert(`Спасибо, ${name}! Ваше сообщение отправлено. Мы свяжемся с вами по адресу ${email} в ближайшее время.`);
        
        // Сброс формы
        this.reset();
    });
    
    // Обработка таблицы размеров
    const tableBody = document.querySelector('table tbody');
    tableBody.addEventListener('mouseover', function(e) {
        const row = e.target.closest('tr');
        if (row && row !== selectedTableRow) {
            row.classList.add('highlighted');
        }
    });
    
    tableBody.addEventListener('mouseout', function(e) {
        const row = e.target.closest('tr');
        if (row && row !== selectedTableRow) {
            row.classList.remove('highlighted');
        }
    });
    
    tableBody.addEventListener('click', function(e) {
        const row = e.target.closest('tr');
        if (row) {
            // Снимаем выделение с предыдущей выбранной строки
            if (selectedTableRow) {
                selectedTableRow.classList.remove('selected');
            }
            
            // Выделяем новую строку
            row.classList.add('selected');
            selectedTableRow = row;
            
            // Показываем информацию о выбранном размере
            const size = row.cells[1].textContent;
            const type = row.cells[0].textContent;
            showNotification(`Выбран размер ${size} для ${type}`);
        }
    });
    
    // Кнопки управления таблицей
    document.getElementById('highlight-large').addEventListener('click', function() {
        const rows = document.querySelectorAll('table tbody tr');
        rows.forEach(row => {
            const size = row.cells[1].textContent;
            if (size === 'XL' || size === 'L') {
                row.classList.add('highlighted');
            }
        });
        showNotification('Выделены большие размеры (L и XL)');
    });
    
    document.getElementById('reset-highlight').addEventListener('click', function() {
        const rows = document.querySelectorAll('table tbody tr');
        rows.forEach(row => {
            row.classList.remove('highlighted');
            if (row !== selectedTableRow) {
                row.classList.remove('selected');
            }
        });
        showNotification('Выделение сброшено');
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Добавление товара в корзину
function addToCart(productId) {
    cartCount++;
    updateCartCount();
    
    // Находим добавленный товар
    const product = products.find(p => p.id == productId);
    
    // Показываем уведомление
    showNotification(`"${product.name}" добавлен в корзину`);
    
    // Анимация кнопки
    const addButton = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
    addButton.textContent = "Добавлено!";
    addButton.style.backgroundColor = "#27ae60";
    
    setTimeout(() => {
        addButton.textContent = "В корзину";
        addButton.style.backgroundColor = "#2ecc71";
    }, 1500);
}

// Обновление счетчика корзины
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cartCount;
    cartCountElement.style.transform = 'scale(1.2)';
    
    setTimeout(() => {
        cartCountElement.style.transform = 'scale(1)';
    }, 300);
}

// Показать уведомление
function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        font-weight: 600;
        transform: translateX(150%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Удаление уведомления через 3 секунды
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Получение имени категории по ключу
function getCategoryName(categoryKey) {
    const categories = {
        "tops": "Верхняя одежда",
        "bottoms": "Штаны и юбки",
        "dresses": "Платья",
        "accessories": "Аксессуары"
    };
    return categories[categoryKey] || "Другое";
}