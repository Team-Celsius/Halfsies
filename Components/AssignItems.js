import {
  Avatar,
  HStack,
  VStack,
  Text,
  Input,
  Spacer,
  Divider,
  Box,
  Heading,
  Pressable,
  Icon,
  Modal,
  FormControl,
  Button,
  Select,
  CheckIcon,
  ZStack,
} from "native-base";
import { MaterialCommunityIcons, AntDesign, Feather } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ref, set, push } from "firebase/database";
import { auth, db } from "../Firebase/firebaseConfig";
import uuid from "react-native-uuid";

export default function AssignItems(props) {
  const navigation = useNavigation();
  const userId = auth.currentUser.uid;

  let [participants, setParticipants] = useState(
    props.route.params.participants
  );

  const data = props.route.params.ocrResults.items;

  const [listData, setListData] = useState(data);

  function addItemsData(userId, listData) {
    const newList = JSON.parse(JSON.stringify(listData));
    newList.forEach((data) => {
      data.users = data.users.reduce((accumulator, value) => {
        return { ...accumulator, [value.userId]: value };
      }, {});
      6;
      const { description, key, price, qty, selected } = data;
      for (const user in data.users) {
        const friendRef = ref(
          db,
          "users/" + userId + "/friends/" + user + "/balance"
        );
        const newFriendRef = push(friendRef);

        set(newFriendRef, {
          itemUid: newFriendRef.key,
          description: description,
          key: key,
          price: price,
          qty: qty,
          selected: selected,
          payed: false,
        });
      }
    });
  }

  function AddItemManually() {
    const [modalVisible, setModalVisible] = useState(false);
    const [inputQty, setInputQty] = useState(1);
    const [inputDescription, setInputDescription] = useState();
    const [inputPrice, setInputPrice] = useState();
    const [errors, setErrors] = useState(false);
    const [buttonColor, setButtonColor] = useState("violet.900");
    const validate = () => {
      const inputPriceAsFloat = parseFloat(inputPrice);
      if (isNaN(inputPriceAsFloat)) {
        setErrors(true);
        return false;
      } else if (typeof inputQty !== "number") {
        setErrors(true);
        return false;
      } else if (
        typeof inputDescription !== "string" ||
        inputDescription.trim().length === 0
      ) {
        // this length check will make sure the desc isn't empty, or contains only whitespace characters
        setErrors(true);
        return false;
      } else if (inputQty <= 0 || Math.floor(inputQty) !== inputQty) {
        // makes sure the number is positive, and not a decimal
        setErrors(true);
        return false;
      }
      return true;
    };

    function SelectDropdownMenu() {
      const numbers = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ];
      return (
        <Select
          selectedValue={inputQty.toString()}
          // had to add back amount will not update on form if inputQty is not a string (validation still works)
          // this was being toString'ed, but the validate function is making sure it's a number
          // so validation should have permanently failed qty
          _selectedItem={{
            bgColor: "violet.900",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(quantity) => {
            setInputQty(Number(quantity));
          }}
        >
          {numbers.map((number) => {
            return (
              <Select.Item
                key={uuid.v4()}
                alignItems="center"
                label={number.toString()}
                value={number.toString()}
              />
            );
          })}
        </Select>
      );
    }
    return (
      <>
        <Modal
          isOpen={modalVisible}
          avoidKeyboard
          justifyContent="space-around"
          bottom="4"
          size="lg"
          onClose={() => setModalVisible(false)}
        >
          <Spacer />
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Manually enter item</Modal.Header>
            <Modal.Body>
              <FormControl mt="3">
                <FormControl.Label>Qty</FormControl.Label>
                <SelectDropdownMenu />
                <FormControl.Label>Description</FormControl.Label>
                <Input
                  onChangeText={(userDescription) =>
                    setInputDescription(userDescription)
                  }
                />
                <FormControl.Label>Price per item</FormControl.Label>
                <Input
                  InputLeftElement={<Text ml="1.5">$</Text>}
                  onChangeText={(itemPrice) => setInputPrice(Number(itemPrice))}
                />
                <FormControl.HelperText>
                  {" "}
                  Price must be a number. Do not include "$"
                </FormControl.HelperText>
                {/* this error message will not display, even when it was part of a ternary */}
                {/* <FormControl.ErrorMessage _text={{
        fontSize: 'xs'
      }}>Error. Price must be a number. Do not include "$"</FormControl.ErrorMessage> */}
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button
                key={"formButton"}
                flex="1"
                bgColor={buttonColor}
                onPress={() => {
                  if (validate()) {
                    setButtonColor("green.500");
                    setTimeout(() => {
                      setButtonColor("violet.900");
                      setListData([
                        ...listData,
                        {
                          key: uuid.v4(),
                          qty: inputQty,
                          description: inputDescription,
                          price: inputPrice,
                          selected: false,
                          users: [],
                        },
                      ]);
                    }, 1000);
                  } else {
                    setButtonColor("red.500");
                    setTimeout(() => {
                      setButtonColor("violet.900");
                    }, 1000);
                  }
                }}
              >
                Add Item
              </Button>
            </Modal.Footer>
          </Modal.Content>
          <Spacer />
          <Spacer />
          <Spacer />
        </Modal>
        <VStack alignSelf="center" space="1">
          <Avatar bg="violet.900">
            <Button
              bg="transparent"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              +
            </Button>
          </Avatar>
        </VStack>
      </>
    );
  }

  //eventually want to make it so that it does not scroll up after deleting an item
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
    function renderItem({ item }) {
      let newData = [...listData];
      let newParticipants = [...participants];
      return (
        <Box>
          <Pressable
            bgColor="white"
            onPress={() => {
              participants.map((participant) => {
                //press an item and toggle if it is selected
                newData[newData.indexOf(item)].selected =
                  !newData[newData.indexOf(item)].selected;

                //if participant selected when you touch item, and participant is not assigned to the item yet
                //also means that since it is the first item that it can not be in their balance
                if (
                  participant.selected === true &&
                  !item.users.includes(participant)
                ) {
                  //console.log(item.users, "added to item.users");
                  //add them to item's users array and update state
                  newData[newData.indexOf(item)].users.push(participant);
                  setListData(newData);

                  //set the participants selected property to false, add item to their balance, and update state
                  newParticipants[
                    newParticipants.indexOf(participant)
                  ].selected = false;

                  //the issue is that there is no balance property still on the participants
                  // console.log(newParticipants[newParticipants.indexOf(participant)], 'balance')
                  // newParticipants[newParticipants.indexOf(participant)].balance.push(item);
                  setParticipants(newParticipants);
                  // console.log(participants, 'added first item to balance')

                  //also check to make sure you havent already assigned more qty than the item says it has

                  //if they already have the item, update qty in their balance and update state
                } else if (
                  participant.selected === true &&
                  item.users.includes(participant)
                ) {
                  // let newParticipants = [...participants];
                  newParticipants[
                    newParticipants.indexOf(participant)
                  ].selected = false;

                  // let index = newParticipants[newParticipants.indexOf(participant)].balance.indexOf(item)
                  // ++newParticipants[newParticipants.indexOf(participant)].balance[index].qty
                  setParticipants(newParticipants);

                  // console.log(participants, 'added more items to balance should update qty')
                }
              });
            }}
          >
            <VStack m="4">
              <HStack p="3">
                <Text>{item.qty}</Text>
                <Spacer />
                <Text>{item.description}</Text>
                <Spacer />
                <Text>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(item.price)}
                </Text>
              </HStack>
              <HStack flexWrap="wrap" space="1" alignSelf="center">
                {participants.map((participant) => {
                  if (item.users.includes(participant)) {
                    return (
                      <Pressable
                        key={uuid.v4()}
                        onPress={() => {
                          newData = [...listData];
                          newData[newData.indexOf(item)].users.splice(
                            item.users.indexOf(participant),
                            1
                          );
                          setListData(newData);
                        }}
                      >
                        <Avatar size="sm" bg={participant.avatarColor}>
                          {participant.initials}
                        </Avatar>
                      </Pressable>
                    );
                  }
                })}
              </HStack>
              <Divider bgColor="violet.900" />
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
            onPress={() => {
              deleteRow(rowMap, data.item.key);
            }}
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
          data={listData}
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
      <VStack bgColor="white" h="100%">
        <HStack mt="5" mb="5">
          <Spacer />
          <VStack alignSelf="center">
            <Heading alignSelf="center" size="lg" mb="5">
              Items
            </Heading>
            <HStack space="5">
              <AddItemManually />
              <Button
                bg="violet.900"
                onPress={() => {
                  addItemsData(userId, listData, uuid);
                  navigation.navigate("BalancePage", {
                    participants: participants,
                  });
                }}
              >
                Confirm
              </Button>
            </HStack>
          </VStack>
          <Spacer />
        </HStack>

        <SwipeableScrollableMenu />
        {/* Avatar and checkbox section */}
        <VStack>
          <HStack flexWrap="wrap" space="1" alignSelf="center">
            {participants.map((participant) => {
              return (
                <Pressable
                  key={uuid.v4()}
                  onPress={() => {
                    let newData = [...participants];
                    newData[newData.indexOf(participant)].selected =
                      !newData[newData.indexOf(participant)].selected;
                    setParticipants(newData);
                  }}
                >
                  {participant.selected === true ? (
                    <ZStack>
                      <AntDesign name="checkcircle" size={50} color="green" />
                      <Text alignSelf="center" color="white">
                        {participant.initials}
                      </Text>
                    </ZStack>
                  ) : (
                    <Avatar key={participant.name} bg={participant.avatarColor}>
                      {participant.initials}
                    </Avatar>
                  )}
                </Pressable>
              );
            })}
            <Avatar bg="violet.900">
              <VStack alignItems="center">
                <MaterialCommunityIcons
                  name="account-group"
                  size={24}
                  color="violet.900"
                />
                <Text color="white">All</Text>
              </VStack>
            </Avatar>
            <Avatar bg="violet.900">+</Avatar>
          </HStack>
        </VStack>
      </VStack>
    </>
  );
}
