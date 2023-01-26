import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import Avatars from "./Components/Avatar";
import Example from "./Components/NavBar";
import CameraView from "./Components/Camera/CameraView.js";

export default function App() {
  return (
    <NativeBaseProvider>
      <CameraView />
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
