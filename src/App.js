import React, { useState } from 'react';
const api = {
  key: "a8f7bbc1cdf19236a73cb29907a80a7b",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setCity('');
          console.log(result);
          
        });
    }
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'warm-image' : 'cold-image') : 'cold-image'}>
      <main>
        <div className="search">
          <input 
            type="text"
            className="search-text"
            placeholder="Search..."
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="city">
            <div className="city-name">{weather.name}, {weather.sys.country}</div>
          </div>
          <div className="weather">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
        <div className="weather-text">{weather.weather[0].main}</div>
        <img  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}/> 
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;