function drawWeather(d) {
	let celcius = Math.round(d.main.temp);

	date = new Date();
	let datetime = (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
	document.getElementById('date').innerHTML = datetime;
	document.getElementById('description').innerHTML = d.weather[0].description;
	document.getElementById('temp').innerHTML = celcius + '&deg';
	document.getElementById('location').innerHTML = d.name;
	document.getElementById('wind').innerHTML = d.wind.speed + ' km/h';
	document.getElementById('humidity').innerHTML = d.main.humidity + '%';
}


function changeMain() {
	let el = document.querySelector('main');
	const weatherDiv = `
    <section class="weatherBlock">
      <div class="col-md-8 col-lg-6 col-xl-4">

        <div class="card" style="color: #4B515D; border-radius: 35px;">
          <div class="card-body p-4">

            <div class="d-flex">
              <h6 class="flex-grow-1" id="location"></h6>
              <h6 id="date">15:07</h6>
            </div>

            <div class="d-flex flex-column text-center mt-5 mb-4">
              <h6 class="display-4 mb-0 font-weight-bold" style="color: #1C2331;" id="temp"></h6>
              <span class="small" style="color: #868B94" id="description"></span>
            </div>

            <div class="d-flex align-items-center">
              <div class="flex-grow-1" style="font-size: 1rem;">
                <div><i class="fas fa-wind fa-fw" style="color: #868B94;"></i> <span class="ms-1" id="wind">
                	</span></div>
                <div><i class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span class="ms-1" id="humidity"></span>
                </div>
                <div><i class="fas fa-sun fa-fw" style="color: #868B94;"></i> <span class="ms-1"> 0.2h </span>
                </div>
              </div>
              <div>
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp"
                  width="100px">
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
    `
	el.innerHTML = weatherDiv;

	const API_TOKEN = '0781833fd68d23421d38a0cd0c2d0264';
	let params = {
		q: 'Minsk',
		appid: API_TOKEN,
		lang: 'ru',
		units: 'metric'
	}
	url = "https://api.openweathermap.org/data/2.5/weather?"
	fetch(url + new URLSearchParams(params)).then(function (resp) { return resp.json() }) // Convert to json
		.then(function (data) {
			drawWeather(data)
		})



};


export { changeMain };