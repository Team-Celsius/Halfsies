import {
  Box,
  Avatar,
  HStack,
  VStack,
  Text,
  Divider,
  ScrollView,
  Pressable,
  Button,
  Spacer,
  Icon,
  Feather,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { auth, db } from "../Firebase/firebaseConfig";
import { ref, onValue} from "firebase/database";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";

export default function Summary(props) {
console.log(props)
  const [bgColorUnpaid, setBgColorUnpaid] = useState("green.800")
  const [bgColorPaid, setBgColorPaid] = useState("violet.800")
  const [renderPaid, setRenderPaid] = useState(false)

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

  function PaidButton() {
    return (
      <VStack space={8} alignItems="center">
        <Button
          bg={bgColorPaid}
          onPress={() => {
            if(renderPaid === true) {
              setRenderPaid(false)
              setBgColorUnpaid("green.800")
              setBgColorPaid("violet.800")
            }
            else {
              setRenderPaid(true)
              setBgColorUnpaid("violet.800")
              setBgColorPaid("green.800")
            }
          }}
        >
          Paid
        </Button>
      </VStack>
    );
  }
  function UnpaidButton() {
    return (
      <VStack space={8} alignItems="center">
        <Button
          bg={bgColorUnpaid}
          onPress={() => {
            if(renderPaid === false) {
              setRenderPaid(true)
              setBgColorUnpaid("violet.800")
              setBgColorPaid("green.800")
            }
            else {
              setRenderPaid(false)
              setBgColorUnpaid("green.800")
              setBgColorPaid("violet.800")
            }
            //on first press, change bgColor of paid to violet, unpaid to green
            //render unpaid
            // on second press, change Paid to green, unpaid to violet
            //render paid
            //same logic on other one just where only one can be done at a time doesnt matter which you press
          }}
        >
          Unpaid
        </Button>
      </VStack>
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
              <VStack>
                
              </VStack>
                <HStack space="3" m="1">
                  <Pressable>
                    {({ isPressed }) => {
                      if (isPressed) {
                        favorite.selected = !favorite.selected;
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
                  <VStack>
                    <Spacer />
                    <Text pr="3">$balance</Text>
                    <Spacer />
                  </VStack>
                </HStack>
                {favorite.selected ? (
                  <VStack>
                    <SwipeableScrollableMenu />
                  </VStack> 
                            
                ) 
                : 
                  null
                }
              <VStack />
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

  function SwipeableScrollableMenu() {
    function closeRow(rowMap, rowKey) {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    }
    function deleteRow(rowMap, rowKey) {
      closeRow(rowMap, rowKey);
      const newData = [...listData];
      const prevIndex = listData.findIndex((item) => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setListData(newData);
    }
    function renderItem({ friend }) {
      console.log(friend)
      return (
        <Box>
          <Pressable
            bgColor="white"
            onPress={() => {
            }}
          >email@
            <VStack m="4">
              <HStack p="3">
                {/* <Text>{item.qty}</Text> */}
                <Spacer />
                {/* <Text>{item.description}</Text> */}
                <Spacer />
                {/* <Text>{item.price}</Text> */}
              </HStack>
              <Divider bgColor="violet.800" />
            </VStack>
          </Pressable>
        </Box>
      );
    }
    function renderHiddenItem(data, rowMap) {
      return (
        <HStack flex="1" pl="2">
          <Spacer />
          <Pressable
            w="70"
            cursor="pointer"
            bg="red.500"
            justifyContent="center"
            onPress={() => deleteRow(rowMap, data.item.key)}
            _pressed={{ opacity: 0.5 }}
          >
            <VStack alignItems="center" space={2}>
              <Icon as={<Feather name="delete" />} color="white" size="xs" />
              <Text color="white" fontSize="xs" fontWeight="medium">
                Delete
              </Text>
            </VStack>
          </Pressable>
        </HStack>
      );
    }
    return (
      <>
        <SwipeListView
          data={newFriends}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-70}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      </>
    );
  }

  return (
    <>
      <VStack flex={1} space="3" pt="5">
        <HStack>
          <Spacer />
          <UnpaidButton friends={newFriends} />
          <Spacer />
          <PaidButton friends={newFriends} />
          <Spacer />
        </HStack>
        <HStack flex={1}>
          <ScrollView>
            <VStack space="4" pl="3">
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
