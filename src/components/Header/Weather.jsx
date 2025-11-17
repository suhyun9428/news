// import axios from "axios";
import { useEffect, useState } from "react";
import { useMachine } from '@xstate/react';
import WeatherMachine from "../../machines/weatherMachine";

const Weather = () => {
  const [state] = useMachine(WeatherMachine); // 현재 머신 상태랑 컨텍스트를 담고 있음
  // 상태 : 로딩인지 성공인지 에러인지
  // 컨텍스트 : 성공이면 api 데이터 저장, 에러났으면 에러 정보 저장
  const { data, err } = state.context; // 성공인지 아닌지 여기서 분리
  // console.log(data)

  // const [weather, setWeather] = useState(null);

  // useEffect(() => {
  //   const fetchWeather = async () => {
  //     const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  //     const city = "Seoul";
  //     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  //     try {
  //       const response = await axios.get(url);
  //       setWeather(ressponse.data);
  //     } catch (error) {
  //       console.error("weather api 에러 :", error);
  //     }
  //   };
  //   fetchWeather();
  // }, []);

  // 현재 상태에 따라 분기

  if (state.matches('loading')) {
    // 로딩일 때
    return <div className="box__warther">🌀</div>
  }

  if (state.matches('err')) {
    return (
      <div className="box__weather box__weather--error"><span className="text">error!</span></div>
    )
  }

  return (
    <div className="box__weather">
      <img
        className="image"
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].main}
      />
      <p className="text__temp">{data.main.temp}°C</p>
    </div>
  );
};
export default Weather;
