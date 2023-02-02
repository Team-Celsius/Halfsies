import {
  Image,
  Text,
  ZStack,
  VStack,
  Input,
  Spacer,
  Pressable,
  Button,
} from "native-base";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { useState } from "react";

export default function LoginPage() {
  const [signIn, setSignIn] = useState(false);

  const toggleSignIn = () => {
    setSignIn(!signIn);
  };
  return (
    <ZStack>
      <>
        <Image
          source={require("../../assets/loginPage.jpg")}
          alt="handFull of fies with ketchup on then being taken by another hand"
          style={{ width: "100%", height: "100%" }}
        />
      </>
      <VStack w="100%" h="100%" p="5">
        <Spacer />
        <Text
          alignSelf="center"
          //fontFamily="Copperplate"
          fontSize="65"
          fontWeight="bold"
          color="violet.800"
        >
          Halfsies
        </Text>
        <Spacer />
        <Spacer />
        {signIn ? <SignUpForm /> : <LoginForm />}
        <Button onPress={toggleSignIn}>{signIn ? "Log In" : "Sign Up"}</Button>
      </VStack>
    </ZStack>
  );
}
