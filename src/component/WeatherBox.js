import React from "react";

const WeatherBox = ({ weather }) => {
  return (
    <div className="box">
      <div>location: {weather?.name}</div>
      <h2>temp: {weather?.main.temp}</h2>
      <h2>humidity: {weather?.main.humidity}</h2>
      <h2>pressue: {weather?.main.pressure}</h2>
      <h2>status: {weather?.weather[0].description}</h2>
    </div>
  );
};

export default WeatherBox;
