import {
  Spacer,
  IconButton,
  Factory,
  HStack,
  Alert,
  Text,
  VStack,
  ZStack,
  Image,
  Flex,
  View,
} from "native-base";
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
  SimpleLineIcons,
} from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import { useState, useRef } from "react";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import processOcrRequest from "../../OCR/GCV.js";

export default function CameraView() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const [userUploaded, setUserUploaded] = useState(false);
  const cameraRef = useRef(null);
  const ExpoCamera = Factory(Camera);
  const navigation = useNavigation();

  if (!permission) {
    // Camera permissions are still loading
    return <Flex />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    // requestPermission(); automatically requests permissions
    // for some reason, pressing the btn doesnt work on my end :(
    return (
      <VStack h="100%">
        <Spacer />
        <Text alignSelf="center">
          Click the icon below to allow Camera access
        </Text>
        <IconButton
          icon={
            <SimpleLineIcons
              name="camera"
              size={25}
              color="black"
              onPress={requestPermission}
            />
          }
        />
        <Spacer />
      </VStack>
    );
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      data.isUserTaken = false;
      setCapturedImage(data);
    }
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });

    if (!result.canceled) {
      result.isUserTaken = true;
      setCapturedImage(result);
      setUserUploaded = true;
    }
  }

  function retake() {
    setCapturedImage(null);
  }

  async function confirmPhoto() {
    let ocrResults = await processOcrRequest(capturedImage);
    setCapturedImage(null);
    if (ocrResults.items[0]) {
      navigation.navigate("Participants", { ocrResults: ocrResults }); // nav to participants
    }
    // Else, retake the image, prompt w/ a message 'please try again' ?
  }

  return capturedImage ? (
    <>
      <ZStack>
        <>
          <Image
            source={{ uri: capturedImage.uri }}
            style={{ height: "100%", width: "100%" }}
            alt="Image captured"
          />
        </>
        <VStack w="100%" h="100%">
          <Spacer />
          <HStack alignSelf="center" mb="10">
            <Spacer />
            <View>
              <FontAwesome5 name="redo" size={56} color="white" />
              <FontAwesome5
                onPress={retake}
                name="redo"
                size={52}
                color="red"
                style={{
                  position: "absolute",
                  transform: [{ translateX: 2 }, { translateY: 2 }],
                }}
              />
            </View>
            <Spacer />
            <View>
              <FontAwesome5 name="check" size={56} color="white" />
              {/* sets a white icon behind the colored, was pretty unreadable
              previously, could be a transparent bar behind both icons or something tho */}
              <FontAwesome5
                onPress={confirmPhoto}
                name="check"
                size={52}
                color="green"
                style={{
                  position: "absolute",
                  transform: [{ translateX: 2 }, { translateY: 2 }],
                }}
              />
            </View>
            <Spacer />
          </HStack>
        </VStack>
      </ZStack>
    </>
  ) : (
    <>
      <ExpoCamera h="100%" w="100%" ref={cameraRef} flashMode="on">
        <Spacer />
        <HStack mb="5">
          <Spacer />
          <Spacer />
          <Spacer />
          <IconButton
            onPress={takePhoto}
            icon={
              <MaterialCommunityIcons
                name="camera-iris"
                size={75}
                color="white"
              />
            }
          />
          <IconButton
            onPress={pickImage}
            icon={<Feather name="upload" size={24} color="white" />}
          />
          <Spacer />
          <Spacer />
        </HStack>
        <Alert bgColor="violet.900">
          <Text alignSelf="center" color="white">
            Hold your device level above the receipt.
          </Text>
          <Text color="white">
            For optimal image processing, camera flash is used.
          </Text>
        </Alert>
      </ExpoCamera>
    </>
  );
}
