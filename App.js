import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import { WEATHER_API_KEY } from "@env";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchWeatherByCity = async () => {
    if (!city.trim()) {
      setErrorMsg("Please enter a city name.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    Keyboard.dismiss(); // hide keyboard

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setErrorMsg(data.message || "City not found");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (error) {
      setErrorMsg("Failed to fetch weather.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Weather App 🌤️</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />

      <Pressable style={styles.button} onPress={fetchWeatherByCity}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </Pressable>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

      {weather && (
        <View style={styles.result}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{weather.main.temp}°C</Text>
          <Text style={styles.desc}>{weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F7FA",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
  },
  result: {
    alignItems: "center",
    marginTop: 20,
  },
  city: {
    fontSize: 24,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 48,
    fontWeight: "600",
  },
  desc: {
    fontSize: 20,
    fontStyle: "italic",
    textTransform: "capitalize",
  },
});
