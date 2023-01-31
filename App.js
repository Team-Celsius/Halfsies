
import { NativeBaseProvider} from 'native-base';
import LoginPage from './Components/LoginPage'
import NavBar from './Components/NavBar';
import Participants from './Components/Participants';
import AssignItems from './Components/AssignItems';
import CameraView from "./Components/Camera/CameraView";


export default function App() {
  return (
    <NativeBaseProvider>
          <NavBar />
          <CameraView />
          {/* <LoginPage /> */}
          {/* <Participants /> */}
          {/* <AssignItems /> */}
        
    </NativeBaseProvider>
  );
}

