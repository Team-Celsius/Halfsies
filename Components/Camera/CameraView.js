import { Button, TouchableOpacity, View, Image, } from "react-native";
import { useState, useRef } from "react";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import { Text, Spacer, VStack } from "native-base";
import { MaterialCommunityIcons, Feather, FontAwesome5 } from "@expo/vector-icons";

export default function CameraView() {
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
      <VStack w="100%" h="80%">
        <Spacer />
        <Text alignSelf="center" fontSize="16">
          We need your permission to access the camera
        </Text>
        <Button onPress={requestPermission} title="Allow camera access" border=""/>
        <Spacer />
      </VStack>
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
          <VStack w="100%" h="100%">
            <Camera ref={cameraRef} flashMode="on" >
              <Text>
                Hold your device directly above the receipt. For optimal image
                processing, flash will be used.
              </Text>
              <TouchableOpacity onPress={takePhoto}>
                <MaterialCommunityIcons
                  name="camera-iris"
                  size={75}
                  color="white"
                  />
              </TouchableOpacity>
              <TouchableOpacity onPress={pickImage}>
                  <Feather name="upload" size={24} color="white" />
                  <Text>Upload</Text>
              </TouchableOpacity>
            </Camera>
          </VStack>
              
      )}
    </View>
  );
}
