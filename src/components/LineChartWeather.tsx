// LineChartWeather.tsx
import React from 'react';
import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material/styles';

interface LineChartWeatherProps {
  selectedVariable: string; // Variable seleccionada
  humidityData: number[]; // Datos de humedad
  precipitationData: number[]; // Datos de precipitación
  cloudsData: number[]; // Datos de nubosidad
  timeLabels: string[]; // Etiquetas de tiempo
}

export default function LineChartWeather({
  selectedVariable,
  humidityData,
  precipitationData,
  cloudsData,
  timeLabels,
}: LineChartWeatherProps) {
  // Determinar los datos y la etiqueta de la serie
  let data: number[] = [];
  let label: string = '';
  let color: string = '#ffa726'; // Color principal para las líneas

  switch (selectedVariable) {
    case 'precipitation':
      data = precipitationData;
      label = 'Precipitación';
      color = '#2196f3'; // Azul para precipitación
      break;
    case 'clouds':
      data = cloudsData;
      label = 'Nubosidad';
      color = '#9c27b0'; // Morado para nubosidad
      break;
    case 'humidity':
    default:
      data = humidityData;
      label = 'Humedad';
      color = '#ffa726'; // Naranja para humedad
      break;
  }

  // Obtener el tema actual para ajustar colores si es necesario
  const theme = useTheme();
  const textColor = '#ffffff'; // Color blanco para textos

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
        xAxis={[
          {
            scaleType: 'point',
            data: timeLabels,
            labelStyle: { fill: textColor, fontSize: 14 }, // Etiqueta del eje X en blanco
            tickStyle: { stroke: textColor, strokeWidth: 1 }, // Marcas del eje X en blanco
            tickLabelStyle: { fill: textColor, fontSize: 12 }, // Etiquetas de marcas del eje X en blanco
          },
        ]}
        yAxis={[
          {
            // Eliminamos la etiqueta del eje Y estableciendo 'label' a una cadena vacía
            label: '',
            orientation: 'left',
            tickStyle: { stroke: textColor, strokeWidth: 1 }, // Marcas del eje Y en blanco
            tickLabelStyle: { fill: textColor, fontSize: 12 }, // Etiquetas de marcas del eje Y en blanco
          },
        ]}
        colors={[color]} // Asignar color a la línea
        lineWidth={2}
        pointSize={4}
        gridVisible
        gridStyle={{
          stroke: '#444',
          strokeWidth: 1,
        }}
        style={{
          backgroundColor: '#2a2a2e',
        }}
        
      />
    </Paper>
  );
}
