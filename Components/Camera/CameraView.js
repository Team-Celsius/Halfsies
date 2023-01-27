import { Camera, CameraType } from "expo-camera";
import { useEffect, useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CameraView() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setCapturedImage(data);
    }
  }

  function retake() {
    setCapturedImage(null);
  }

  return (
    <View style={styles.container}>
      {capturedImage ? (
        <View style={styles.capturedImageContainer}>
          <Image
            source={{ uri: capturedImage.uri }}
            style={styles.capturedImage}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={retake}>
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <MaterialCommunityIcons
                name="camera-iris"
                size={75}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    bottom: 70,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 100,
    position: "absolute",
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  capturedImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  capturedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  buttonText: {
    color: "white",
  },
});
