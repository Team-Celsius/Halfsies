import { Image, Text, ZStack, VStack, Spacer, Pressable } from "native-base";
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
          alt="A yellow background with a hand full of fries with ketchup on then with one fry being taken by another hand"
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
        <Pressable
          textAlign="center"
          borderWidth="3"
          borderColor="violet.800"
          variant="rounded"
          backgroundColor="violet.800"
          color="violet.800"
          p="5"
          m="2"
          onPress={toggleSignIn}
        >
          <Text textAlign="center" color="white">
            {signIn ? "Log In" : "Sign Up"}
          </Text>
        </Pressable>
      </VStack>
    </ZStack>
  );
}
