import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  //Variables
  let [city, setCity] = useState("");
  let [cityHeading, setCityHeading] = useState("");
  let [weatherData, setWeatherData] = useState({});

  function showWeather(response) {
    setWeatherData({
      temperature: Math.round(response.data.main.temp),
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city.length > 0) {
      setCityHeading(`${city}`);
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=215576bab28022db35e6e64f040e1b56&units=metric`;
      axios.get(apiUrl).then(showWeather);
    } else {
      alert("Enter a city");
    }
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  //Main contant
  return (
    <div className="Weather p-4">
      <form className="md-3 mb-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              className="form-control"
              type="search"
              placeholder="Type a city ..."
              id="entered-city"
              name="entered-city"
              autoComplete="off"
              onChange={updateCity}
            ></input>
          </div>

          <div className="col-3">
            <input
              type="submit"
              value="Search"
              className="btn btn-success w-100"
            ></input>
          </div>
        </div>
      </form>

      <div className="main-information">
        <h1 className="city">{cityHeading}</h1>
        <div className="container">
          <div className="row">
            <span>
              <p className="current-date mb-0"></p>
              <p className="description-weather">{weatherData.description}</p>
            </span>
          </div>
          <div className="row">
            <div className="col-3">
              <img
                className="icon-weather"
                src={weatherData.icon}
                alt={weatherData.description}
              ></img>
            </div>
            <div className="col-3">
              <span className="current-temperature">
                {weatherData.temperature}
              </span>
              <span className="units">
                <a href="/"> °C</a> | <a href="/">°F</a>
              </span>
            </div>
            <div className="col-6">
              <p className="additional-information-about-weather">
                Humidity: {weatherData.humidity}%
                <br />
                Wind: {weatherData.wind} m/s
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
