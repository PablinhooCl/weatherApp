let apiLocation= 'Valdivia';

let apiLink= `https://api.weatherapi.com/v1/current.json?key=8f8ec4f7f49240bd8b8135611231810&q=${apiLocation}&last_updated&days=5`;

const loadingDiv = document.getElementById('loading');
let startTime;

const showLoading = () => {
    startTime = new Date();
    loadingDiv.style.display = 'block';
};

const hideLoading = () => {
    const endTime = new Date(); 
    const duration = endTime - startTime; 
    console.log(`El componente de carga estuvo visible durante ${duration} milisegundos.`);
    loadingDiv.style.display = 'none';
};

const weatherUpdt = async () => {
    showLoading(); 
  
    try {
      const response = await fetch(apiLink);
      const data = await response.json();
      console.log(data);
      const tempDiv= document.getElementById('temp');
        tempDiv.innerText= data.current.temp_c+'°C';

        const imgDiv= document.getElementById('weatherCon');
        imgDiv.src= data.current.condition.icon;

        const locDiv= document.getElementById('location');
        locDiv.innerText= data.location.name+', '+data.location.country;

        const humDiv= document.getElementById('humidity');
        humDiv.innerText= data.current.humidity+" %";

        const wsDiv= document.getElementById('windSpeed');
        wsDiv.innerText= data.current.gust_kph+' Km/hr'
       
  
        hideLoading(); 
    } catch (error) {
      console.error(error);
      hideLoading(); 
    }
  };
    
    

weatherUpdt();
const locForm= document.getElementById('locationForm');
locForm.addEventListener('submit', function(event){
    event.preventDefault();
    const locInput= document.getElementById('locationInput');
    apiLocation= locInput.value;
    apiLink= `https://api.weatherapi.com/v1/current.json?key=8f8ec4f7f49240bd8b8135611231810&q=${apiLocation}&last_updated&days=5`;
    console.log(apiLocation);
    weatherUpdt()
});

