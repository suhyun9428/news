import { createMachine, fromPromise } from "xstate";


const WeatherMachine = createMachine({
  id: "weather", // 머신 이름
  initial: "loading", // 초기 상태는 loading으로 둠
  context: { // 상태 머신이 가지고 있는 데이터 저장소
    weather: null, // api에서 받아올 날씨 데이터
    error: null, // 에러 발생 시 에러 정보
  },

  states: {
    loading: {
      invoke: {
        src: fromPromise(async () => {
          const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
          const city = "Seoul";
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

          const res = await fetch(url);
          if (!res.ok) throw new Error("Weather API error");
          return res.json();
        }),
        onDone: {
          target: "success",
          actions: ({ context, event }) => {
            context.data = event.output;
          }
        },
        onError: {
          target: "error",
          actions: ({ context, event }) => {
            context.error = event.error;
          }
        }
      }
    },
    success: {},
    error: {},
  }
})

export default WeatherMachine