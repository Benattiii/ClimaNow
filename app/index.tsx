import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font'; // Importando o expo-font

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
  const navigation = useNavigation();
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fontLoaded, setFontLoaded] = useState(false); // Estado para saber se a fonte foi carregada

  useEffect(() => {
    // Carregar a fonte
    const loadFonts = async () => {
      await Font.loadAsync({
        'Oswald': require('../assets/fonts/Oswald.ttf'), // Caminho da sua fonte
      });
      setFontLoaded(true); // Atualizar estado quando a fonte for carregada
    };

    loadFonts();

    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require('../assets/logo.png')}
            style={{ width: 40, height: 40, marginRight: 10 }}/>

          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#000", fontFamily: 'Oswald' }}>
            ClimaNow
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#8cdbeb', 
      },
      headerTintColor: '#000',
    });
  }, [navigation]);

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
    } finally {
      setLoading(false);
    }
  }

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  if (!fontLoaded) {
    return null; // Ou você pode mostrar um indicador de carregamento enquanto a fonte carrega
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#484b58" }}>
      <StatusBar style="auto" />

      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#FFFFFF", fontFamily: 'Oswald' }}>
        Pesquisar cidade
      </Text>

      <View style={{
        backgroundColor: "#FFFFFF",
        marginVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 20,
        width: "80%",
        maxWidth: 400,
        justifyContent: "flex-end",
      }}>
        <TextInput
          style={{
            backgroundColor: "#FFFFFF",
            padding: 10,
            fontSize: 16,
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            color: "#000", 
            borderRadius: 20,
            fontFamily: 'Oswald', // Usando a fonte carregada
          }}
          placeholder="Digite a cidade..."
          placeholderTextColor="#b0b0b0" 
          value={city}
          onChangeText={setCity}
        />

        <TouchableOpacity onPress={() => fetchWeather(city)} style={{ padding: 10 }}>
          {loading ? (
            <ActivityIndicator color="#777" size="small" />
          ) : (
            <Feather name="search" size={24} color="#777" />
          )}
        </TouchableOpacity>
      </View>

      {errorMessage && (
        <Text style={{ color: "#FFFFFF", marginVertical: 20, fontSize: 16, fontFamily: 'Oswald' }}>
          {errorMessage}
        </Text>
      )}

      {weatherData && (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 24, color: "#FFFFFF", fontFamily: 'Oswald' }}>{weatherData.name}</Text>
          <Text style={{ fontSize: 25, fontWeight: "700", marginTop: 10, color: "#FFFFFF", fontFamily: 'Oswald' }}>
            {weatherData.main.temp}ºC
          </Text>
          <Image
            style={{ width: 100, height: 100, marginTop: 10, alignItems: "center", }}
            source={{
              uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,}}/>
          <Text style={{ fontSize: 18, marginTop: 10, color: "#FFFFFF", fontFamily: 'Oswald' }}>
            {capitalizeFirstLetter(weatherData.weather[0].description)}
          </Text>
          <Text style={{ fontSize: 18, marginTop: 10, color: "#FFFFFF", fontFamily: 'Oswald' }}>
            Umidade: {weatherData.main.humidity}%
          </Text>
        </View>
      )}
    </View>
  );
};

export default WeatherScreen;
