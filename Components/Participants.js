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
import { auth, db } from "../Firebase/firebaseConfig";
import { ref, set, onValue, remove, push } from "firebase/database";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

export default function Participants() {
  const navigation = useNavigation();
  let [newFriends, setNewFriends] = useState([]);

  const userId = auth.currentUser.uid;
  const userFriendsRef = ref(db, "users/" + userId + "/friends/");

  useEffect(() => {
    onValue(userFriendsRef, (snapshot) => {
      const data = snapshot.val();
      if (
        Object.values(data).some((e) =>
          Object.keys(e).some((e) => e === "name")
        )
      ) {
        setNewFriends(Object.values(data));
      } else {
        setNewFriends([data]);
      }
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

  //fix if input one if just have first name
  function getInitials(firstName, lastName) {
    if (lastName) {
      const fInitial = firstName[0];
      const lInitial = lastName[0];

      return fInitial.concat(lInitial);
    } else {
      return firstName[0];
    }
  }

  //fix for if theres only one name
  function joinName(firstName, lastName) {
    return firstName + " " + lastName;
  }

  function addfriendData(userId, firstName, lastName, email) {
    const fullName = joinName(firstName, lastName);
    const initials = getInitials(firstName, lastName);

    const friendRef = ref(db, "users/" + userId + "/friends");
    const newFriendRef = push(friendRef);

    set(newFriendRef, {
      userId: newFriendRef.key,
      initials: initials,
      name: fullName,
      email: email,
      numPaymentRequests: 0,
      avatarColor: randomColor(),
      selected: false,
    });
  }

  function addUserToParticipants(friends) {
    friends.forEach((friend) => {
      if (friend.selected) {
        participants.push(friend);
      }
    });
  }

  addUserToParticipants(newFriends);

  function ConfirmButton() {
    return (
      <VStack space={8} alignItems="center">
        <Button
          bg="violet.800"
          onPress={() => {
            navigation.navigate("AssignItems", { participants: participants });
          }}
        >
          Confirm
        </Button>
      </VStack>
    );
  }

  function DeleteFriendAlert(props) {
    const [isOpen, setIsOpen] = useState(false);
    const friend = props.friend;
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef(null);

    return (
      <Center>
        <Button bg="transparent" onPress={() => setIsOpen(!isOpen)}>
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
                <Button
                  colorScheme="danger"
                  onPress={() => {
                    onClose;
                    const friendRef = ref(
                      db,
                      "users/" + userId + "/friends/" + friend.userId
                    );
                    remove(friendRef);
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
          avoidKeyboard="true"
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
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
        </Modal>
        <VStack space={8} alignItems="center">
          <Button
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

  function FavoriteFriendsSection(props) {
    const friends = props.friends;

    const createFavorites = (friends) => {
      const sortedFriends = friends.sort(
        (a, b) => b.numPaymentRequests - a.numPaymentRequests
      );

      for (let i = 0; i < 4; i++) {
        if (sortedFriends[i]) {
          favorites.push(sortedFriends[i]);
        }
      }
    };

    createFavorites(friends);

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
                        participants = participants.filter((friend) => {
                          return friend != favorite;
                        });
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
                {favorite.user ? null : <DeleteFriendAlert friend={favorite} />}
              </HStack>
            </Box>
          );
        })}
      </>
    );
  }

  function AlphabeticalFriendsSection(props) {
    const { alphabet, friends } = props;
    return (
      <>
        {alphabet.map((letter) => {
          return (
            <Box key={uuid.v4()}>
              <Text fontSize="11"> {letter} </Text>
              <Divider w="100%" alignSelf="center" />
              {/* The map below renders the friends array alphabetically  */}
              {friends.map((friend) => {
                {
                  /**** change friend.name[0] ****/
                }
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
                                participants = participants.filter((person) => {
                                  return person != friend;
                                });
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
                        {friend.user ? null : (
                          <DeleteFriendAlert friend={friend} />
                        )}
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

  function AlphabeticalSideBar(props) {
    const alphabet = props.alphabet;
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
      <VStack flex={1} space="3" pt="5">
        <HStack>
          <Spacer />
          <AddFriendForm />
          <Spacer />
          <ConfirmButton participants={participants} />
          <Spacer />
        </HStack>
        <HStack flex={1}>
          <ScrollView>
            <VStack space="4" pl="3">
              <Text>Favorites</Text>
              {newFriends.length > 0 ? (
                <Box>
                  <FavoriteFriendsSection friends={newFriends} />
                  <AlphabeticalFriendsSection
                    alphabet={alphabet}
                    friends={newFriends}
                  />
                </Box>
              ) : null}
            </VStack>
          </ScrollView>
        </HStack>
      </VStack>
    </>
  );
}
