import { NativeBaseProvider } from 'native-base';
import LoginPage from './Components/LoginPage'
import Participants from './Components/Participants';
import AssignItems from './Components/AssignItems';
import CameraView from "./Components/Camera/CameraView";
import { useState } from 'react';
import randomColor from 'randomcolor';


export default function App() {
  const [participants, setParticipants] = useState([{
    initials: "SK",
    name: "Steven King",
    email: "email",
    numPaymentRequests: 100,
    avatarColor: randomColor(),
    selected: false
  },
  {
    initials: "JW",
    name: "Justin Wooley",
    email: "email",
    numPaymentRequests: 2000,
    avatarColor: randomColor(),
    selected: false
  },
  {
    initials: "JP",
    name: "Jason Potvin",
    email: "email",
    numPaymentRequests: 4,
    avatarColor: randomColor(),
    selected: false
  },
  {
    initials: "MT",
    name: "Michael Timo",
    email: "email",
    numPaymentRequests: 8,
    avatarColor: randomColor(),
    selected: false
  },
  {
    initials: "AS",
    name: "Andy Smith",
    email: "email",
    numPaymentRequests: 0,
    avatarColor: randomColor(),
    selected: false
  }])
  const [friends, setFriends] = useState([
    {
      initials: "SK",
      name: "Steven King",
      email: "email",
      numPaymentRequests: 100,
      avatarColor: randomColor(),
      selected: false
    },
    {
      initials: "JW",
      name: "Justin Wooley",
      email: "email",
      numPaymentRequests: 2000,
      avatarColor: randomColor(),
      selected: false
    },
    {
      initials: "JP",
      name: "Jason Potvin",
      email: "email",
      numPaymentRequests: 4,
      avatarColor: randomColor(),
      selected: false
    },
    {
      initials: "MT",
      name: "Michael Timo",
      email: "email",
      numPaymentRequests: 8,
      avatarColor: randomColor(),
      selected: false
    },
    {
      initials: "AS",
      name: "Andy Smith",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false
    },
    {
      initials: "LS",
      name: "Lauren Smith",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false
    },
    {
      initials: "AC",
      name: "Ashley Campbell",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false
    },
    {
      initials: "RM",
      name: "Rich Merril",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false
    },
    {
      initials: "JL",
      name: "Jeff Lincoln",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false
    },
    {
      initials: "AJ",
      name: "Alexander Joseph",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false
    },
    {
      initials: "ZS",
      name: "Zachary Smith",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false
    }
  ])
  return (
    <NativeBaseProvider>
        {/* <LoginPage /> */}
        {/* <CameraView /> */}
        {/* <Participants setFriends={setFriends} friends={friends}  participants={participants} setParticipants={setParticipants} /> */}
        <AssignItems participants={participants}/>
    </NativeBaseProvider>
  );
}

