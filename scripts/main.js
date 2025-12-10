const button = document.getElementById('showCars'); 
// Находим кнопку "Посмотреть автомобили"
const container = document.getElementById('carsContainer'); 
// Контейнер для карточек
const cars = window.cars; 
// Массив с данными машин из cars-data.js

const orderModal = document.getElementById('orderModal'); 
// Модальное окно
const closeOrder = document.getElementById('closeOrder'); 
// Кнопка закрытия
const modalTitle = document.getElementById('modalTitle'); 
// Заголовок модального окна
const orderForm = document.getElementById('orderForm'); 
// Форма внутри модального окна

orderModal.classList.add('hidden'); 
// Скрываем окно при загрузке
orderModal.classList.remove('visible'); 
// Убираем видимость

function showCars() {
    container.innerHTML = ''; 
    // Очищаем контейнер перед добавлением

    cars.forEach(car => {
        const carElement = document.createElement('div'); 
        carElement.className = 'car-item'; 
        carElement.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <div class="car-detail">
                <ul>
                    <li class="car-top">
                        <h3>${car.name}</h3>
                        <p class="car-description">${car.description}</p>
                    </li>
                    <li class="car-bottom">
                        <p class="price">Цена: $${car.price} /день</p>
                        <button class="button orderButton">Заказать</button>
                    </li>
                </ul>
            </div>
        `;
        container.appendChild(carElement); 
        // Добавляем карточку в контейнер
    });

    container.classList.add('visible'); 
    // Показываем контейнер

    const orderButtons = container.querySelectorAll('.orderButton'); 
    // Находим все кнопки "Заказать" после создания карточек
    orderButtons.forEach(orderBtn => {
        orderBtn.addEventListener('click', () => {
            const carItem = orderBtn.closest('.car-item'); 
            const carName = carItem.querySelector('h3').innerText; 
            modalTitle.innerText = `Заказать: ${carName}`; 
            // Меняем заголовок модального окна

            orderModal.classList.remove('hidden'); 
            orderModal.classList.add('visible'); 
            // Показываем окно
        });
    });
}

button.addEventListener('click', showCars); 
// Навешиваем обработчик на кнопку "Посмотреть автомобили"

closeOrder.addEventListener('click', () => {
    orderModal.classList.remove('visible'); 
    orderModal.classList.add('hidden'); 
    orderForm.reset(); 
    // Закрытие окна и очистка формы
});

orderForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    // Отменяем стандартное действие формы

    const name = document.getElementById('name').value.trim(); 
    const phone = document.getElementById('phone').value.trim(); 
    const phoneRegex = /^\+?\d{11,15}$/; 
    // Простейшая проверка телефона: + и 11–15 цифр

    if(name === '' || phone === '') {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    if(!phoneRegex.test(phone)) {
        alert('Введите корректный номер телефона.');
        return;
    }

    alert('Спасибо за ваш заказ. Менеджер перезвонит вам в течении 5 минут.');
    orderModal.classList.remove('visible'); 
    orderModal.classList.add('hidden'); 
    orderForm.reset(); 
    // После успешного заказа окно закрывается и форма очищается
});
