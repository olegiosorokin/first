const button = document.getElementById('showCars');
const container = document.getElementById('carsContainer');
const cars = window.cars;

const orderModal = document.getElementById('orderModal');
const closeOrder = document.getElementById('closeOrder');
const modalTitle = document.getElementById('modalTitle');
const orderForm = document.getElementById('orderForm');

orderModal.classList.add('hidden');
orderModal.classList.remove('visible');

function showCars() {
    container.innerHTML = '';

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
    });

    container.classList.add('visible');

    const orderButtons = container.querySelectorAll('.orderButton');

    orderButtons.forEach(orderBtn => {
        orderBtn.addEventListener('click', () => {
            const carItem = orderBtn.closest('.car-item');
            const carName = carItem.querySelector('h3').innerText;

            modalTitle.innerText = `Заказать: ${carName}`;
            orderModal.classList.remove('hidden');
            orderModal.classList.add('visible');
        });
    });
}

button.addEventListener('click', showCars);

closeOrder.addEventListener('click', () => {
    orderModal.classList.remove('visible');
    orderModal.classList.add('hidden');
    orderForm.reset();
});

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^\+?\d{11,15}$/;

    if (name === '' || phone === '') {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    if (!phoneRegex.test(phone)) {
        alert('Введите корректный номер телефона.');
        return;
    }

    alert('Спасибо за ваш заказ. Менеджер перезвонит вам в течении 5 минут.');

    orderModal.classList.remove('visible');
    orderModal.classList.add('hidden');
    orderForm.reset();
});
