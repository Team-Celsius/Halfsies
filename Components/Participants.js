import { Avatar, HStack, VStack, Text, Input, Spacer, Divider, ScrollView } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import NavBar from "./NavBar";

export default function Participants() {

  const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  const friends = [
    {
      initials: "SK",
      paymentHandle: "@therealsteven",
      name: "Steven King"
    },
    {
      initials: "JW",
      paymentHandle: "@justinw",
      name: "Justin Wooley"
    },
    {
      initials: "JP",
      paymentHandle: "@jasonp",
      name: "Jason Potvin"
    },
    {
      initials: "MT",
      paymentHandle: "@michaeltheboss",
      name: "Michael Timo"
    }
  ]

  function AlphabeticalFriendsSection(props) {
    let alphabet = props.alphabet
    let friends = props.friends
    return(<>
      {alphabet.map(letter => {
        return (<>
          <Text fontSize="11" key={letter}> {letter} </Text>
          {friends.map(friend => {
            if(friend.name[0] === letter) {
              return (<>
                <HStack space="3" m="1"> 
                  <Avatar bg="green.500">{friend.initials}</Avatar>
                  <VStack> 
                    <Text>{friend.paymentHandle}</Text>
                    <Text pl="3">{friend.name}</Text>
                  </VStack>
                </HStack>
              </>)
            }
          })}
          <Divider w="100%" alignSelf="center"/>
        </>)})}
    </>)
  }

  function AlphabeticalSideBar(props) {
    let alphabet = props.alphabet
    return (<>
      {alphabet.map(letter => {
        return (<>
          <Text fontSize="11" key={letter}> {letter} </Text>
        </>)
      })}
    </>)
  }

  return (<>
    <VStack flex={1} space="3">

      <NavBar />

      {/* Add via Name/Payment/QR/NFC/ handle section */}
      <Input alignSelf="center" textAlign="center" size="2xl" w="85%" borderWidth="3" borderColor="violet.800" variant="rounded">Name or @paymentHandle</Input>

      <HStack pl="8" pr="8">    
        <MaterialIcons name="qr-code-scanner" size={40} color="black" />
        <VStack><Spacer /><Text pl="3">Add via QR Code</Text><Spacer /></VStack>
        <Spacer />
        <MaterialCommunityIcons name="cellphone-nfc" size={40} color="black" />
        <VStack><Spacer /><Text pl="1">Add via NFC</Text><Spacer /></VStack>
      </HStack>

      <HStack flex={1}>
        <ScrollView>
          <VStack space="4" pl="3">

            {/* Favorite contacts section */}
            <Text>Favorites</Text>
            <HStack space="3"> 
              <Avatar bg="green.500">JW</Avatar>
              <VStack> 
                <Text>@justinw</Text>
                <Text pl="3">Justin Wooley</Text>
              </VStack>
            </HStack>
            <HStack space="3"> 
              <Avatar bg="blue.500">JP</Avatar>
              <VStack> 
                <Text>@jasonp</Text>
                <Text pl="3">Jason Potvin</Text>
              </VStack>
            </HStack>
            <HStack space="3"> 
              <Avatar bg="red.500">MT</Avatar>
              <VStack> 
                <Text>@michaeltheboss</Text>
                <Text pl="3">Michael Timo</Text>
              </VStack>
            </HStack>
            <HStack space="3"> 
              <Avatar bg="yellow.500">SK</Avatar>
              <VStack> 
                <Text>@therealsteven</Text>
                <Text pl="3">Steven King</Text>
              </VStack>
            </HStack>
            <Divider w="100%" alignSelf="center"/>

            <AlphabeticalFriendsSection alphabet={alphabet} friends={friends}/>

          </VStack>
        </ScrollView>

        <VStack w="5%">
          <AlphabeticalSideBar alphabet={alphabet} />
        </VStack>

      </HStack>
    </VStack></>
  )
}