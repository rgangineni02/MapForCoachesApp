import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const sportsData = [
  {
    id: 1,
    name: "Football",
    progress: "1 of 6",
    image: require("../assets/login-bg-1.png"), // Correct image paths
  },
  {
    id: 2,
    name: "Basketball",
    progress: "0 of 6",
    image: require("../assets/login-bg-4.png"),
  },
  {
    id: 3,
    name: "Soccer",
    progress: "0 of 6",
    image: require("../assets/login-bg-2.png"),
  },
  {
    id: 4,
    name: "Volleyball",
    progress: "0 of 6",
    image: require("../assets/login-bg-3.png"),
  },
];

const HomeScreen = ({ navigation }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleStartQuestionnaire = (sportName) => {
    navigation.navigate("Questionnaire", { sportName }); // Navigate to the questionnaire screen
  };

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {/* Sidebar */}
      {isSidebarVisible && (
        <View style={styles.sidebar}>
          {/* Close Button */}
          <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>
          {/* User Info */}
          <View style={styles.userInfo}>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }} // Placeholder for user image
              style={styles.userImage}
            />
            <Text style={styles.userName}>R Gangineni</Text>
            <Text style={styles.userEmail}>ravali.gangineni@slu.edu</Text>
          </View>
          {/* Navigation Links */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Home")}
          >
            <Icon name="home-outline" size={20} color="#007bff" />
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => alert("Help Section")}
          >
            <Icon name="help-circle-outline" size={20} color="#007bff" />
            <Text style={styles.menuText}>Help</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main Content */}
      <View style={{ flex: 1 }}>
        {/* Sidebar Toggle Button */}
        {!isSidebarVisible && (
          <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
            <Icon name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        )}

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.grid}>
            {sportsData.map((sport) => (
              <View key={sport.id} style={styles.card}>
                <Image source={sport.image} style={styles.image} />
                <Text style={styles.title}>{sport.name}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleStartQuestionnaire(sport.name)}
                >
                  <Text style={styles.buttonText}>START QUESTIONNAIRE</Text>
                </TouchableOpacity>
                <Text style={styles.progress}>
                  Progress: {sport.progress}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: (width - 60) / 2, // Two cards per row with margin
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  progress: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  sidebar: {
    backgroundColor: "#333",
    width: 250,
    padding: 20,
    height: "100%",
    position: "absolute",
    zIndex: 10,
  },
  closeButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    color: "#ccc",
    fontSize: 14,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    marginBottom: 10,
  },
  menuText: {
    marginLeft: 10,
    color: "#007bff",
    fontSize: 16,
  },
  menuButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    margin: 10,
  },
});

export default HomeScreen;
