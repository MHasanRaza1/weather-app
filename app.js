let container = document.querySelector('.container');
let search = document.querySelector('.search-box button');
let weatherBox = document.querySelector('.weather-box');
let weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click',() => {
    const APIKey = 'ccbd3d2dc12aa6e020572ac8a8aad158';
    let city = document.querySelector('.search-box input').value;
    if(city === ''){
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(res => res.json()).then(data => {
        let country = document.querySelector('.country p');
        country.innerText = data.sys.country;
        let date = document.querySelector('.date p');
        date
        let image = document.querySelector('.weather-box img');
        let temperature = document.querySelector('.weather-box .temperature');
        let description = document.querySelector('.weather-box .description');
        let humidity = document.querySelector('.weather-details .humidity span');
        let wind = document.querySelector('.weather-details .wind span');
        console.log(data)
        switch(data.weather[0].main){
            case 'Clear':
                image.src ='./Assets/images/clear.png';
                break;
            case 'Rain':
                image.src ='./Assets/images/rain.png';
                break;
            case 'Snow':
                image.src ='./Assets/images/snow.png';
                break;
            case 'Clouds':
                image.src ='./Assets/images/cloud.png';
                break;     
            case 'Mist':
                image.src ='./Assets/images/mist.png';
                break; 
            case 'Haze':
                image.src ='./Assets/images/mist.png';
                break; 
            default:
                image.src = './Assets/images/cloud.png'
        }
        temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
        humidity.innerHTML = `${data.main.humidity}%`;
        description.innerHTML = `${data.weather[0].description}`;
        wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`
    })
    
})