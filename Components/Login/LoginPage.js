import {
  Image,
  Text,
  ZStack,
  VStack,
  Input,
  Spacer,
  Pressable,
} from "native-base";
import SignUpForm from "./SignUpForm";

export default function LoginPage() {
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
        {/* <Pressable
          textAlign="center"
          borderWidth="3"
          borderColor="violet.800"
          variant="rounded"
          backgroundColor="white"
          color="violet.800"
          p="5"
          m="2"
        >
          <Text>Log In</Text>
        </Pressable>
        <Pressable
          textAlign="center"
          borderWidth="3"
          borderColor="violet.800"
          variant="rounded"
          backgroundColor="white"
          color="violet.800"
          p="5"
          m="2"
        >
          <Text>Sign Up</Text>
        </Pressable> */}
        <SignUpForm />
      </VStack>
    </ZStack>
  );
}
