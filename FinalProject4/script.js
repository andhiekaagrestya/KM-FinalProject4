let weather = {
  "apiKey": "68194263c6d3d377b09cfdd66eaaaef8",
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then((data) => {
      this.displayWeather(data)
    }).catch((error) => {
      Swal.fire({
        icon: 'error', 
        title: 'Oops...', 
        text: 'No weather found.', 
      })
    });
    // .then((data) => console.log(data));
  },
  displayWeather: function (data) {
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;
    // console.log(name,description,icon,temp,humidity,speed);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".description").innerText = description;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: "+humidity+"%";
    document.querySelector(".wind").innerText = "Wind Speed: "+speed+" km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1600x900/?"+ name +")";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup",function(event) {
  if (event.key=="Enter") {
    weather.search()
  }
});
// weather.fetchWeather("Jakarta");