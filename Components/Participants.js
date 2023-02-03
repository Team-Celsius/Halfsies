import { Avatar, HStack, VStack, Text, Input, Divider, ScrollView, Pressable, Modal, FormControl, Button } from "native-base";
import { useState } from "react";
import randomColor from "randomcolor";
import NavBar from "./NavBar";
//I need to find a way to get it where it doesnt select a person while I am scrolling
export default function Participants() {
  let participants = []
  let favorites = []
  const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  let [friends, setFriends] = useState([
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

  function AddFriendForm() {
    const [modalVisible, setModalVisible] = useState(false);
    const [newFriendName, setNewFriendName] = useState('')
    const [newFriendEmail, setNewFriendEmail] = useState('')

    return <>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="space-around" bottom="4" size="lg">
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header >Don't let them skip out on the bill!</Modal.Header>
            <Modal.Body>
              <FormControl mt="3">
                <FormControl.Label>Name</FormControl.Label>
                <Input onChangeText={(name) => {setNewFriendName(name); console.log(name)}}/>
                <FormControl.Label>Email</FormControl.Label>
                <Input onChangeText={(email) => {setNewFriendEmail(email); console.log(email)}}/>
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button flex="1" onPress={() => {
              setModalVisible(false);
              setFriends([...friends, {
                initials: "JL",
                name: newFriendName,
                email: newFriendEmail,
                numPaymentRequests: 0,
                avatarColor: randomColor(),
                selected: false
              }]);
            }}>
                Add
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <VStack space={8} alignItems="center">
          <Button w="50%" bg="violet.800" onPress={() => {
          setModalVisible(!modalVisible);
        }}>
            Add a friend!
          </Button>
        </VStack>
      </>;
  }
  function FavoriteFriendsSection() {
    
    //The for/map combo below organizes the friends in order of how many times you've sent them a payment request
    for(let i = 0; i < 4; ++i) {

      let currentHighest = friends[0]

      //while loop below checks to see if currentHighest is already a favorite
      //if it is, it will keep iterating through the friends array till it finds one
      //that is not already a favorite
      while(favorites.includes(currentHighest)) {
        currentHighest = friends[friends.indexOf(currentHighest) + 1]
      }

      friends.map(friend => {
        if(friends[friends.indexOf(friend) + 1]) {
          let nextFriend = friends[friends.indexOf(friend) + 1]
          if((currentHighest.numPaymentRequests <= nextFriend.numPaymentRequests) && (!favorites.includes(nextFriend))){
            currentHighest = nextFriend
          }
        }
      })

      if((!favorites.includes(currentHighest))) {
        favorites.push(currentHighest)
      }
    }
    return(<>
      {/* The map below renders the sorted favorites array  */}
      {favorites.map(favorite => {
        return(<>
        {/* The pressable code below keeps track of who is selected */}
        <Pressable>
        {({isPressed}) => {
          if(isPressed) {
            favorite.selected = !favorite.selected
            if(!participants.includes(favorite)) {
              participants.push(favorite)
            }
            else {
              participants[participants.indexOf(favorite)] = {}
            }
          }
          return (<>
            <HStack space="3" m="1"  bg={favorite.selected ? "green.400" : "white"}>
              <Avatar bg={favorite.avatarColor}>{favorite.initials}</Avatar>
              <VStack> 
                <Text>{favorite.paymentHandle}</Text>
                <Text pl="3">{favorite.name}</Text>
              </VStack>
            </HStack>
          </>)
          }}
        </Pressable>
        </>)
      })}
    </>)}

function AlphabeticalFriendsSection() {
  return(<>
    {alphabet.map(letter => { 
      return (<>
        <Text fontSize="11" key={letter}> {letter} </Text>
        <Divider w="100%" alignSelf="center"/>
        {/* The map below renders the friends array alphabetically  */}
        {friends.map(friend => {
          if((friend.name[0] === letter) && (!favorites.includes(friend))) {
            return(<>
              {/* The pressable code below keeps track of who is selected */}
              <Pressable>
                {({isPressed}) => {
                  if(isPressed) {
                    friend.selected = !friend.selected
                    if(!participants.includes(friend)) {
                      participants.push(friend)
                    }
                    else {
                      participants[participants.indexOf(friend)] = {}
                    }
                  }
                  return (<>
                    <HStack space="3" m="1" bg={friend.selected ? "green.400" : "white"}> 
                      <Avatar bg={friend.avatarColor}>{friend.initials}</Avatar>
                      <VStack> 
                        <Text pl="3">{friend.name}</Text>
                      </VStack>
                    </HStack>
                  </>)
                }}
              </Pressable>
            </>)
          }
        })}
      </>)
    })}
  </>)
}

  function AlphabeticalSideBar() {
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
      <AddFriendForm />

      <HStack flex={1}>

        <ScrollView>
          <VStack space="4" pl="3">
            <Text>Favorites</Text>
            <FavoriteFriendsSection friends={friends} />
            <AlphabeticalFriendsSection alphabet={alphabet} friends={friends} />
          </VStack>
        </ScrollView>

        <VStack w="5%">
          <AlphabeticalSideBar alphabet={alphabet} />
        </VStack>

      </HStack>

    </VStack></>
  )
}