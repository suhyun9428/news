import axios from "axios";
import { useEffect, useState } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const city = "Seoul";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      try {
        const response = await axios.get(url);
        setWeather(response.data);
      } catch (error) {
        console.error("weather api 에러 :", error);
      }
    };
    fetchWeather();
  }, []);
  return (
    <>
      {weather ? (
        <div className="box__weather">
          <img
            className="image"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p className="text__temp">{weather.main.temp}°C</p>
        </div>
      ) : (
        <div className="box__weather box__weather--error">error!</div>
      )}
    </>
  );
};
export default Weather;
