let container = document.querySelector('.container');
let search = document.querySelector('.search-box button');
let cityName = document.querySelector('.search-box input');
const APIKey = 'ccbd3d2dc12aa6e020572ac8a8aad158';
let weatherBox = document.querySelector('.weather-box');
let weatherDetails = document.querySelector('.weather-details');
let error404 = document.querySelector('.not-found');
let dateCountry = document.querySelector('.date-country')


function showData(data) {
    let country = document.querySelector('.country p');
    country.innerHTML = `${data.name}, ${data.sys.country}`;
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let date = document.querySelector('.date p');
    date.innerHTML = `${day}-${month}-${year}`;
    let image = document.querySelector('.weather-box img');
    let temperature = document.querySelector('.weather-box .temperature');
    let description = document.querySelector('.weather-box .description');
    let humidity = document.querySelector('.weather-details .humidity span');
    let wind = document.querySelector('.weather-details .wind span');
    console.log(data)
    switch (data.weather[0].main) {
        case 'Clear':
            image.src = './Assets/images/clear.png';
            break;
        case 'Rain':
            image.src = './Assets/images/rain.png';
            break;
        case 'Snow':
            image.src = './Assets/images/snow.png';
            break;
        case 'Clouds':
            image.src = './Assets/images/cloud.png';
            break;
        case 'Mist':
            image.src = './Assets/images/mist.png';
            break;
        case 'Haze':
            image.src = './Assets/images/mist.png';
            break;
        default:
            image.src = './Assets/images/cloud.png'
    }
    temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
    humidity.innerHTML = `${data.main.humidity}%`;
    description.innerHTML = `${data.weather[0].description}`;
    wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`
}

function getLiveLocation() {
    navigator.geolocation.getCurrentPosition((position => {
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`)
            .then((res) => res.json())
            .then((data) => {
                container.style.height = '555px';
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                dateCountry.classList.add('active');
                showData(data);
            })
    }))
}
getLiveLocation();

function fetchData() {
    let city = document.querySelector('.search-box input').value;
    if (city.trim() === '') {
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(res => res.json()).then((data) => {
            if(data.cod == '404'){
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                dateCountry.classList.remove('active');
                return;
            }
            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');
            dateCountry.classList.add('active');
            showData(data)
        });
        cityName.value = '';
}  

search.addEventListener('click', fetchData);

cityName.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        fetchData();
    }
})
