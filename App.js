import { NativeBaseProvider } from 'native-base';
import LoginPage from './Components/LoginPage'
import Participants from './Components/Participants';
import AssignItems from './Components/AssignItems';
import CameraView from "./Components/Camera/CameraView";
import { useState } from 'react';


export default function App() {
  const [participants, setParticipants] = useState([{}])
  return (
    <NativeBaseProvider>
        {/* <LoginPage /> */}
        {/* <CameraView /> */}
        {/* <Participants participants={participants} /> */}
        <AssignItems participants={participants} />
    </NativeBaseProvider>
  );
}

