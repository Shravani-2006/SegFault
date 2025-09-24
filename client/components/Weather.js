import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const Weather = ({ t, styles }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch weather data
    const fetchWeather = async () => {
      try {
        // This is a placeholder for a real API call.
        // For a real app, you would use a service like OpenWeatherMap
        // and fetch data based on location.
        // Example:
        // const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Pudussery West,IN&units=metric&appid=YOUR_API_KEY');
        // const data = await response.json();
        
        // Simulating network delay and data response
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const simulatedData = {
          main: { temp: 28 },
          weather: [{ description: 'light breeze', icon: '☀️' }],
        };
        
        setWeatherData(simulatedData);
        setLoading(false);

      } catch (err) {
        setError("Failed to fetch weather data.");
        setLoading(false);
        console.error("Weather API error:", err);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (description) => {
    if (description.includes('rain')) return '🌧️';
    if (description.includes('cloud')) return '☁️';
    if (description.includes('sun')) return '☀️';
    return '🌡️';
  };

  const weatherDescription = weatherData ? weatherData.weather[0].description : '';

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{t.weather}</Text>
      <View style={styles.cardContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#047857" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <View style={styles.weatherItem}>
            <Text style={styles.weatherIcon}>
              {getWeatherIcon(weatherDescription)}
            </Text>
            <View>
              <Text style={styles.weatherText}>
                {weatherData.main.temp}°C, {weatherDescription}
              </Text>
              <Text style={styles.weatherLabel}>
                {t.today}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a4731',
    marginBottom: 16,
  },
  cardContent: {
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    padding: 16,
  },
  weatherItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  weatherText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  weatherLabel: {
    fontSize: 14,
    color: '#4b5563',
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
  },
});

export default Weather;