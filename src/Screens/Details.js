import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";

export default function Details({ route, navigation }) {
  const getDateInfo = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();

    return {
      dayNumber: day,
      dayName: moment().format("ddd"),
    };
  };

  return (
    <View>
      <LinearGradient
        colors={["#4FAE98", "#60B67F", "#80BF66", "#98C459"]}
        style={styles.main}
      >
        <View style={styles.container}>
          <View style={styles.navigationBar}>
            <TouchableOpacity
              style={{ backgroundColor: "transparent" }}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ fontSize: 36, color: "white" }}>{"<-"}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailsContainer}>
            {route.params.weather.map((detail) => {
              return (
                <View style={styles.detailContainer}>
                  <View style={styles.descriptionContainer}>
                    <Image style={styles.icon} source={detail.icon} />
                    <Text style={styles.status}>{detail.status}</Text>
                  </View>
                  <View style={styles.temperatureContainer}>
                    <Text style={styles.temperature}>{detail.temp}</Text>
                  </View>

                  <View style={styles.bottomDetails}>
                    <Text style={styles.city}>{detail.name}</Text>
                    <View style={styles.dateContainer}>
                      <Text style={styles.dayName}>
                        {getDateInfo().dayName}
                      </Text>
                      <Text style={styles.day}>{getDateInfo().dayNumber}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    width: "100vw",
    height: "100vh",
  },
  container: {
    marginVertical: 0,
    marginHorizontal: "auto",
    width: "90%",
  },
  navigationBar: {
    marginTop: "2rem",
    marginRight: "auto",
  },
  detailsContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  detailContainer: {
    marginTop: "1rem",
    color: "white",
    backgroundColor: "#6DC093",
    height: "10rem",
    width: "100%",
    padding: "1rem",
    flexDirection: "column",
    borderRadius: "1rem",
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  temperatureContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  status: {
    flex: 1,
    color: "white",
    fontSize: ".8rem",
  },
  temperature: {
    color: "white",
    fontSize: "6rem",
    letterSpacing: "1rem",
  },
  city: {
    width: "fit-content",
    flex: 1,
    color: "white",
    alignSelf: "flex-end",
  },
  dayName: {
    color: "white",
  },
  day: {
    color: "white",
  },
  icon: {
    height: "2rem",
    width: "2rem",
  },
});
