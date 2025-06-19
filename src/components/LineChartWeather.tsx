import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';

interface LineChartWeatherProps {
  selectedVariable: string;
  humidityData: number[];
  precipitationData: number[];
  cloudsData: number[];
  timeLabels: string[];
}

export default function LineChartWeather({
  selectedVariable,
  humidityData,
  precipitationData,
  cloudsData,
  timeLabels,
}: Readonly<LineChartWeatherProps>) {
  let data: number[] = [];
  let label: string = '';
  let color;

  switch (selectedVariable) {
    case 'precipitation':
      data = precipitationData;
      label = 'Precipitación';
      color = '#2196f3';
      break;
    case 'clouds':
      data = cloudsData;
      label = 'Nubosidad';
      color = '#9c27b0';
      break;
    case 'humidity':
    default:
      data = humidityData;
      label = 'Humedad';
      color = '#ffa726';
      break;
  }

  const textColor = '#ffffff';

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#2a2a2e',
        color: textColor,
      }}
    >
      <LineChart
        width={800}
        height={300}
        series={[{ data, label }]}
        xAxis={[{
          scaleType: 'point',
          data: timeLabels,
          labelStyle: { fill: textColor, fontSize: 14 },
          tickLabelStyle: { fill: textColor, fontSize: 12 },
        }]}
        yAxis={[{
          label: '',
          tickLabelStyle: { fill: textColor, fontSize: 12 },
        }]}
        colors={[color]} 
        sx={{
          backgroundColor: '#2a2a2e', 
        }}
      />
    </Paper>
  );
}
