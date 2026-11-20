import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function getWeather(event) {
    event.preventDefault()
    const searchCity = city.trim()

    if (!searchCity) {
      setError('Please enter a city name.')
      setWeather(null)
      return
    }

    setLoading(true)
    setError('')
    setWeather(null)

    try {
      // First, find the coordinates of the entered city.
      const locationUrl = new URL('https://geocoding-api.open-meteo.com/v1/search')
      locationUrl.search = new URLSearchParams({
        name: searchCity,
        count: '1',
        language: 'en',
        format: 'json',
      })

      const locationResponse = await fetch(locationUrl)
      if (!locationResponse.ok) {
        throw new Error('Could not search for that location. Please try again.')
      }

      const locationData = await locationResponse.json()
      const location = locationData.results?.[0]

      if (!location) {
        throw new Error('City not found. Check the spelling and try again.')
      }

      // Use the coordinates to request the current weather.
      const weatherUrl = new URL('https://api.open-meteo.com/v1/forecast')
      weatherUrl.search = new URLSearchParams({
        latitude: String(location.latitude),
        longitude: String(location.longitude),
        current: 'temperature_2m,wind_speed_10m',
        timezone: 'auto',
      })

      const weatherResponse = await fetch(weatherUrl)
      if (!weatherResponse.ok) {
        throw new Error('Weather data is unavailable right now. Please try again.')
      }

      const weatherData = await weatherResponse.json()
      if (!weatherData.current) {
        throw new Error('The weather service returned incomplete data.')
      }

      setWeather({
        city: location.name,
        region: location.admin1,
        country: location.country,
        temperature: weatherData.current.temperature_2m,
        windSpeed: weatherData.current.wind_speed_10m,
        time: weatherData.current.time,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="weather-app">
      <header className="page-header">
        <p className="eyebrow">A React learning project</p>
        <h1>Weather App</h1>
        <p className="intro">Look up the current weather for a city.</p>
      </header>

      <form className="search-form" onSubmit={getWeather}>
        <label htmlFor="city">City name</label>
        <div className="search-row">
          <input
            id="city"
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="For example, Kochi"
            autoComplete="off"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching…' : 'Search'}
          </button>
        </div>
      </form>

      <section className="result-area" aria-live="polite" aria-busy={loading}>
        {loading && <p className="message">Getting the latest weather…</p>}
        {error && <p className="message error" role="alert">{error}</p>}

        {weather && (
          <article className="weather-result">
            <p className="location-label">Current weather</p>
            <h2>{weather.city}</h2>
            <p className="location-detail">
              {[weather.region, weather.country].filter(Boolean).join(', ')}
            </p>

            <div className="weather-details">
              <div>
                <span className="detail-label">Temperature</span>
                <strong>{weather.temperature} °C</strong>
              </div>
              <div>
                <span className="detail-label">Wind speed</span>
                <strong>{weather.windSpeed} km/h</strong>
              </div>
            </div>

            <p className="updated-time">Local time: {weather.time.replace('T', ' ')}</p>
          </article>
        )}

        {!loading && !error && !weather && (
          <p className="message">Search for a city to see its current weather.</p>
        )}
      </section>

      <footer>
        <p>Weather data provided by <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a>.</p>
      </footer>
    </main>
  )
}

export default App
