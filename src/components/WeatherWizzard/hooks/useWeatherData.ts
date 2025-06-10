import { useCallback, useEffect, useState } from 'react';
import { Weather, WeatherApiParams, Cities, cities } from '../models';

const WEATHER_API_URL = (params: WeatherApiParams) =>
  `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=auto&forecast_days=${params.forecast_days}`;

const fetchWeather = async (params: WeatherApiParams): Promise<Weather> => {
  const response = await fetch(WEATHER_API_URL(params));
  return response.json();
};

export const useWeatherData = (city: keyof Cities, forecastDays: number) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const [latitude, longitude] = cities[city];

    try {
      setLoading(true);
      const weatherData = await fetchWeather({
        latitude,
        longitude,
        forecast_days: forecastDays,
      });
      setWeather(weatherData);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, [city, forecastDays]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { weather, loading, error, refetch: fetchData };
};
