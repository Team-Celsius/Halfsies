import {
  Box,
  Avatar,
  HStack,
  VStack,
  Text,
  Input,
  Divider,
  ScrollView,
  Pressable,
  Modal,
  FormControl,
  Button,
  Spacer,
  Center,
  AlertDialog,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import randomColor from "randomcolor";
import { useState, useRef, useEffect } from "react";
import NavBar from "./NavBar";
import { auth, db } from "../Firebase/firebaseConfig";
import { ref, set, onValue } from "firebase/database";
import uuid from "react-native-uuid";

export default function Participants() {
  let [friends, setFriends] = useState([
    {
      initials: "SK",
      name: "Steven King",
      email: "email",
      numPaymentRequests: 100,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "JW",
      name: "Justin Wooley",
      email: "email",
      numPaymentRequests: 2000,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "JP",
      name: "Jason Potvin",
      email: "email",
      numPaymentRequests: 4,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "MT",
      name: "Michael Timo",
      email: "email",
      numPaymentRequests: 8,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "AS",
      name: "Andy Smith",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "LS",
      name: "Lauren Smith",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "AC",
      name: "Ashley Campbell",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "RM",
      name: "Rich Merril",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "JL",
      name: "Jeff Lincoln",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "AJ",
      name: "Alexander Joseph",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
    },
    {
      initials: "ZS",
      name: "Zachary Smith",
      email: "email",
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
    },
  ]);

  const userId = auth.currentUser.uid;
  const userFriendsRef = ref(db, "users/" + userId + "/friends/");

  useEffect(() => {
    onValue(userFriendsRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setFriends(Object.values(data));
    });
  }, []);

  let participants = [];
  let favorites = [];
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  function getInitials(firstName, lastName) {
    const fInitial = firstName[0];
    const lInitial = lastName[0];

    return fInitial.concat(lInitial);
  }

  function joinName(firstName, lastName) {
    return firstName + " " + lastName;
  }

  function addfriendData(userId, firstName, lastName, email) {
    const fullName = joinName(firstName, lastName);
    const initials = getInitials(firstName, lastName);

    set(ref(db, "users/" + userId + "/friends/" + fullName), {
      initials: initials,
      name: fullName,
      email: email,
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
    });
  }

  function DeleteFriendAlert(props) {
    const [isOpen, setIsOpen] = useState(false);
    const friend = props.friend;
    const onClose = () => setIsOpen(false);
    let newFriends = [];

    const cancelRef = useRef(null);
    return (
      <Center>
        <Button bg="white" onPress={() => setIsOpen(!isOpen)}>
          <VStack>
            <Spacer />
            <AntDesign name="deleteuser" size={20} color="black" />
            <Spacer />
          </VStack>
        </Button>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Delete Friend</AlertDialog.Header>
            <AlertDialog.Body>
              <Text>
                {" "}
                This will delete all data relating to {friend.name}. This action
                cannot be reversed!
              </Text>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                {/***********Remove friend from db***********/}
                <Button
                  colorScheme="danger"
                  onPress={() => {
                    onClose;
                    friends.map((currentFriend) => {
                      if (currentFriend.name !== friend.name) {
                        newFriends.push(currentFriend);
                      }
                    });
                    setFriends(newFriends);
                  }}
                >
                  Delete
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    );
  }

  function AddFriendForm() {
    const [modalVisible, setModalVisible] = useState(false);
    const [newFriendFirstName, setNewFriendFirstName] = useState("");
    const [newFriendLastName, setNewFriendLastName] = useState("");
    const [newFriendEmail, setNewFriendEmail] = useState("");
    const userUid = auth.currentUser.uid;

    return (
      <>
        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          avoidKeyboard
          justifyContent="space-around"
          bottom="4"
          size="lg"
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Don't let them skip out on the bill!</Modal.Header>
            <Modal.Body>
              <FormControl mt="3">
                <FormControl.Label>Name</FormControl.Label>

                {/* make first name required */}
                <Input
                  onChangeText={(firstName) => {
                    setNewFriendFirstName(firstName);
                  }}
                />
                <Input
                  onChangeText={(lastName) => {
                    setNewFriendLastName(lastName);
                  }}
                />
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  onChangeText={(email) => {
                    setNewFriendEmail(email);
                  }}
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button
                flex="1"
                onPress={() => {
                  setModalVisible(false);
                  //******* Create new friend in data base ******* */
                  addfriendData(
                    userUid,
                    newFriendFirstName,
                    newFriendLastName,
                    newFriendEmail
                  );
                }}
              >
                Add
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <VStack space={8} alignItems="center">
          <Button
            w="50%"
            bg="violet.800"
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            Add a friend!
          </Button>
        </VStack>
      </>
    );
  }

  function FavoriteFriendsSection() {
    //The for/map combo below organizes the friends in order of how many times you've sent them a payment request
    for (let i = 0; i < 4; ++i) {
      let currentHighest = friends[0];

      //while loop below checks to see if currentHighest is already a favorite
      //if it is, it will keep iterating through the friends array till it finds one
      //that is not already a favorite
      while (favorites.includes(currentHighest)) {
        currentHighest = friends[friends.indexOf(currentHighest) + 1];
      }

      friends.map((friend) => {
        if (friends[friends.indexOf(friend) + 1]) {
          let nextFriend = friends[friends.indexOf(friend) + 1];
          if (
            currentHighest.numPaymentRequests <=
              nextFriend.numPaymentRequests &&
            !favorites.includes(nextFriend)
          ) {
            currentHighest = nextFriend;
          }
        }
      });

      if (!favorites.includes(currentHighest)) {
        favorites.push(currentHighest);
      }
    }
    return (
      <>
        {/* The map below renders the sorted favorites array  */}
        {favorites.map((favorite) => {
          return (
            <Box key={uuid.v4()}>
              {/* The pressable code below keeps track of who is selected */}
              <HStack space="3" m="1">
                <Pressable>
                  {({ isPressed }) => {
                    if (isPressed) {
                      favorite.selected = !favorite.selected;
                      if (!participants.includes(favorite)) {
                        participants.push(favorite);
                      } else {
                        participants[participants.indexOf(favorite)] = {};
                      }
                    }
                    return (
                      <>
                        {favorite.selected ? (
                          <AntDesign
                            name="checkcircle"
                            size={47}
                            color="green"
                          />
                        ) : (
                          <Avatar bg={favorite.avatarColor} justify="center">
                            {favorite.initials}
                          </Avatar>
                        )}
                      </>
                    );
                  }}
                </Pressable>
                <VStack>
                  <Spacer />
                  <Text pl="3">{favorite.name}</Text>
                  <Spacer />
                </VStack>
                <Spacer />
                <DeleteFriendAlert friend={favorite} />
              </HStack>
            </Box>
          );
        })}
      </>
    );
  }

  function AlphabeticalFriendsSection() {
    return (
      <>
        {alphabet.map((letter) => {
          return (
            <Box key={uuid.v4()}>
              <Text fontSize="11"> {letter} </Text>
              <Divider w="100%" alignSelf="center" />
              {/* The map below renders the friends array alphabetically  */}
              {friends.map((friend) => {
                if (friend.name[0] === letter && !favorites.includes(friend)) {
                  return (
                    <Box key={uuid.v4()}>
                      {/* The pressable code below keeps track of who is selected */}
                      <HStack space="3" m="1">
                        <Pressable>
                          {({ isPressed }) => {
                            if (isPressed) {
                              friend.selected = !friend.selected;
                              if (!participants.includes(friend)) {
                                participants.push(friend);
                              } else {
                                participants[participants.indexOf(friend)] = {};
                              }
                            }
                            return (
                              <>
                                {friend.selected ? (
                                  <AntDesign
                                    name="checkcircle"
                                    size={47}
                                    color="green"
                                  />
                                ) : (
                                  <Avatar
                                    bg={friend.avatarColor}
                                    justify="center"
                                  >
                                    {friend.initials}
                                  </Avatar>
                                )}
                              </>
                            );
                          }}
                        </Pressable>
                        <VStack flex={1}>
                          <Spacer />
                          <Text justify="center" pl="3">
                            {friend.name}
                          </Text>
                          <Spacer />
                        </VStack>
                        <DeleteFriendAlert friend={friend} />
                      </HStack>
                    </Box>
                  );
                }
              })}
            </Box>
          );
        })}
      </>
    );
  }

  function AlphabeticalSideBar() {
    return (
      <>
        {alphabet.map((letter) => {
          return (
            <Text fontSize="11" key={uuid.v4()}>
              {" "}
              {letter}{" "}
            </Text>
          );
        })}
      </>
    );
  }

  return (
    <>
      <VStack flex={1} space="3">
        <NavBar />
        <AddFriendForm />

        <HStack flex={1}>
          <ScrollView>
            <VStack space="4" pl="3">
              <Text>Favorites</Text>
              <FavoriteFriendsSection friends={friends} />
              <AlphabeticalFriendsSection
                alphabet={alphabet}
                friends={friends}
              />
            </VStack>
          </ScrollView>

          <VStack w="5%">
            <AlphabeticalSideBar alphabet={alphabet} />
          </VStack>
        </HStack>
      </VStack>
    </>
  );
}
