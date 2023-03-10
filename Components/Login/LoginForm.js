import {
  Input,
  KeyboardAvoidingView,
  Text,
  Modal,
  Button,
  ScrollView,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function LoginForm() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email.trim(), data.password)
      .then((userCredential) => {
        navigation.navigate("Camera");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        setErrorText(errorTextCreator(errorCode));
        setModalVisible(true);
      });
  };

  function errorTextCreator(errorCode) {
    if (errorCode === "auth/invalid-email") {
      return "Email is invalid.";
    } else if (errorCode === "auth/user-not-found") {
      return "User not found, please try again.";
    } else if (errorCode === "auth/wrong-password") {
      return "Wrong password, please try again.";
    }
  }

  function LogInError() {
    return (
      <>
        <Modal isOpen={modalVisible} onClose={setModalVisible} size="sm">
          <Modal.Content maxH="212">
            <Modal.CloseButton />
            <Modal.Header>Error</Modal.Header>
            <Modal.Body>
              <ScrollView>
                <Text>{errorText}</Text>
              </ScrollView>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  backgroundColor="violet.800"
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  Close
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  }

  return (
    <KeyboardAvoidingView behavior="padding">
      <LogInError />
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^\S+@\S+/i,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            textAlign="center"
            borderWidth="3"
            borderColor="violet.800"
            variant="rounded"
            backgroundColor="white"
            color="violet.800"
            p="5"
            m="2"
            placeholder="Email"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && <Text textAlign="center">Email is required.</Text>}
      <View w="100%" alignItems="center">
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 1,
            maxLength: 100,
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              textAlign="center"
              borderWidth="3"
              borderColor="violet.800"
              variant="rounded"
              backgroundColor="white"
              color="violet.800"
              p="5"
              m="2"
              placeholder="Password"
              onChangeText={onChange}
              value={value}
              type={show ? "text" : "password"}
              InputRightElement={
                <Button
                  size="xs"
                  backgroundColor="white"
                  onPress={handleClick}
                  ml="-15%"
                >
                  {show ? (
                    <Feather name="eye-off" size={24} color="gray" />
                  ) : (
                    <Feather name="eye" size={24} color="gray" />
                  )}
                </Button>
              }
            />
          )}
          name="password"
        />
        {errors.password && <Text>Please enter password</Text>}
      </View>

      <Button
        w="93%"
        alignSelf="center"
        backgroundColor="violet.800"
        p="5"
        m="2"
        onPress={handleSubmit(onSubmit)}
      >
        <Text alignSelf="center" color="white">
          Log In
        </Text>
      </Button>
    </KeyboardAvoidingView>
  );
}
