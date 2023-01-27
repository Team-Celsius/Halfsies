import { NativeBaseProvider, VStack, Spacer, Flex } from 'native-base';
import NavBar from './Components/NavBar';
import Participants from './Components/Participants';

export default function App() {
  return (
    <NativeBaseProvider>
          <VStack flex={1} space="4">
            <NavBar />
            <Participants />
          </VStack>
    </NativeBaseProvider>
  );
}
