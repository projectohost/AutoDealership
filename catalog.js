// Дані автомобілів
const cars = [
    {
        id: 1,
        name: "BMW M5 Competition",
        category: "sedan",
        year: 2023,
        engine: "4.4L V8",
        power: "625 к.с.",
        transmission: "Автомат",
        price: "3 250 000 ₴",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop&auto=format"
    },
    {
        id: 2,
        name: "Mercedes-AMG G63",
        category: "suv",
        year: 2024,
        engine: "4.0L V8",
        power: "585 к.с.",
        transmission: "Автомат",
        price: "4 920 000 ₴",
        image: "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=400&h=250&fit=crop&auto=format"
    },
    {
        id: 3,
        name: "Porsche 911 Turbo S",
        category: "coupe",
        year: 2023,
        engine: "3.8L Twin-Turbo",
        power: "650 к.с.",
        transmission: "PDK",
        price: "5 750 000 ₴",
        image: "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=400&h=250&fit=crop&auto=format"
    },
    {
        id: 4,
        name: "Audi RS6 Avant",
        category: "hatchback",
        year: 2024,
        engine: "4.0L V8",
        power: "600 к.с.",
        transmission: "Tiptronic",
        price: "3 070 000 ₴",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop&auto=format"
    },
    {
        id: 5,
        name: "Mercedes-AMG S63",
        category: "sedan",
        year: 2023,
        engine: "4.0L V8",
        power: "630 к.с.",
        transmission: "Автомат",
        price: "4 220 000 ₴",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop&auto=format"
    },
    {
        id: 6,
        name: "Range Rover Sport SVR",
        category: "suv",
        year: 2024,
        engine: "5.0L V8",
        power: "575 к.с.",
        transmission: "Автомат",
        price: "3 570 000 ₴",
        image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=400&h=250&fit=crop&auto=format"
    },
    {
        id: 7,
        name: "Ferrari F8 Tributo",
        category: "coupe",
        year: 2023,
        engine: "3.9L V8",
        power: "720 к.с.",
        transmission: "F1",
        price: "7 420 000 ₴",
        image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400&h=250&fit=crop&auto=format"
    },
    {
        id: 8,
        name: "Audi RS3 Sportback",
        category: "hatchback",
        year: 2024,
        engine: "2.5L I5",
        power: "400 к.с.",
        transmission: "S tronic",
        price: "1 770 000 ₴",
        image: "https://images.unsplash.com/photo-1606016159991-7e5d0b68b9be?w=400&h=250&fit=crop&auto=format"
    },
    {
        id: 9,
        name: "Lamborghini Huracán",
        category: "coupe",
        year: 2024,
        engine: "5.2L V10",
        power: "640 к.с.",
        transmission: "Автомат",
        price: "6 890 000 ₴",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop&auto=format"
    },
    {
        id: 10,
        name: "Bentley Bentayga",
        category: "suv",
        year: 2023,
        engine: "4.0L V8",
        power: "550 к.с.",
        transmission: "Автомат",
        price: "5 120 000 ₴",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop&auto=format"
    }
];

let filteredCars = [...cars];

// Відображення карток автомобілів
function renderCars(carsToRender) {
    const grid = document.getElementById('carsGrid');
    
    if (carsToRender.length === 0) {
        grid.innerHTML = '<div class="loading">Автомобілі не знайдено</div>';
        return;
    }

    grid.innerHTML = carsToRender.map(car => `
        <div class="car-card" data-category="${car.category}">
            <div class="car-image">
                <img src="${car.image}" alt="${car.name}" 
                     style="width: 100%; height: 100%; object-fit: cover; border-radius: 0;"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; background: linear-gradient(45deg, #333, #555); font-size: 1.2rem; color: #999;">
                    <span>Зображення ${car.name}</span>
                </div>
            </div>
            <div class="car-info">
                <h3 class="car-name">${car.name}</h3>
                <div class="car-details">
                    <div class="detail">
                        <strong>Рік:</strong> ${car.year}
                    </div>
                    <div class="detail">
                        <strong>Двигун:</strong> ${car.engine}
                    </div>
                    <div class="detail">
                        <strong>Потужність:</strong> ${car.power}
                    </div>
                    <div class="detail">
                        <strong>КПП:</strong> ${car.transmission}
                    </div>
                </div>
                <div class="car-price">${car.price}</div>
                <div class="car-actions">
                    <button class="btn btn-primary" onclick="showDetails(${car.id})">
                        Детальніше
                    </button>
                    <button class="btn btn-secondary" onclick="addToFavorites(${car.id})">
                        В обране
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Фільтрація автомобілів
function filterCars(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = document.querySelector(`[data-category="${category}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    if (category === 'all') {
        filteredCars = [...cars];
    } else {
        filteredCars = cars.filter(car => car.category === category);
    }

    renderCars(filteredCars);
}

// Показати деталі автомобіля
function showDetails(carId) {
    const car = cars.find(c => c.id === carId);
    if (car) {
        alert(`Деталі автомобіля: ${car.name}\n\nРік: ${car.year}\nДвигун: ${car.engine}\nПотужність: ${car.power}\nКоробка передач: ${car.transmission}\n\nЦіна: ${car.price}\n\nДля отримання детальної інформації зв'яжіться з нашими менеджерами!\n\nТелефон: +380 (44) 123-45-67\nEmail: info@automax.ua`);
    }
}

// Додати в обране
function addToFavorites(carId) {
    const car = cars.find(c => c.id === carId);
    if (car) {
        // Перевірка чи вже є в localStorage
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        if (!favorites.some(fav => fav.id === carId)) {
            favorites.push(car);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert(`${car.name} додано в обране! ⭐\n\nВ обраному зараз: ${favorites.length} автомобілів`);
        } else {
            alert(`${car.name} вже знаходиться в обраному! 💖`);
        }
    }
}

// Пошук автомобілів
function searchCars(searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredCars = cars.filter(car => 
        car.name.toLowerCase().includes(term) ||
        car.engine.toLowerCase().includes(term) ||
        car.year.toString().includes(term)
    );
    renderCars(filteredCars);
}

// Сортування автомобілів
function sortCars(sortBy) {
    let sortedCars = [...filteredCars];
    
    switch(sortBy) {
        case 'price-low':
            sortedCars.sort((a, b) => parseFloat(a.price.replace(/[^\d]/g, '')) - parseFloat(b.price.replace(/[^\d]/g, '')));
            break;
        case 'price-high':
            sortedCars.sort((a, b) => parseFloat(b.price.replace(/[^\d]/g, '')) - parseFloat(a.price.replace(/[^\d]/g, '')));
            break;
        case 'year-new':
            sortedCars.sort((a, b) => b.year - a.year);
            break;
        case 'year-old':
            sortedCars.sort((a, b) => a.year - b.year);
            break;
        case 'power':
            sortedCars.sort((a, b) => parseFloat(b.power.replace(/[^\d]/g, '')) - parseFloat(a.power.replace(/[^\d]/g, '')));
            break;
        case 'name':
            sortedCars.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    renderCars(sortedCars);
}

// Обробники подій
document.addEventListener('DOMContentLoaded', function() {
    // Ініціалізація каталогу
    setTimeout(() => {
        renderCars(cars);
        updateStats();
    }, 1000);

    // Фільтри
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterCars(category);
            updateStats();
        });
    });
});

// Оновлення статистики
function updateStats() {
    const totalCars = filteredCars.length;
    const avgPrice = filteredCars.reduce((sum, car) => 
        sum + parseFloat(car.price.replace(/[^\d]/g, '')), 0) / totalCars;
    
    console.log(`📊 Статистика каталогу:
    🚗 Показано автомобілів: ${totalCars}
    💰 Середня ціна: ${Math.round(avgPrice).toLocaleString()} ₴
    🏆 Найдорожчий: ${filteredCars.reduce((max, car) => 
        parseFloat(car.price.replace(/[^\d]/g, '')) > parseFloat(max.price.replace(/[^\d]/g, '')) ? car : max
    ).name}
    💎 Найпотужніший: ${filteredCars.reduce((max, car) => 
        parseFloat(car.power.replace(/[^\d]/g, '')) > parseFloat(max.power.replace(/[^\d]/g, '')) ? car : max
    ).name}`);
}

// Анімація появи карток
function animateCards() {
    const cards = document.querySelectorAll('.car-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Запуск анімації після рендера
const originalRenderCars = renderCars;
renderCars = function(carsToRender) {
    originalRenderCars(carsToRender);
    setTimeout(animateCards, 100);
};

// Функція завантаження більше автомобілів (для майбутнього розширення)
function loadMoreCars() {
    // Тут можна додати логіку завантаження з сервера
    console.log('🔄 Завантаження додаткових автомобілів...');
}

// Експорт обраних автомобілів
function exportFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.length === 0) {
        alert('📝 Список обраних автомобілів порожній!');
        return;
    }
    
    const exportData = {
        export_date: new Date().toLocaleDateString('uk-UA'),
        total_cars: favorites.length,
        cars: favorites
    };
    
    console.log('📋 Експорт обраних автомобілів:', exportData);
    alert(`✅ Експортовано ${favorites.length} автомобілів!\nПеревірте консоль для деталей.`);
}