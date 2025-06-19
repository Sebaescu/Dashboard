import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Item from './item';

interface TableWeatherProps {
  itemsIn: Item[];
}

export default function TableWeather({ itemsIn }: TableWeatherProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="weather forecast table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: '#ffa726', color: '#ffffff' }}>Start Date</TableCell>
            <TableCell align="right" sx={{ backgroundColor: '#ffa726', color: '#ffffff' }}>End Date</TableCell>
            <TableCell align="right" sx={{ backgroundColor: '#ffa726', color: '#ffffff' }}>Temperature (°C)</TableCell>
            <TableCell align="right" sx={{ backgroundColor: '#ffa726', color: '#ffffff' }}>Precipitation (%)</TableCell>
            <TableCell align="right" sx={{ backgroundColor: '#ffa726', color: '#ffffff' }}>Humidity (%)</TableCell>
            <TableCell align="right" sx={{ backgroundColor: '#ffa726', color: '#ffffff' }}>Cloud Coverage (%)</TableCell>
            <TableCell align="right" sx={{ backgroundColor: '#ffa726', color: '#ffffff' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemsIn.map((row) => (
            <TableRow key={row.dateStart}>
              <TableCell component="th" scope="row" sx={{ backgroundColor: '#2a2a2e', color: '#ffffff' }}>
                {row.dateStart}
              </TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#2a2a2e', color: '#ffffff' }}>{row.dateEnd}</TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#2a2a2e', color: '#ffffff' }}>{row.temperature}</TableCell> {/* Mostrar temperatura */}
              <TableCell align="right" sx={{ backgroundColor: '#2a2a2e', color: '#ffffff' }}>{row.precipitation}</TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#2a2a2e', color: '#ffffff' }}>{row.humidity}</TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#2a2a2e', color: '#ffffff' }}>{row.clouds}</TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#2a2a2e', color: '#ffffff' }}>
                <img src={row.weatherIcon as string} alt="Weather icon" width={30} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
