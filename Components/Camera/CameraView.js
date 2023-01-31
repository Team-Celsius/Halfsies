import { Camera } from "expo-camera";
import { useState, useRef } from "react";
import {TouchableOpacity, View, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Spacer, IconButton, Factory, HStack, Button, Alert, Text } from "native-base";

export default function CameraView() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);
  const ExpoCamera = Factory(Camera);


  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={{flex: 1, justifyContent: "center"}}>
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
      <ExpoCamera h="100%" w="100%" ref={cameraRef} flashMode="on">
        <Spacer />
        <Spacer />
        <HStack alignSelf="center" mb="10">
          <Spacer /><Spacer /><Spacer />
          <IconButton onPress={takePhoto} icon={<MaterialCommunityIcons name="camera-iris" size={75} color="white" />} />
          <IconButton onPress={pickImage} icon={<Feather name="upload" size={24} color="white" />} />
          <Spacer /><Spacer />
        </HStack>
        <Alert bgColor="violet.800" ><Text color="white">Hold your device level above the receipt.</Text><Text color="white">For optimal image processing, camera flash is used.</Text></Alert>
      </ExpoCamera>
      )}
    </View>
)}
