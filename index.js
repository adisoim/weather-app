let weather = {
    apiKey: "33598e9444996e9ec40a87f853799cad",
    fetchWeatherUsingGeoLocation: function (lat, long) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=metric&appid=" + this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("no weather found");
                    throw new console.error("no weather found");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apiKey + "&units=metric"
        )
            .then((response) => {
                if (!response.ok) {
                    alert("no weather found");
                    throw new console.error("no weather found");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " Km/h";
        document.querySelector(".weather").style.display = "block";
    },
    getLocationAndSearch: function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            weather.fetchWeatherUsingGeoLocation(lat, long);
        });
    },
    search: function () {
        this.fetchWeather(document.querySelector(".searchBar").value);
    }
};

window.onload = function () {
    weather.getLocationAndSearch();
}

document
    .querySelector(".searchArea button")
    .addEventListener("mousedown", function () {
        weather.search();
    });

document
    .querySelector(".searchBar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });