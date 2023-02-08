import { Input, Pressable, Text, Modal, Button, ScrollView } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, push } from "firebase/database";
import { auth, db } from "../../Firebase/firebaseConfig";
import randomColor from "randomcolor";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function SignUpForm() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorText, setErrorText] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  function writeUserData(userId, email) {
    set(ref(db, "users/" + userId), {
      email: email.trim(),
    });
  }

  function getInitials(firstName, lastName) {
    const fInitial = firstName[0];
    const lInitial = lastName[0];

    return fInitial.concat(lInitial);
  }

  function joinName(firstName, lastName) {
    return firstName + " " + lastName;
  }

  function addUserData(userId, firstName, lastName, email) {
    const fullName = joinName(firstName, lastName);
    const initials = getInitials(firstName, lastName);

    const userRef = ref(db, "users/" + userId + "/friends");
    const newUserRef = push(userRef);

    set(newUserRef, {
      userId: newUserRef.key,
      initials: initials,
      name: fullName,
      email: email.trim(),
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: true,
      user: true,
    });
  }

  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email.trim(), data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        writeUserData(user.uid, user.email);
        addUserData(user.uid, data.firstName, data.lastName, data.email);
        navigation.navigate("Participants");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode) {
          console.log(errorCode);
          setErrorText(errorTextCreator(errorCode));
          setModalVisible(true);
        }
      });
  };

  function errorTextCreator(errorCode) {
    if (errorCode === "auth/invalid-email") {
      return "Email invalid";
    } else if (errorCode === "auth/email-already-in-use") {
      return "Sorry email already in use";
    }
  }

  function SignUpError() {
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
    <View>
      <SignUpError />
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
            placeholder="First Name"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && (
        <Text textAlign="center" color="danger.700" fontSize="md">
          Please add a first name
        </Text>
      )}

      <Controller
        control={control}
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
            placeholder="Last Name"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />

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
      {errors.email && (
        <Text textAlign="center" color="danger.700" fontSize="md">
          Please enter a valid email
        </Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 6,
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
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text textAlign="center" color="danger.700" fontSize="md">
          Please enter a password
        </Text>
      )}
      <Text textAlign="center" color="white">
        Password must be over 6 characters
      </Text>

      <Pressable
        textAlign="center"
        borderWidth="3"
        borderColor="violet.800"
        variant="rounded"
        backgroundColor="violet.800"
        color="violet.800"
        p="5"
        m="2"
        onPress={handleSubmit(onSubmit)}
      >
        <Text textAlign="center" color="white">
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
}
