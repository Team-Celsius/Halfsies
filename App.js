import "react-native-gesture-handler";
import { NativeBaseProvider, Flex } from "native-base";
import LoginPage from "./Components/Login/LoginPage";
import Participants from "./Components/Participants";
import AssignItems from "./Components/AssignItems";
import CameraView from "./Components/Camera/CameraView";
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
      initials: "SK",
      name: "Steven King",
      email: "email",
      numPaymentRequests: 100,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "JW",
      name: "Justin Wooley",
      email: "email",
      numPaymentRequests: 2000,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "JP",
      name: "Jason Potvin",
      email: "email",
      numPaymentRequests: 4,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "MT",
      name: "Michael Timo",
      email: "email",
      numPaymentRequests: 8,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "AS",
      name: "Andy Smith",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
    },
  ]);
  const [friends, setFriends] = useState([
    {
      initials: "SK",
      name: "Steven King",
      email: "email",
      numPaymentRequests: 100,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "JW",
      name: "Justin Wooley",
      email: "email",
      numPaymentRequests: 2000,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "JP",
      name: "Jason Potvin",
      email: "email",
      numPaymentRequests: 4,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "MT",
      name: "Michael Timo",
      email: "email",
      numPaymentRequests: 8,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "AS",
      name: "Andy Smith",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "LS",
      name: "Lauren Smith",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "AC",
      name: "Ashley Campbell",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "RM",
      name: "Rich Merril",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "JL",
      name: "Jeff Lincoln",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "AJ",
      name: "Alexander Joseph",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "ZS",
      name: "Zachary Smith",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
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
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
