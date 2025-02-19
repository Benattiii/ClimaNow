import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const API_KEY = "4cc1c4a5e729a60dd89dbe2d1467cde0";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: [
    {
      icon: string;
      description: string;
    }
  ];
}

const WeatherScreen = () => {
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  async function fetchWeather(city: string): Promise<void> {
    if (!city) {
      setErrorMessage("Por favor, insira o nome de uma cidade.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      const result = await res.json();

      if (result?.cod === "404") {
        setErrorMessage("Cidade não encontrada");
        setWeatherData(null);
      } else {
        setWeatherData(result);
      }
    } catch (error) {
      setErrorMessage("Erro ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d4d4d4",
      }}
    >
      <StatusBar style="auto" />

      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Previsão do Tempo
      </Text>

      <View
        style={{
          marginVertical: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderColor: "#777",
          borderWidth: 1,
          borderRadius: 10,
          width: 250,
        }}
      >
        <TextInput
          placeholder="Digite a cidade"
          style={{
            backgroundColor: "#fffff",
            borderStyle: "solid",
            padding: 10,
            fontSize: 16,
            width: 200,
          }}
          value={city}
          onChangeText={setCity}
        />

        <TouchableOpacity
          onPress={() => fetchWeather(city)}
          style={{ padding: 10 }}
        >
          {loading ? (
            <ActivityIndicator color="#777" size="small" />
          ) : (
            <Feather name="search" size={24} color="#777" />
          )}
        </TouchableOpacity>
      </View>

      {errorMessage && (
        <Text style={{ color: "#777", marginVertical: 20, fontSize: 16 }}>
          {errorMessage}
        </Text>
      )}

      {weatherData && (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 24 }}>{weatherData.name}</Text>
          <Text style={{ fontSize: 25, fontWeight: "700", marginTop: 10 }}>
            {weatherData.main.temp}ºC
          </Text>
          <Image
            style={{ width: 100, height: 100, marginTop: 10 }}
            source={{
              uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
            }}
          />
          <Text style={{ fontSize: 18, marginTop: 10 }}>
            {weatherData.weather[0].description}
          </Text>
          <Text style={{ fontSize: 18, marginTop: 10 }}>
            Umidade: {weatherData.main.humidity}%
          </Text>
        </View>
      )}
    </View>
  );
};

export default WeatherScreen;
