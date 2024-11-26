import { CityInfo } from './CityInfo';
import { Forecast } from './Forecast';

export interface WeatherData {
  city: CityInfo;
  list: Forecast[];
}

  