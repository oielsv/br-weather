import { memo, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { ThermometerSun, ThermometerSnowflake, CloudRain } from 'lucide-react';

import { Weather } from '../../models';

export const ForecastTableSkeleton = ({ days }: { days: number }) => (
  <div className="flex flex-col gap-2 w-full">
    <Skeleton className="h-7 w-64" />
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          {Array.from({ length: days + 1 }).map((_, index) => (
            <TableHead key={index}>
              <Skeleton className="h-6 w-32" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: days }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: days + 1 }).map((_, cellIndex) => (
              <TableCell key={cellIndex}>
                <Skeleton className="h-6 w-20" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export const ForecastTable = memo(
  ({ weather, city, forecastDays }: { weather: Weather; city: string; forecastDays: number }) => {
    const tableData = useMemo(() => {
      return weather.daily.temperature_2m_max.map((_, index) => ({
        date: new Date(weather.daily.time[index]).toLocaleDateString('en-US', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }),
        maxTemp: Math.round(weather.daily.temperature_2m_max[index]),
        minTemp: Math.round(weather.daily.temperature_2m_min[index]),
        precipitation: Math.round(weather.daily.precipitation_sum[index] * 10) / 10,
        rainProbability: Math.round(weather.daily.precipitation_probability_max[index]),
      }));
    }, [weather]);

    return (
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-lg font-bold">
          Forecast for {city} for the next {forecastDays} days
        </h2>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead>
                <span className="text-sm text-gray-700 font-bold flex items-center gap-2">Day</span>
              </TableHead>
              <TableHead>
                <span className="text-sm text-gray-700 font-bold flex items-center gap-2">
                  <ThermometerSun className="w-4 h-4" />
                  Max Temperature {weather.daily_units.temperature_2m_max}
                </span>
              </TableHead>
              <TableHead>
                <span className="text-sm text-gray-700 font-bold flex items-center gap-2">
                  <ThermometerSnowflake className="w-4 h-4" />
                  Min Temperature {weather.daily_units.temperature_2m_min}
                </span>
              </TableHead>
              <TableHead>
                <span className="text-sm text-gray-700 font-bold flex items-center gap-2">
                  <CloudRain className="w-4 h-4" />
                  Precipitation {weather.daily_units.precipitation_sum}
                </span>
              </TableHead>
              <TableHead>
                <span className="text-sm text-gray-700 font-bold flex items-center gap-2">
                  <CloudRain className="w-4 h-4" />
                  Rain Probability
                  {weather.daily_units.precipitation_probability_max.replace('%', '')}
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={weather.daily.time[index] + index}>
                <TableCell>
                  <span className="text-sm text-gray-700 font-bold">{index + 1}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-700 font-bold">{row.date}</span>
                </TableCell>
                <TableCell>{row.maxTemp}</TableCell>
                <TableCell>{row.minTemp}</TableCell>
                <TableCell>{row.precipitation}</TableCell>
                <TableCell>{row.rainProbability}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
);

ForecastTable.displayName = 'ForecastTable';
