import React, { useState } from "react";
import "./WeatherDashboard.css";

const WeatherDashboard = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6e78f7fd&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Failed to fetch weather data.");
    }
  };

  return (
    <div className="weather-container">
      <h1 className="title">Weather Dashboard</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>🔍 Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-details">
          <h2>{weather.name}</h2>
          <p>🌡️ Temperature: {weather.main.temp}°C</p>
          <p>🌥️ Condition: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
