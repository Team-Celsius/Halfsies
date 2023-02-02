import { NativeBaseProvider } from 'native-base';
import LoginPage from './Components/LoginPage'
import Participants from './Components/Participants';
import AssignItems from './Components/AssignItems';
import CameraView from "./Components/Camera/CameraView";


export default function App() {
  return (
    <NativeBaseProvider>
        {/* <LoginPage /> */}
        {/* <CameraView /> */}
        <Participants />
        {/* <AssignItems /> */}
    </NativeBaseProvider>
  );
}

