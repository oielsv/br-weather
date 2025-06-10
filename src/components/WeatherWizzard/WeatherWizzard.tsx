'use client';

import { useCallback, useState } from 'react';
import { RefreshCcw } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ForecastTable, ForecastTableSkeleton } from './components/ForecastTable';

import { cities, CityName } from './models';
import { useWeatherData } from './hooks';
import { toast } from 'sonner';

const DEFAULT_FORECAST_DAYS = 3;

export function WeatherWizzard() {
  const [city, setCity] = useState<CityName>('Limassol');
  const [forecastDays, setForecastDays] = useState(DEFAULT_FORECAST_DAYS);
  const { weather, loading, error, refetch } = useWeatherData(city, forecastDays);

  const handleCityChange = useCallback(
    (value: keyof typeof cities) => {
      setCity(value);
    },
    [setCity]
  );

  const handleForecastDaysChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: rawValue } = e.target;
      const formattedValue = rawValue.replace(/[^0-9]/g, '');

      if (!/^\d*$/.test(formattedValue) || Number(formattedValue) > 10) {
        return;
      }

      setForecastDays(Number(formattedValue));
    },
    [setForecastDays]
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-2 gap-2 items-center">
        <div className="col-span-1 grid grid-cols-2 gap-4 items-center">
          <div className="grid grid-cols-2 items-center justify-end">
            <span className="text-sm">Forecast days:</span>
            <Input
              type="text"
              pattern="[0-9]*"
              maxLength={2}
              value={forecastDays}
              onChange={handleForecastDaysChange}
            />
          </div>
        </div>
        <div className="col-span-1 flex justify-end">
          <Select value={city} onValueChange={handleCityChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(cities).map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {error &&
        toast.error(error, {
          duration: 10000,
          position: 'bottom-right',
          description: 'Something went wrong, please try again later',
          action: {
            label: 'Refresh',
            onClick: () => refetch(),
            children: <RefreshCcw className="w-4 h-4" />,
          },
        })}
      {loading ? (
        <ForecastTableSkeleton days={forecastDays} />
      ) : (
        weather && <ForecastTable weather={weather} city={city} forecastDays={forecastDays} />
      )}
      {weather && !loading && (
        <div className="flex justify-center items-center h-full">
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      )}
    </div>
  );
}

WeatherWizzard.displayName = 'WeatherWizzard';
