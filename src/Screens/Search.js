import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { appId } from "react-native-dotenv";
import { AsyncStorage } from "react-native";

export default function Search({ navigation }) {
  const [input, onInputChange] = useState("");

  const getCityWeather = () =>
    axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: input,
        appid: appId,
      },
    });

  storeHistory = async (weather) => {
    try {
      const getHistory = await AsyncStorage.getItem("history");
      const history =
        getHistory && getHistory.length > 0 ? JSON.parse(getHistory) : [];
      if (history.length >= 5) {
        history.shift();
      }
      history.push(weather);
      await AsyncStorage.setItem("history", JSON.stringify(history));
    } catch (error) {
      //TODO
    }
  };

  const onSearch = () => {
    if (input.trim().length) {
      getCityWeather().then((response) => {
        const data = response.data;
        const icon = data.weather[0].icon;
        const weather = [
          {
            status: data.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${icon}@2x.png`,
            temp: (data.main.temp - 273.15).toFixed(0),
            name: data.name,
          },
        ];
        storeHistory(weather[0]);
        navigation.navigate("Details", {
          weather,
        });
      });
    }
  };

  const onHistory = async () => {
    const getHistory = await AsyncStorage.getItem("history");
    const parsedData = JSON.parse(getHistory);
    navigation.navigate("Details", {
      weather: parsedData,
    });
  };

  return (
    <View>
      <LinearGradient
        colors={["#4FAE98", "#60B67F", "#80BF66", "#98C459"]}
        style={styles.container}
      >
        <Text style={styles.title}>Testair</Text>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => onInputChange(text)}
            value={input}
            placeholder="ENTER CITY NAME"
            placeholderTextColor="#B2D193"
          />
          <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
            <Text style={styles.searchButtonText}>{"->"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.historyButton} onPress={onHistory}>
          <Text style={styles.historyButtonText}>{"VIEW HISTORY"}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: "4rem",
    letterSpacing: ".5rem",
    marginBottom: "1rem",
  },
  inputsContainer: {
    height: "2.3rem",
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: "100%",
    color: "#B2D193",
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    borderTopLeftRadius: ".8rem",
    borderBottomLeftRadius: ".8rem",
    textAlign: "center",
    userSelect: "none",
    marginRight: ".3rem",
  },
  searchButton: {
    height: "100%",
    width: "10%",
    backgroundColor: "white",
    borderTopRightRadius: ".8rem",
    borderBottomRightRadius: ".8rem",
  },
  searchButtonText: {
    textAlign: "center",
    marginVertical: "auto",
    color: "#61B752",
  },
  historyButton: {
    width: "40%",
    textAlign: "center",
    marginTop: "1rem",
    backgroundColor: "#8EC886",
    paddingVertical: "1rem",
    paddingHorizontal: "2rem",
    borderRadius: "1rem",
  },
  historyButtonText: {
    color: "white",
  },
});
