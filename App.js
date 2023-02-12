import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import LoginPage from "./Components/Login/LoginPage";
import Participants from "./Components/Participants";
import AssignItems from "./Components/AssignItems";
import CameraView from "./Components/Camera/CameraView";
import BalancePage from "./Components/BalancePage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebaseConfig";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "intl";
import "intl/locale-data/jsonp/en";

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
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator initialRouteName="LogIn">
          <Stack.Screen
            name="LogIn"
            component={LoginPage}
            options={{ title: "Log In" }}
          />
          <Stack.Screen name="Camera" component={CameraView} />
          <Stack.Screen
            name="Participants"
            component={Participants}
            options={{ title: "Who are we splitting with?" }}
          />
          <Stack.Screen
            name="AssignItems"
            component={AssignItems}
            options={{ title: "Assign Items" }}
          />
          <Stack.Screen name="BalancePage" component={BalancePage} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
