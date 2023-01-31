import { NativeBaseProvider, Flex} from 'native-base';
import LoginPage from './Components/LoginPage'
import Participants from './Components/Participants';
import AssignItems from './Components/AssignItems';
import CameraView from "./Components/Camera/CameraView";


export default function App() {
  return (
    <NativeBaseProvider>
      <Flex>
        {/* <LoginPage /> */}
        <CameraView />
        {/* <Participants /> */}
        {/* <AssignItems /> */}
      </Flex>
    </NativeBaseProvider>
  );
}

