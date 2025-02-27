import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Font from 'expo-font'; // Importa o expo-font

const HomeScreen = ({ navigation }: any) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Carregar a fonte personalizada
    const loadFonts = async () => {
      await Font.loadAsync({
        'Oswald': require('../assets/fonts/Oswald.ttf'), // Caminho da sua fonte
      });
      setFontLoaded(true); // Fonte carregada
    };

    loadFonts();

    navigation.setOptions({
      title: 'ClimaNow', 
      headerTitle: () => (
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000', fontFamily: 'Oswald' }}>
          ClimaNow
        </Text>
      ),
      headerStyle: {
        backgroundColor: '#8cdbeb',
      },
      headerTintColor: '#000', 
    });
  }, [navigation]);

  if (!fontLoaded) {
    return null; // Ou um carregando, caso a fonte não tenha carregado ainda
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Bem-vindo ao ClimaNow!</Text>
      <Text style={styles.subtitle}>
        Observe o clima de sua cidade e outras clicando abaixo!
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Weather")}>
        <Text style={styles.buttonText}>Buscar cidade</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#484b58",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF",
    fontFamily: 'Oswald', // Usando a fonte carregada
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#FFFFFF",
    fontFamily: 'Oswald', // Usando a fonte carregada
  },
  button: {
    backgroundColor: "#8cdbeb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'Oswald', // Usando a fonte carregada
  },
});

export default HomeScreen;
