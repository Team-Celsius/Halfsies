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
} from "native-base";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { auth, db } from "../Firebase/firebaseConfig";
import { ref, onValue} from "firebase/database";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";


export default function Summary() {
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

   const [favorites, setFavorites] = useState([]);
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
          if (sortedFriends[i] && !favorites.includes(sortedFriends[i])) {
            sortedFriends[i].selected = false
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
                <HStack>
                        <>
                          {(favorite.selected && !renderPaid) ? 
                          (
                            <VStack>
                                  <HStack alignItems="center" mb="3" mr="3" > 
                                  <Button bgColor="transparent" onPress={() => {
                                    let newFavorites = [...favorites]
                                    newFavorites[newFavorites.indexOf(favorite)].selected = !newFavorites[newFavorites.indexOf(favorite)].selected
                                    setFavorites(newFavorites)
                                  }}>
                                    <AntDesign
                                    name="checkcircle"
                                    size={47}
                                    color="green"
                                    />
                                  </Button>
                                    <Text pl="3">{favorite.name}</Text>
                                    <Spacer />
                                    <Text>$totalBalance</Text>
                                  </HStack> 
                                  {Object.values(favorite.balance).map((item) => {
                                    const [bgColor, setBgColor] = useState("red.500")
                                    const [lineThrough, setLineThrough] = useState("")
                                    if(!item.payed) {
                                      return (
                                        <VStack flex={1}>
                                          <HStack space="5" mb="3" mr="3">
                                            <Button size="md" bgColor={bgColor} onPress={() => {
                                          
                                                setBgColor('green.500')
                                                setLineThrough("line-through")
                                                setTimeout(() => {
                                                  //jasonnnnnnnnnnnnnnn, right here is where we need to update item.payed in DB so it rerenders like you were talking about
                                                  item.payed = true
                                                }, 2000)
                                              
                                            }}>
                                              <FontAwesome5 name="money-bill-alt" size={20} color="black" />
                                            </Button>
                                            <Text textDecorationLine={lineThrough}>{item.qty}</Text>
                                            <Text textDecorationLine={lineThrough} >{item.description}</Text>
                                            <Spacer />
                                            <Text textDecorationLine={lineThrough}>{item.price}</Text>
                                          </HStack>
                                        </VStack>
                                      )
                                    }
                                  })}
                                </VStack>
                          ) 
                          : 
                          ( 
                            <HStack alignItems="center"> 
                              <Button bgColor="transparent" onPress={() => { 
                                  let newFavorites = [...favorites]
                                    newFavorites[newFavorites.indexOf(favorite)].selected = !newFavorites[newFavorites.indexOf(favorite)].selected
                                    setFavorites(newFavorites)}}>
                                <Avatar bg={favorite.avatarColor} justify="center">
                                  {favorite.initials}
                                </Avatar>
                              </Button>
                              <Text pl="3">{favorite.name}</Text>
                              <Spacer />
                              <Text  pr="3">$totalBalance</Text>
                            </HStack> 
                          )}
                        </>
                </HStack>
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


  return (
    <>
      <VStack flex={1} space="3" pt="5">
        <HStack>
          <Spacer />
          <UnpaidButton />
          <Spacer />
          <PaidButton />
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
