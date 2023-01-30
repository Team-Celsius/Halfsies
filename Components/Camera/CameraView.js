import { Camera, CameraType } from "expo-camera";
import { useState, useRef } from "react";
import { Button, Text, TouchableOpacity, View, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

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

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setCapturedImage(result);
    }
  }

  function retake() {
    setCapturedImage(null);
  }

  function confirmPhoto() {
    setCapturedImage(null);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {capturedImage ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <Image
            source={{ uri: capturedImage.uri }}
            style={{ width: "80%", height: "80%", resizeMode: "contain" }}
          />
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                bottom: 70,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: 100,
                position: "absolute",
              },
            ]}
          >
            <TouchableOpacity
              style={{ flex: 1, alignItems: "center" }}
              onPress={retake}
            >
              <Text style={{ color: "white", fontSize: 28 }}>Try Again</Text>
              <FontAwesome5
                name="redo"
                size={34}
                color="red"
                style={{ top: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, alignItems: "center" }}
              onPress={confirmPhoto} // when we build the next step of the user flow, this will go there
            >
              <Text style={{ color: "white", fontSize: 28 }}>Looks Good!</Text>
              <FontAwesome5
                name="check"
                size={34}
                color="green"
                style={{ top: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Camera style={{ flex: 1 }} type={type} ref={cameraRef} flashMode="on">
          <View style={{ flex: 1, alignItems: "center", top: 65 }}>
            <Text
              style={{
                fontSize: 18,
                color: "white",
                textAlign: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                width: "100%",
              }}
            >
              Hold your device directly above the receipt. For optimal image
              processing, flash will be used.
            </Text>
          </View>

          <View
            style={{
              bottom: 70,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              width: "100%",
              height: 90,
            }}
          >
            <TouchableOpacity
              style={{ flex: 1, alignItems: "center" }}
              onPress={takePhoto}
            >
              <MaterialCommunityIcons
                name="camera-iris"
                size={75}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              bottom: 0,
              right: -200,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flex: 1,
              position: "relative",
              width: "50%",
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 90,
                right: 20,
                width: "50%",
              }}
              onPress={pickImage}
            >
              <View style={{ alignItems: "center" }}>
                <Feather name="upload" size={24} color="white" />
                <Text style={{ color: "white" }}>Upload</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}
