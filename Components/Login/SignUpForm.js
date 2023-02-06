import { Input, Pressable, Text } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../../Firebase/firebaseConfig";
import randomColor from "randomcolor";

export default function SignUpForm() {
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
      email: email,
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

  function addfriendData(userId, firstName, lastName, email) {
    const fullName = joinName(firstName, lastName);
    const initials = getInitials(firstName, lastName);

    set(ref(db, "users/" + userId + "/friends/" + fullName), {
      initials: initials,
      name: fullName,
      email: email,
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: true,
      user: true,
    });
  }

  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        writeUserData(user.uid, user.email);
        addfriendData(user.uid, data.firstName, data.lastName, data.email);
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
      {errors.email && <Text>Email is required.</Text>}

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
      {errors.email && <Text>Email is required.</Text>}

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
