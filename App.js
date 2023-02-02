import { NativeBaseProvider, Flex } from "native-base";
import LoginPage from "./Components/Login/LoginPage";
import Participants from "./Components/Participants";
import AssignItems from "./Components/AssignItems";
import CameraView from "./Components/Camera/CameraView";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebaseConfig";
import { useState } from "react";

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
    <NativeBaseProvider>
      <Flex>
        {isLoggedIn ? <CameraView /> : <LoginPage />}
        {/* <CameraView /> */}
        {/* <Participants /> */}
        {/* <AssignItems /> */}
      </Flex>
    </NativeBaseProvider>
  );
}
