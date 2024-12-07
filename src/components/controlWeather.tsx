// ControlWeather.tsx
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ControlWeatherProps {
  selectedVariable: string; 
  onVariableChange: (variable: string) => void; 
}

interface WeatherItem {
  name: string;
  value: string;
  description: string;
  color: string; 
}

export default function ControlWeather({
  selectedVariable,
  onVariableChange,
}: ControlWeatherProps) {
  const items: WeatherItem[] = [
    {
      name: 'Precipitación',
      value: 'precipitation',
      description:
        'Cantidad de agua que cae sobre una superficie en un período específico.',
      color: '#2196f3', 
    },
    {
      name: 'Humedad',
      value: 'humidity',
      description:
        'Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje.',
      color: '#ffa726', 
    },
    {
      name: 'Nubosidad',
      value: 'clouds',
      description:
        'Grado de cobertura del cielo por nubes, afectando la visibilidad y la cantidad de luz solar recibida.',
      color: '#9c27b0', 
    },
  ];


  const handleChange = (event: SelectChangeEvent) => {
    const variable = event.target.value;
    onVariableChange(variable); 
  };


  const selectedItem = items.find((item) => item.value === selectedVariable);
  const selectedColor = selectedItem ? selectedItem.color : '#2a2a2e';
  const options = items.map((item) => (
    <MenuItem
      key={item.value}
      value={item.value}
      sx={{
        backgroundColor: '#2a2a2e', 
        color: selectedVariable === item.value ? selectedColor : '#ffffff', 
        '&:hover': {
          backgroundColor: '#444', 
          color: '#ffffff', 
        },
        padding: '10px 16px',
      }}
    >
      {item.name}
    </MenuItem>
  ));

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#2a2a2e',
        height: '100%',
      }}
    >
      <Typography
        mb={2}
        component="h3"
        variant="h6"
        sx={{ color: '#ffa726' }}
      >
        Variables Meteorológicas
      </Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel
            id="control-weather-select-label"
            sx={{
              color: selectedColor,
              '&.Mui-focused': {
                color: selectedColor,
              },
            }}
          >
            Variables
          </InputLabel>
          <Select
            labelId="control-weather-select-label"
            id="control-weather-select"
            value={selectedVariable}
            onChange={handleChange}
            label="Variables"
            renderValue={(value) => {
              const currentItem = items.find((item) => item.value === value);
              return (
                <Typography sx={{ color: selectedColor }}>
                  {currentItem ? currentItem.name : ''}
                </Typography>
              );
            }}
            sx={{
              backgroundColor: '#2a2a2e', 
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: selectedColor, 
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: selectedColor, 
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: selectedColor, 
              },
              '& .MuiSvgIcon-root': {
                color: '#ffffff', 
              },
              
              '& .MuiSelect-select': {
                color: selectedColor, 
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#2a2a2e', 
                  color: '#ffffff', 
                  '& .MuiMenuItem-root': {
                    backgroundColor: '#2a2a2e', 
                    color: '#ffffff', 
                    '&:hover': {
                      backgroundColor: '#444', 
                      color: '#ffffff', 
                    },
                  },
                },
              },
            }}
          >
            {options}
          </Select>
        </FormControl>
      </Box>
      {/* Descripción de la variable seleccionada */}
      {selectedItem && (
        <Typography
          mt={2}
          variant="body2"
          sx={{
            color: '#cccccc',
            fontSize: '0.875rem',
          }}
        >
          {selectedItem.description}
        </Typography>
      )}
    </Paper>
  );
}
