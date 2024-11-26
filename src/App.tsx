import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import './App.css';

import { WeatherData } from './interfaces/WeatherData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&units=metric&appid=${API_KEY}`;

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: WeatherData) => setWeatherData(data))
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>Cargando...</div>;
  }

  const { city, list: forecast } = weatherData;

  const hourlyForecast = forecast.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('es-EC', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    temperature: item.main.temp,
    description: item.weather[0].description,
    icon: item.weather[0].icon,
    windSpeed: item.wind.speed,
  }));

  const chartData = {
    labels: hourlyForecast.map((item) => item.time),
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: hourlyForecast.map((item) => item.temperature),
        borderColor: '#ff4500',
        backgroundColor: 'rgba(255, 69, 0, 0.2)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const dailyForecast = forecast.filter((_, index) => index % 8 === 0).slice(0, 7);

  const currentDate = new Date().toLocaleString('es-EC', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="weather-app">
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Información actual */}
        <Grid item xs={12} md={6}>
          <Card className="current-weather">
            <CardContent>
              <Typography variant="h6" style={{ color: "#FF7C00" }}>{currentDate}</Typography>
              <Typography variant="h4" style={{ color: "#333333" }}>{city.name}, {city.country}</Typography>
              <div className="weather-current">
                <img
                  src={`https://openweathermap.org/img/wn/${hourlyForecast[0].icon}@4x.png`}
                  alt={hourlyForecast[0].description}
                  className="weather-icon"
                />
                <Typography variant="h3" className="temperature">
                  {hourlyForecast[0].temperature}°C
                </Typography>
              </div>
              <Typography variant="body1" className="description">
                Feels like {forecast[0].main.feels_like}°C. {hourlyForecast[0].description}.
              </Typography>
              <div className="weather-details">
                <Typography>Viento: {hourlyForecast[0].windSpeed} m/s</Typography>
                <Typography>Humedad: {forecast[0].main.humidity}%</Typography>
                <Typography>Presión: {forecast[0].main.pressure} hPa</Typography>
                <Typography>Visibilidad: {forecast[0].visibility / 1000} km</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
  
        {/* Mapa */}
        <Grid item xs={12} md={6}>
          <Card className="map">
            <CardContent>
              <iframe
                title="Mapa de Guayaquil"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=-80.05185%2C-2.31885%2C-79.65185%2C-2.06885&layer=mapnik`}
                className="responsive-map"
                allowFullScreen
                loading="lazy"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
  
      {/* Segunda fila: Pronóstico por horas y tabla de pronóstico extendido */}
      <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: '2rem' }}>
        {/* Pronóstico por horas */}
        <Grid item xs={12} md={6}>
          <Card className="hourly-forecast">
            <CardContent>
              <Typography variant="h6">Pronóstico por horas</Typography>
              <Line data={chartData} options={chartOptions} />
            </CardContent>
          </Card>
        </Grid>
  
        {/* Pronóstico extendido */}
        <Grid item xs={12} md={6}>
          <Card className="daily-forecast">
            <CardContent>
              <Typography variant="h6">Pronóstico extendido</Typography>
              <Table>
                <TableBody>
                  {dailyForecast.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(item.dt * 1000).toLocaleDateString('es-EC', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </TableCell>
                      <TableCell>
                        <img
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                          alt={item.weather[0].description}
                          className="weather-icon"
                        />
                      </TableCell>
                      <TableCell>{item.main.temp_max}°C / {item.main.temp_min}°C</TableCell>
                      <TableCell>{item.weather[0].description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
  
};

export default App;
