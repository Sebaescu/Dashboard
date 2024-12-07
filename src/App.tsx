import './App.css';
import Grid from '@mui/material/Grid'; 
import IndicatorWeather from './components/IndicatorWeather';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/controlWeather'; 
import LineChartWeather from './components/LineChartWeather';
import Item from './components/item'; 
import { useEffect, useState } from 'react';

interface Indicator {
  title?: string;
  subtitle?: string;
  value?: string;
  icon?: string | JSX.Element;
  temp?: string;
}

function App() {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [owm, setOWM] = useState(localStorage.getItem("openWeatherMap"));
  const [items, setItems] = useState<Item[]>([]);
  const [selectedVariable, setSelectedVariable] = useState('precipitation'); 

  useEffect(() => {
    const request = async () => {
      let savedTextXML = localStorage.getItem("openWeatherMap") || "";
      const expiringTime = localStorage.getItem("expiringTime");
      const nowTime = (new Date()).getTime();

      if (expiringTime === null || nowTime > parseInt(expiringTime)) {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${apiKey}`
        );
        savedTextXML = await response.text();

        const hours = 0.01; 
        const delay = hours * 3600000;
        const newExpiringTime = nowTime + delay;

        localStorage.setItem("openWeatherMap", savedTextXML);
        localStorage.setItem("expiringTime", newExpiringTime.toString());
        localStorage.setItem("nowTime", nowTime.toString());
        localStorage.setItem(
          "expiringDateTime",
          new Date(newExpiringTime).toString()
        );
        localStorage.setItem("nowDateTime", new Date(nowTime).toString());

        setOWM(savedTextXML);
      }

      if (savedTextXML) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, "application/xml");

        const dataToIndicators: Indicator[] = [];
        const dataToItems: Item[] = [];
        const times = xml.getElementsByTagName("time");
        for (let i = 0; i < Math.min(6, times.length); i++) {
          const time = times[i];
          const dateStart = time.getAttribute("from") || "";
          const dateEnd = time.getAttribute("to") || "";
          const precipitation = time.getElementsByTagName("precipitation")[0]?.getAttribute("probability") || "0";
          const humidity = time.getElementsByTagName("humidity")[0]?.getAttribute("value") || "0";
          const clouds = time.getElementsByTagName("clouds")[0]?.getAttribute("all") || "0";
        
          const weatherCode = time.getElementsByTagName("symbol")[0]?.getAttribute("var") || "";
          const weatherIcon = `https://openweathermap.org/img/wn/${weatherCode}.png`;
          const kelvin = parseFloat(time.getElementsByTagName("temperature")[0]?.getAttribute("value") || "0");
        
          const temperature = (kelvin - 273.15).toFixed(2);
        
          dataToItems.push({
            dateStart,
            dateEnd,
            precipitation,
            humidity,
            clouds,
            weatherIcon,
            temperature, 
          });
        }
        const now = new Date();
        const currentTime = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const currentWeatherCode = times[0]?.getElementsByTagName("symbol")[0]?.getAttribute("var") || "";
        const currentWeatherIcon = `https://openweathermap.org/img/wn/${currentWeatherCode}.png`;
        const currentKelvin = parseFloat(times[0]?.getElementsByTagName("temperature")[0]?.getAttribute("value") || "0");
        const currentTemperature = (currentKelvin - 273.15).toFixed(2);
        console.log(currentWeatherIcon);
        console.log(currentTemperature);
        
        const name = xml.getElementsByTagName("name")[0]?.textContent || "";
        dataToIndicators.push({
          title: "City",
          value: name,
          subtitle: `Current Time: ${currentTime}`,
          icon: currentWeatherIcon,
          temp: currentTemperature,
        });

        const locationParent = xml.getElementsByTagName("location")[0];
        if (locationParent) {
          const locationElement = locationParent.getElementsByTagName("location")[0];
          if (locationElement) {
            const latitude = locationElement.getAttribute("latitude") || "";
            const longitude = locationElement.getAttribute("longitude") || "";
            const altitude = locationElement.getAttribute("altitude") || "";

            dataToIndicators.push({ title: "Latitude", value: latitude });
            dataToIndicators.push({ title: "Longitude",  value: longitude });
            dataToIndicators.push({ title: "Altitude",  value: altitude });
          }
        }

        setIndicators(dataToIndicators);
        setItems(dataToItems);
      }
    };

    request();
  }, [owm]);

  const handleVariableChange = (variable: string) => {
    setSelectedVariable(variable);
  };

  const renderIndicators = () => {
    return indicators.map((indicator, idx) => (
      <Grid key={idx} item xs={12} xl={3} className="card">
        <IndicatorWeather
          title={indicator.title}
          subtitle={indicator.subtitle}
          value={indicator.value}
          icon={indicator.icon}
          temp={indicator.temp}
        />
      </Grid>
    ));
  };

  const humidityData = items.map(item => Number(item.humidity));
  const precipitationData = items.map(item => Number(item.precipitation));
  const cloudsData = items.map(item => Number(item.clouds));
  const timeLabels = items.map(item => item.dateStart); 

  return (
    <div className="weather-app">
      <h1>Weather Dashboard</h1>
      <Grid container spacing={5}>
        {renderIndicators()}

        <Grid item xs={12} xl={9}>
          <div className="table-container">
            <TableWeather itemsIn={items} />
          </div>
        </Grid>

        <Grid item xs={12} xl={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} xl={3} className="control-weather">
              <ControlWeather 
                selectedVariable={selectedVariable} 
                onVariableChange={handleVariableChange} 
              />
            </Grid>
            <Grid item xs={12} xl={9}>
              <div className="line-chart-container">
                <LineChartWeather
                  selectedVariable={selectedVariable}
                  humidityData={humidityData}
                  precipitationData={precipitationData}
                  cloudsData={cloudsData}
                  timeLabels={timeLabels}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
