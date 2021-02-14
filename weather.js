weather = document.querySelector(".weather");
const API = "d12da06f5a1ac0d38e9b62c4d2487d8a";
class Weather {
  constructor() {}

  //method
  saveCoords = (coordsObj) => {
    localStorage.setItem("coords", JSON.stringify(coordsObj));
  };
  handleGeoError = () => {
    console.log("can't access geo loc");
  };

  handleGeoSucces = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
      latitude: latitude,
      longitude: longitude,
    };
    this.saveCoords(coordsObj);
  };
  askForCoordes = () => {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSucces,
      this.handleGeoError
    );
  };

  loadCoords = () => {
    const loadCoords = localStorage.getItem("coords");
    if (loadCoords) {
    } else {
      this.askForCoordes();
    }
    const parseCoords = JSON.parse(loadCoords);

    this.getWeather(parseCoords.latitude, parseCoords.longitude);
  };
  getWeather = (lat, long) => {
    let result = "";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API}&units=metric`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        const temperature = Math.floor(json.main.temp);
        const place = json.name;
        const mainweather = json.weather[0].main;
        weather.textContent = `${place} ${temperature}℃ ${mainweather}`;
      });
  };
}

const geo = new Weather();

geo.loadCoords();
