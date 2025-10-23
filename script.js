const BASE_URL = 'https://api.weatherapi.com/v1';
const API_KEY = '80953d4ac6244516b9e183506252210'

const cityInput = document.getElementById('city')
const submitBtn = document.getElementById('submit-btn');
const output = document.getElementById('output');
const loginBtn = document.getElementById('login');


const loginForm = document.getElementById('login-form');
const username = document.getElementById('username');
const password = document.getElementById('password');

async function get_weather(city){
    try{
        const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`)        
        if (!response.ok) {
                // response.ok is false for errors like 404 or 500
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return `The temperature in ${data.location.name} is ${data.current.temp_c}°C`;
    }
    catch (error){
        console.log(error);
        return `Sorry, could not get weather for ${city}.`;
    }}

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


if (!localStorage.getItem('isLoggedIn')){

loginBtn.addEventListener('click', () => {
  $('#login-modal').modal('show');
});


loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const user = username.value.trim();
  const pass = password.value;

  console.log('login modal open triggered');


  if (!user || !pass) {
    alert('Please enter username and password');
    return;
  }

  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('username', user);

  $('#login-modal').modal('hide');
});
}else{
    loginBtn.style.display = "none"
    const loggedUser = localStorage.getItem('username')
    const navElements = document.getElementsByClassName('navbar')
    const navEle = navElements[0];
    const div = document.createElement('div')
    div.textContent = loggedUser
    navEle.appendChild(div)
}