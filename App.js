
import { NativeBaseProvider, VStack, Spacer, Flex } from 'native-base';
import NavBar from './Components/NavBar';
import Participants from './Components/Participants';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Avatars from "./Components/Avatar";
import Example from "./Components/NavBar";
import CameraView from "./Components/Camera/CameraView.js";


export default function App() {
  return (
    <NativeBaseProvider>
          <CameraView />
          <VStack flex={1}>
            <NavBar />
            <Participants />
          </VStack>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

