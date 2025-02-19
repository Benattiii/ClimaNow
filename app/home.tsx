import React, { useEffect } from "react"; 
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }: any) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Verificação de clima', 
      headerStyle: {
        backgroundColor: '#f9c693',
      },
      headerTintColor: '#3e260a', 
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Bem-vindo! Deseja checar o clima de uma cidade?</Text>
      <Text style={styles.subtitle}>
        Cheque o clima de sua cidade e outras clicando abaixo!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Weather")}
      >
        <Text style={styles.buttonText}>Ir para a busca</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A4B65",
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
    color: "#FFFFFF"
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#FFFFFF"
  },
  button: {
    backgroundColor: "#f9c693", // Cor de fundo do botão
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#3e260a", // Cor do texto dentro do botão
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
