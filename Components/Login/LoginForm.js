import { Alert, Input, Pressable, Text } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function LoginForm() {
  const navigation = useNavigation();

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
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Participants");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^\S+@\S+$/i,
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
      {errors.email && <Text>Email is required.</Text>}

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
      {errors.password && <Text>Password is required.</Text>}
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
          Log In
        </Text>
      </Pressable>
    </View>
  );
}
