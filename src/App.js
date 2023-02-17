import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

const cities = ["Seoul", "Tokyo", "London", "New York", "Ibaraki", "Jeonju"];

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoading(true);
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
      setLoading(false);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3aa5e7d25761f964ce63152e3c840530&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3aa5e7d25761f964ce63152e3c840530&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  return (
    <div className="main">
      {loading ? (
        <ClipLoader
          color="red"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div>
          <WeatherBox weather={weather}></WeatherBox>
          <WeatherButton cities={cities} setCity={setCity}></WeatherButton>
        </div>
      )}
    </div>
  );
}

export default App;
