import "intl";
import "intl/locale-data/jsonp/en";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Button } from "native-base";
import CameraView from "./Components/Camera/CameraView";
import LoginPage from "./Components/Login/LoginPage";
import Participants from "./Components/Participants";
import AssignItems from "./Components/AssignItems";
import { onAuthStateChanged } from "firebase/auth";
import { FontAwesome } from "@expo/vector-icons";
import { auth } from "./Firebase/firebaseConfig";
import Summary from "./Components/Summary";
import "react-native-gesture-handler";
import { useState } from "react";
import { LogBox } from "react-native";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

//This hides all the yellow warnings
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
      const uid = user.uid;
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LogIn">
          <Stack.Screen
            name="LogIn"
            component={LoginPage}
            options={{ title: "Log In", headerShown: false }}
          />
          <Stack.Screen
            name="Camera"
            component={CameraView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Participants"
            component={Participants}
            options={({ navigation }) => ({
              title: "Participants",
              headerStyle: {
                backgroundColor: "#5B21B6",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: () => (
                <Button
                  onPress={() => {
                    navigation.navigate("Camera");
                  }}
                  bgColor="transparent"
                >
                  <FontAwesome name="camera-retro" size={30} color="white" />
                </Button>
              ),
            })}
          />
          <Stack.Screen
            name="AssignItems"
            component={AssignItems}
            options={({ navigation }) => ({
              title: "Assign Items",
              headerStyle: {
                backgroundColor: "#5B21B6",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: () => (
                <Button
                  onPress={() => {
                    navigation.navigate("Camera");
                  }}
                  bgColor="transparent"
                >
                  <FontAwesome name="camera-retro" size={30} color="white" />
                </Button>
              ),
            })}
          />
          <Stack.Screen
            name="Summary"
            component={Summary}
            options={({ navigation, route }) => ({
              title: "Summary",
              headerStyle: {
                backgroundColor: "#5B21B6",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: () => (
                <Button
                  onPress={() => {
                    navigation.navigate("Camera");
                  }}
                  bgColor="transparent"
                >
                  <FontAwesome name="camera-retro" size={30} color="white" />
                </Button>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
