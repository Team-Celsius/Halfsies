import "react-native-gesture-handler";
import { NativeBaseProvider, Flex } from "native-base";
import LoginPage from "./Components/Login/LoginPage";
import Participants from "./Components/Participants";
import AssignItems from "./Components/AssignItems";
import CameraView from "./Components/Camera/CameraView";
import BalancePage from "./Components/BalancePage";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebaseConfig";
import { useState } from "react";
import randomColor from "randomcolor";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

  const [participants, setParticipants] = useState([
    {
      userId: "",
      initials: "",
      name: "",
      email: "",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
      items: [],
    },
  ]);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator initialRouteName="LogIn">
          <Stack.Screen
            name="LogIn"
            component={LoginPage}
            options={{ title: "Log In" }}
          />
          <Stack.Screen name="Camera" component={CameraView} />
          <Stack.Screen name="Participants" component={Participants} />
          <Stack.Screen name="AssignItems" component={AssignItems} />
          <Stack.Screen name="BalancePage" component={BalancePage} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
