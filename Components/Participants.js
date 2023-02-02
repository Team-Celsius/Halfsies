import { Avatar, HStack, VStack, Text, Input, Spacer, Divider, ScrollView } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import NavBar from "./NavBar";
import randomColor from "randomcolor";

export default function Participants() {

  const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  const friends = [
    {
      initials: "SK",
      paymentHandle: "@therealsteven",
      name: "Steven King",
      favoritesCounter: 1,
      avatarColor: randomColor()
    },
    {
      initials: "JW",
      paymentHandle: "@justinw",
      name: "Justin Wooley",
      favoritesCounter: 2,
      avatarColor: randomColor()
    },
    {
      initials: "JP",
      paymentHandle: "@jasonp",
      name: "Jason Potvin",
      favoritesCounter: 4,
      avatarColor: randomColor()
    },
    {
      initials: "MT",
      paymentHandle: "@michaeltheboss",
      name: "Michael Timo",
      favoritesCounter: 3,
      avatarColor: randomColor()
    }
  ]

  function FavoriteFriendsSection(props) {
    let friends = props.friends
    let favorites = []

    for(let i = 0; i < 4; ++i) {
      let currentHighest = friends[0]
      let currentHighestIndex = 0

      friends.map(friend => {
        if(friends[friends.indexOf(friend) + 1]) {
          let nextFriend = friends[friends.indexOf(friend) + 1]
          if(currentHighest.favoritesCounter <= nextFriend.favoritesCounter) {
            currentHighest = nextFriend
            currentHighestIndex = friends.indexOf(nextFriend)
          }
        }
      })
      favorites.push(currentHighest)
      friends[currentHighestIndex].favoritesCounter = 0
    }
    return(<>
      {favorites.map(friend => {
        return(<>
          <HStack space="3" m="1"> 
            <Avatar bg={friend.avatarColor}>{friend.initials}</Avatar>
            <VStack> 
              <Text>{friend.paymentHandle}</Text>
              <Text pl="3">{friend.name}</Text>
            </VStack>
          </HStack>
        </>)
      })}
    </>)}

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
                  <Avatar bg={friend.avatarColor}>{friend.initials}</Avatar>
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
            <Text>Favorites</Text>
            <FavoriteFriendsSection friends={friends}/>
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