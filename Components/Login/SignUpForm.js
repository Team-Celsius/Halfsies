import { Input, Pressable, Text } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../../Firebase/firebaseConfig";

export default function SignUpForm() {
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

  function writeUserData(userId, email) {
    set(ref(db, "users/" + userId), {
      email: email,
    });
  }

  const onSubmit = (data) => {
    console.log(data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        writeUserData(user.uid, user.email);
      })
      .catch((error) => {
        /******** add something to happen on error **********/
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode: ", errorCode);
        console.log("errorMessage: ", errorMessage);
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
