
import { NativeBaseProvider, VStack, Spacer, Flex } from 'native-base';
import NavBar from './Components/NavBar';
import Participants from './Components/Participants';
import AssignItems from './Components/AssignItems';

export default function App() {
  return (
    <NativeBaseProvider>
          <CameraView />
          <VStack flex={1}>
            <NavBar />
            {/* <Participants /> */}
            <AssignItems />
          </VStack>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

