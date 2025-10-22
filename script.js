const BASE_URL = 'http://api.weatherapi.com/v1';
const API_KEY = '80953d4ac6244516b9e183506252210'

const cityInput = document.getElementById('city')
const submitBtn = document.getElementById('submit-btn');
const output = document.getElementById('output');


async function get_weather(city){
    try{
        const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`)        
        if (!response.ok) {
                // response.ok is false for errors like 404 or 500
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        return `The temperature in ${data.location.name} is ${data.current.temp_c}°C`;
    }
    catch (error){
        console.log(error);
        return `Sorry, could not get weather for ${city}.`;
    }

}

const weather = submitBtn.addEventListener('click', async (event)=>{
    event.preventDefault();

    const city = cityInput.value;

    if (!city){
        alert('No city selected');
        return;
    }

    output.textContent = 'Fetching Data.....'
    const weatherText = await get_weather(city);
    
    output.textContent = weatherText;
});
