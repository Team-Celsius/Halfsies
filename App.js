import { NativeBaseProvider, VStack, Spacer, Flex } from 'native-base';
import NavBar from './Components/NavBar';
import Participants from './Components/Participants';
import AssignItems from './Components/AssignItems';

export default function App() {
  return (
    <NativeBaseProvider>
          <VStack flex={1}>
            <NavBar />
            {/* <Participants /> */}
            <AssignItems />
          </VStack>
    </NativeBaseProvider>
  );
}
