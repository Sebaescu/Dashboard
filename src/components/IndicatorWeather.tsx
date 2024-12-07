import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

interface Indicator {
  title?: string;
  subtitle?: string;
  value?: string;
  icon?: string | JSX.Element;
  temp?: string;
}

export default function IndicatorWeather(config: Indicator) {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#2a2a2e',
        color: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Título */}
      <Typography 
        component="h2" 
        variant="h6" 
        color="primary" 
        gutterBottom
        sx={{ color: '#ffa726' }} 
      >
        {config.title}
      </Typography>

      {/* Valor de la ciudad */}
      <Typography 
        component="p" 
        variant="h4" 
        sx={{ color: '#ffffff' }}  
      >
        {config.value?.toString()}
      </Typography>

      {/* Subtítulo con la hora */}
      <Typography 
        color="text.secondary" 
        sx={{ flex: 1, color: '#ffffff' }} 
      >
        {config.subtitle}
      </Typography>

      {/* Icono y temperatura */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
        {/* Verifica si icon es una URL (string) y renderiza la imagen */}
        {typeof config.icon === 'string' && (
          <img src={config.icon} alt="Weather icon" width={50} style={{ marginRight: 10 }} />
        )}

        {/* Temperatura */}
        {config.temp && (
          <Typography component="span" sx={{ color: '#ffffff', fontSize: '1.5rem' }}>
            {config.temp} °C
          </Typography>
        )}
      </Box>
    </Paper>
  );
}
