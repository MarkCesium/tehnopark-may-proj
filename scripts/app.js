// переменные

let consumption = 0;
let monthChart = null;
let tempChart = null;
let humidityChart = null;
let CO2Chart = null;
let xData = [];
let yData = [];
const url = "https://api.openweathermap.org/data/2.5/weather?";
const API_TOKEN = '0781833fd68d23421d38a0cd0c2d0264';
let params = {
	q: 'Минск',
	appid: API_TOKEN,
	lang: 'ru',
	units: 'metric'
};

let mainCards = [
	{
		img_src: '../img/rooms/kitchen-icon.png',
		room: 'Кухня',
		consumption: 0,
		security: true
	},
	{
		img_src: '../img/rooms/babyroom-icon.png',
		room: 'Детская',
		consumption: 0,
		security: true
	},
	{
		img_src: '../img/rooms/lounge-icon.png',
		room: 'Гостинная',
		consumption: 0,
		security: true
	},
	{
		img_src: '../img/rooms/bedroom-icon.png',
		room: 'Спальная',
		consumption: 0,
		security: true
	},
	{
		img_src: '../img/rooms/workroom-icon.png',
		room: 'Кабинет',
		consumption: 0,
		security: true
	},
	{
		img_src: '../img/rooms/bathroom-icon.png',
		room: 'Ванная',
		consumption: 0,
		security: false
	},
];

let devices = [{
	img_src: '../img/devices/lamp.png',
	name: 'Xiaomi SmartLamp',
	description: 'Умная лампа, детская',
	state: true,
	consumption: 8,
	room: 'Детская',
},
{
	img_src: '../img/devices/tv.avif',
	name: 'Samsung TV NU7400',
	description: 'Телевизор, гостинная',
	state: true,
	consumption: 105,
	room: 'Гостинная',
},
{
	img_src: '../img/devices/kitchen-tv.png',
	name: 'LG 24 Inch Class HD',
	description: 'Телевизор, кухня',
	state: false,
	consumption: 35,
	room: 'Кухня',
},
{
	img_src: '../img/devices/pc.png',
	name: 'Dell 3H-CGI',
	description: 'Рабочий компьютер, кабинет',
	state: true,
	consumption: 175,
	room: 'Кабинет',
},
{
	img_src: '../img/devices/fridge.png',
	name: 'LG Refrigerator',
	description: 'Холодильник, кухня',
	state: true,
	consumption: 275,
	room: 'Кухня',
},
{
	img_src: '../img/devices/iron.png',
	name: 'oliso SmartIron',
	description: 'Утюг, гостинная',
	state: false,
	consumption: 1100,
	room: 'Гостинная',
},
{
	img_src: '../img/devices/teapot.png',
	name: 'Kettle Electric 1.2l',
	description: 'Чайник, кухня',
	state: false,
	consumption: 1800,
	room: 'Кухня',
},
{
	img_src: '../img/devices/table-lamp.png',
	name: 'Roshni & Light Table Lamp',
	description: 'Настольная лампа, кабинет',
	state: false,
	consumption: 23,
	room: 'Кабинет',
},
{
	img_src: '../img/devices/microwave.png',
	name: 'Samsung 32L Smart Oven Microwave',
	description: 'Микроволновка, кухня',
	state: false,
	consumption: 1000,
	room: 'Кухня',
},
{
	img_src: '../img/devices/smart-speaker.png',
	name: 'Xiaomi Smart Speaker IR',
	description: 'Умная колонка, спальная',
	state: true,
	consumption: 12,
	room: 'Спальная',
},
{
	img_src: '../img/devices/towel-rail.png',
	name: 'Smart Towel Warmer',
	description: 'Полотенцесушитель, ванная',
	state: true,
	consumption: 300,
	room: 'Ванная',
},
{
	img_src: '../img/devices/dendy.png',
	name: 'Dendy Junior',
	description: 'Игровая приставка, детская',
	state: true,
	consumption: 4,
	room: 'Детская',
},
];


// вспомогательные функции

function activePage(id) {
	switch (id) {
		case 'main-btn':
			$(`#${id}`).addClass('active');
			$('#live-btn').removeClass('active');
			$('#devices-btn').removeClass('active');
			break;
		case 'live-btn':
			getCards(devices);
			$(`#${id}`).addClass('active');
			$('#main-btn').removeClass('active');
			$('#devices-btn').removeClass('active');
			break;
		case 'devices-btn':
			$(`#${id}`).addClass('active');
			$('#live-btn').removeClass('active');
			$('#main-btn').removeClass('active')
			break;
	};

};

$('#mode').click(function () {
	$(this).toggleClass('active');
	$('body').toggleClass('dark');
	$('nav').toggleClass('dark');
	$('footer').toggleClass('dark');
	$('.card').toggleClass('dark');
	$('.form-check-input').toggleClass('dark');
	$('.btn-outline-primary').toggleClass('dark');
	$('.reload').toggleClass('dark');
	if ($(this).hasClass('active')) {
		$('.navbar-brand img').attr('src', '../img/заяц.png');
	} else {
		$('.navbar-brand img').attr('src', '../img/logo (2).png');
	};
});

$('.nav-link').hover(function () { $(this).removeClass('text-muted') }, function () { $(this).addClass('text-muted') })


// Главная страница

function drawWeather() {
	fetch(url + new URLSearchParams(params)).then(function (resp) { return resp.json() }) // Convert to json
		.then(function (data) {
			let celcius = Math.round(data.main.temp);
			date = new Date();

			let datetime = (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
			$('#date').html(datetime);
			$('#description').html(data.weather[0].description);
			$('#temp').html(celcius + '&deg');
			$('#location').html(data.name);
			$('#wind').html(data.wind.speed + ' km/h');
			$('#humidity').html(data.main.humidity + '%');
			let urlIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
			$('#weather-icon').attr('src', urlIcon);
		})

};

const createDailyChart = (ctx) => {
	let data = {
		labels: getDay(),
		datasets: [{
			label: 'Энергопотребление в день',
			data: getRandomData(6, 6, 10),
			borderwWidth: 2,
			tension: 0.4,
			fill: true,
			// borderColor: 
			// backgrounColor:
		}]
	};


	let config = {
		type: 'bar',
		data,
		options: {
			scales: {
				y: {
					max: 12,
					ticks: {
						callback: function (value, index, ticks) {
							return value + ' kW/h';
						}
					}
				}
			}
		}
	};

	monthChart = new Chart(ctx, config);
};

$('.reload').click(function () {
	drawWeather();
});

const getCardsMain = (info) => {
	let cardsBlock = '';
	let state = '';
	let shieldClass = '';
	let textClass = '';
	let mode = $('#mode').hasClass('active') ? 'dark' : '';
	for (let i of info) {
		i.consumption = 0;
		if (i.security) {
			state = 'Безопасно';
			shieldClass = 'check';
			textClass = 'text-success';
		} else {
			state = 'Внимание!';
			shieldClass = 'exclamation'
			textClass = 'text-warning';
		};
		for (let device of devices) {
			if (device.room === i.room & device.state) {
				i.consumption += device.consumption;
			};
		};
		cardsBlock += `
		<div class="col-md-3 col-12 mb-4">
			<div class="card ${mode}" style="border-radius: 35px;">
			<div class="card-body">
			<div class="card-img">
				<img src="${i.img_src}" alt="кухня" style="max-width: 150px; min-width: 100px;" class="card-icon">
			</div>
			<div class="info">
				<h5 class="room ms-1" m-0>${i.room}</h5>
				<p class="consumption" mb-0>
				<span class="ms-1 text-info"><i class="bi bi-lightning-charge"></i> Потребление ${i.consumption}W</span>
				<br><span class="ms-1 security ${textClass}"><i class="bi bi-shield-${shieldClass}"></i> ${state}</span></p>
			</div>
		</div>
			</div>
		</div>`
	};

	return cardsBlock;
};

const mainUpdate = () => {
	let mode = $('#mode').hasClass('active') ? 'dark' : '';
	const weatherBlock = `
	<section class="title py-2">
            <h1 class="section-title">Общая информация</h1>
        </section>
        <div class="container">
		<div class="row row-cols-1 row-cols-md-3">
                <div class="col-md-6 col-12 mb-4">
                    <div class="card ${mode}" style="border-radius: 35px; height: 100%; width: 100%;">
                        <div class="card-body px-5 py-4">
                            <div class="d-flex my-3">
                                <h6 class="flex-grow-1" id="location"></h6>
                                <h6 id="date"></h6>
                            </div>
                            <div class="d-flex flex-column text-center mt-5 mb-4">
                                <h6 class="display-4 mb-0 font-weight-bold" id="temp"></h6>
                                <span class="small" style="color: #868B94" id="description"></span>
                            </div>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1" style="font-size: 1rem;">
                                    <div><i class="bi bi-wind" style="color: #868B94;"></i> <span class="ms-1"
                                            id="wind">
                                        </span></div>
                                    <div><i class="bi bi-droplet" style="color: #868B94;"></i> <span class="ms-1"
                                            id="humidity"></span>
                                    </div>
                                    <div>
                                        <i class="bi bi-arrow-clockwise" style="color: #868B94;"></i><a
                                            class="link-opacity-75-hover reload ${mode} p-0 ms-1" href=""><span
                                                class="ms-1">Обновить данные</span></a>
                                    </div>
                                </div>
                                <div>
                                    <img src="" width="100px" id="weather-icon">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-12 mb-4">
                    <div class="card ${$('#mode').hasClass('active') ? 'dark' : ''}" style="border-radius: 35px; height: 100%; width: 100%;">
                        <div class="chartCardBlock">
                            <canvas id="myElectricityChart"></canvas>
                        </div>
                    </div>
                </div>
			${getCardsMain(mainCards)}
			</div>
		</div>
    `

	let mainBlock = weatherBlock;

	$('main').html(mainBlock);
	$('.card-img-top').css({
		'max-width': '200px',
	});

	drawWeather();
	createDailyChart($('#myElectricityChart'));
};

$('#main-btn').click(function () {
	activePage('main-btn');
	mainUpdate();
});


// Мониторинг

function getTime() {
	let date = new Date;
	now = date.getHours();
	let time = [];
	for (let i = 7; i >= 0; i--) {
		time.push((now - i < 10 ? "0" : "") + (date.getHours() - i) + ":00");
	};

	return time;
}

const getRandomData = (count, min, max) => {
	let data = [];
	for (let i = count; i >= 0; i--) {
		data.push(Math.floor(Math.random() * (max - min) + min));
	};

	return data;
};

const getDay = () => {
	let date = new Date;
	const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
	let day = Number(date.getDay()) - 1;
	console.log(day)
	let data = [];
	for (let i = 0; i < 6; i++) {
		if (day !== 0) {
			data.push(days[day]);
			day--;
		} else {
			day = 6;
			data.push(days[day]);
			day--;
		}
	};

	return data.reverse();
};

const getMonth = () => {
	let date = new Date;
	const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
	let month = Number(date.getMonth());
	let data = [];
	for (let i = 0; i < 9; i++) {
		if (month !== 0) {
			data.push(months[month]);
			month--;
		} else {
			month = 11;
			data.push(months[month]);
			month--;
		}
	};

	return data.reverse();
};

const createTempChart = (ctx) => {
	let data = {
		labels: getTime(),
		datasets: [{
			label: 'Температура в квартире',
			data: getRandomData(7, 18, 26),
			borderwWidth: 2,
			tension: 0.4,
			fill: true
		}]
	};

	let config = {
		type: 'line',
		data,
		options: {
			scales: {
				y: {
					min: 15,
					max: 35,
					ticks: {
						callback: function (value, index, ticks) {
							return value + ' °C';
						}
					},
				}
			},

		}
	};

	tempChart = new Chart(ctx, config);
};

const createMonthChart = (ctx) => {
	let data = {
		labels: getMonth(),
		datasets: [{
			label: 'Энергопотребление в месяц',
			data: getRandomData(9, 150, 300),
			borderwWidth: 2,
			tension: 0.4,
			fill: true
		}]
	};

	let config = {
		type: 'bar',
		data,
		options: {
			scales: {
				y: {
					ticks: {
						callback: function (value, index, ticks) {
							return value + ' kW/h';
						}
					}
				}
			}
		}
	};

	monthChart = new Chart(ctx, config);
};

const createLiveChart = (ctx) => {
	let date = new Date;
	now = date.getHours();
	let data = {
		labels: [0, 0, (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + ':' + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()],
		datasets: [{
			label: 'Электропотребление',
			data: [0, consumption, consumption],
			borderwWidth: 2,
			tension: 0.4,
			fill: true
		}]
	};

	let config = {
		type: 'line',
		data,
		options: {
			scales: {
				x: {
					min: 2,
					max: 10,
				},
				y: {
					min: 0,
					max: 5000,
					ticks: {
						callback: function (value, index, ticks) {
							return value + ' W';
						}
					},
				}
			},
			animation: {
				duration: 2000,
				easing: 'linear'
			}
		}
	};

	let tempChart = new Chart(ctx, config);

	setInterval(function () {
		let date = new Date();
		let time = (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + ':' + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
		let value = consumption;

		if (data.datasets[0].data.length >= 11) {
			data.labels.shift();
			data.datasets[0].data.shift();
		};
		data.labels.push(time);
		data.datasets[0].data.push(value);

		tempChart.update();
	}, 2000);

};

const createHumidityChart = (ctx) => {
	let data = {
		labels: getTime(),
		datasets: [{
			label: 'Влажность в квартире',
			data: getRandomData(7, 20, 98),
			borderwWidth: 2,
			tension: 0.4,
			fill: true
		}]
	};

	let config = {
		type: 'line',
		data,
		options: {
			scales: {
				y: {
					min: 0,
					max: 100,
					ticks: {
						callback: function (value, index, ticks) {
							return value + ' %';
						}
					},
				}
			},

		}
	};

	humidityChart = new Chart(ctx, config);
};

const createCO2Chart = (ctx) => {
	let data = {
		labels: getTime(),
		datasets: [{
			label: 'Уровень CO2',
			data: getRandomData(7, 380, 700),
			borderwWidth: 2,
			tension: 0.4,
			fill: true
		}]
	};

	let config = {
		type: 'line',
		data,
		options: {
			scales: {
				y: {
					min: 300,
					ticks: {
						callback: function (value, index, ticks) {
							return value + ' ppm';
						}
					},
				}
			},

		}
	};

	CO2Chart = new Chart(ctx, config);
};

$('#live-btn').click(function () {
	activePage('live-btn');
	const canvasLiveBlock = `
	<div class="chartBlock d-flex">
		<canvas class="center-block" id="myLiveChart"></canvas>
	</div>`;

	const canvasTempBlock = `
	<div class=" chartBlock d-flex">
        <canvas class="chart" id="myTempChart"></canvas>
    </div>`;

	const canvasEnergyBlock = `
	<div class="chartBlock d-flex">
        <canvas class="chart" id="myEnergyChart"></canvas>
    </div>`;

	const canvasHumidityBlock = `
	<div class="chartBlock d-flex">
		<canvas class="center-block" id="myHumidityChart"></canvas>
	</div>
	`;

	const canvasCO2Block = `
	<div class="chartBlock d-flex">
        <canvas class="chart" id="myCO2Chart"></canvas>
    </div>`;

	let canvasBlock = $(`
	<section class="title py-2">
		<h1 class="section-title">Мониторинг параметров</h1>
	</section>
	<div class="container">
		<div class="row">
			<div class="col col-xl-12">
				${canvasLiveBlock} 
			</div>
		</div>
		<div class="row">
			<div class="col col-lg-6 p-3">
				${canvasEnergyBlock}
			</div>
			<div class="col col-lg-6 p-3">
				${canvasTempBlock}
			</div>
		</div>
		<div class="row">
			<div class="col col-lg-6 p-3">
				${canvasHumidityBlock}
			</div>
			<div class="col col-lg-6 p-3">
				${canvasCO2Block}
			</div>
		</div>
	</div>
`);

	$('main').html(canvasBlock);
	$('.container').css({
		'margin': 'auto',
	});

	$('.chartBlock').css({
		'align-items': 'center',
		'justify-content': 'center',

	});

	$('#myLiveChart').css({
		'height': '100%'
	})

	createTempChart($('#myTempChart'));
	createLiveChart($('#myLiveChart'));
	createMonthChart($('#myEnergyChart'));
	createHumidityChart($('#myHumidityChart'));
	createCO2Chart($('#myCO2Chart'));
});


// Устройства

function toogleChange(id) {
	let input = $(`#${id}`);

	if (devices[id - 1].state) {
		devices[id - 1].state = false;
		input.removeAttr('checked');
		input.closest('.card-body').addClass('text-muted');
		consumption -= devices[id - 1].consumption;
	} else {
		devices[id - 1].state = true;
		input.attr('checked', '');
		input.closest('.card-body').removeClass('text-muted');
		consumption += devices[id - 1].consumption;
	};
};

const getCards = (info) => {
	let data = '';
	let id = 0;
	let mode = $('#mode').hasClass('active') ? 'dark' : '';
	consumption = 0;
	for (let i of info) {
		let state = '';
		let muted = '';
		if (i.state) {
			id++;
			state = 'checked';
			consumption += i.consumption;
		} else {
			id++;
			muted = 'text-muted';
		};
		let card = `
		
			<div class="col mb-4">
				<div class="card ${mode} mt-3">
					<div class="img-card">
						<img src="${i.img_src}" class="card-img-top" alt="...">
					</div>
					<div class="card-body  ${muted}">
						<h5 class="card-title">${i.name}</h5>
						<p class="card-text">${i.description}</p>
						<div class="form-check form-switch">
							<input class="form-check-input ${mode}" type="checkbox" role="switch" id="${id}" onclick="toogleChange(${id})" ${state}>
							<div class="consumption">
								<p><i class="bi bi-plug"></i> ${i.consumption}W</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
		data = data + card;
	};

	return data
};

$('#devices-btn').click(function () {
	activePage('devices-btn');
	let devicesBlock = $(`
	<section class="title pt-2">
            <h1 class="section-title">Устройства и состояние</h1>
        </section>
	<section class="cards">
		<div class="row row-cols-1 row-cols-md-3 container">${getCards(devices)}</div>
	</section>`);
	$('main').html(devicesBlock);
});