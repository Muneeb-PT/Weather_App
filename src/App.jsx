import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;

    try {
      setLoading(true);
      setError("");
      setWeather(null);

      // Step 1: Get coordinates
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name } = geoData.results[0];

      // Step 2: Get weather
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`
      );

      const weatherData = await weatherResponse.json();

      setWeather({
        city: name,
        temperature: weatherData.current.temperature_2m,
        windSpeed: weatherData.current.wind_speed_10m,
        time: weatherData.current.time,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Weather Search App</h1>

      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>Search</button>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.city}</h2>

          <p>Temperature: {weather.temperature}°C</p>

          <p>Wind Speed: {weather.windSpeed} km/h</p>

          <p>Time: {weather.time}</p>
        </div>
      )}
    </div>
  );
}

export default App;