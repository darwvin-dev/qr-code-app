import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  GenerateQR: undefined;
  Scanner: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <LinearGradient colors={["#1A202C", "#3D4F6B"]} style={styles.container}>
      <Animated.View entering={FadeInDown.duration(800)}>
        <Text style={styles.title}>QRCode Nexus</Text>
      </Animated.View>

      <TouchableOpacity
        onPress={() => navigation.navigate("GenerateQR")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Create QR Code</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Scanner")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Scan QR Code</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    color: "#fff",
    fontFamily: "DynaPuff", // ensure this is loaded via `expo-font`
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#5E72E4",
    borderRadius: 30,
    paddingVertical: 16,
    width: "80%",
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
