let cityInput = document.getElementById('city_input'),
searchBtn = document.getElementById('searchBtn'),
api_key='4dd2d80b4cb6b984d0d09520537ce08f',
currentWeatherCard = document.querySelector('.weather-left .card');


function getWeatherDetails(name,lat,lon,country,state){
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
    WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
    days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        let currentDate = new Date();
        currentWeatherCard.innerHTML = `
            <div class="weather-current">
                <div class="details">
                    <p>Now</p>
                    <h2>${(data.main.temp -273.15).toFixed(2)}&deg;C</h2>
                    <p>${data.weather[0].description}</p>
                </div>
                <div class="weather-icon">
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
                </div>
            </div>
            <hr>
            <div class="class-footer">
                <p><i class='bx bx-calendar'></i>${days[currentDate.getDay()]}, ${currentDate.getDate()}, ${months[currentDate.getMonth()]}, ${currentDate.getFullYear()}</p>
                <p><i class='bx bx-current-location'></i>${name}, ${country}</p>
            </div>
        `;
    }).catch(() => {
        alert('Failed to fetch current weather');
    });
}




function getCityCoordinates(){
    let cityName = cityInput.value.trim();
    cityInput.value = '';
    if(!cityName)return;
    let GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        let {name,lat,lon,country,state}=data[0];
        getWeatherDetails(name,lat,lon,country,state);
    }).catch(() => {
        alert(`Failed to fetch coordinates of ${cityName}`);
    });
}


searchBtn.addEventListener('click', getCityCoordinates);
cityInput.addEventListener("keyup", e => {
    if (e.key === "Enter") getCityCoordinates();
});