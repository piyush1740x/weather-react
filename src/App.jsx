import React, { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null); 

  const key = "708b7bdacc7d4fd2bc5174437242605";
  const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=yes`;

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError(null); 
    setWeather(null);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (response.ok) { 
        setWeather(data);
      } else {
        setError(data.error.message);
      }
    } catch (error) {
      setError("Error fetching data"); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
      <h1 className="text-5xl font-extrabold text-white mb-6">My Weather</h1>
      <form onSubmit={fetchWeather} className="mb-6 flex space-x-4">
        <input
          type="text"
          className="p-3 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button
          type="submit"
          className="p-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-500 bg-white p-3 rounded-lg mb-6">{error}</p>}
      {weather && (
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-80">
          <h1 className="text-2xl font-bold mb-2">{weather.location.country}</h1>
          <h2 className="text-xl font-semibold mb-4">{weather.location.region}</h2>
          <img src={weather.current.condition.icon} alt={weather.current.condition.text} className="mx-auto mb-4 max-h-32" />
          <p className="text-3xl font-bold mb-2">{Math.floor(weather.current.temp_c)}°C</p>
          <p className="text-xl capitalize mb-2">Wind Speed: {weather.current.wind_mph} km/h</p>
          <p className="text-lg">Humidity: {weather.current.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default App;
