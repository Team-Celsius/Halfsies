
import { Image, Text, ZStack, VStack, Input, Spacer } from 'native-base';


export default function LoginPage() {
  return (
          <ZStack >
            <><Image source={require('../assets/loginPage.jpg')} alt="test" style={{width: '100%', height: '100%'}} /></>
            <VStack w="100%" h="100%" p="5">
              <Spacer />
              <Text alignSelf="center" fontFamily="Copperplate" fontSize="65" fontWeight="bold" color="violet.800">Halfsies</Text>
              <Spacer />
              <Spacer />
              <Input textAlign="center" borderWidth="3" borderColor="violet.800" variant="rounded" backgroundColor="white" color="violet.800" p="5" m="2">Username</Input>
              <Input textAlign="center" borderWidth="3" borderColor="violet.800" variant="rounded" backgroundColor="white" color="violet.800" p="5" m="2">Secret code</Input>
            </VStack>
          </ZStack>
  );
}

