import { Avatar, HStack, VStack, Text, Input, Spacer, Divider, Box, Heading, Pressable, Icon, Modal, FormControl, Button, Select, CheckIcon, Flex } from "native-base";
import { MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useState } from "react";
import NavBar from "./NavBar";
import randomColor from "randomcolor";

export default function AssignItems(props) {
  let participants = props.participants

  const data = [{
      key: 1,
      qty: 1,
      description: 'Chicken Sandwich',
      price: '$14',
  }, {
    key: 2,
    qty: 2,
    description: 'Cheeseburger',
    price: '$12',
  }, {
    key: 3,
    qty: 1,
    description: 'Steak',
    price: '$40',
  }, {
    key: 4,
    qty: 2,
    description: 'Salad',
    price: '$12',
  }, {
    key: 5,
    qty: 6,
    description: 'Ice Cream',
    price: '$10',
  }, {
    key: 6,
    qty: 6,
    description: 'Ice Cream',
    price: '$10',
  }, {
    key: 7,
    qty: 6,
    description: 'Ice Cream',
    price: '$10',
  }, {
    key: 8,
    qty: 6,
    description: 'Ice Cream',
    price: '$10',
  }]

  const [listData, setListData] = useState(data);
  
  function SwipeableScrollableMenu() {
    function closeRow(rowMap, rowKey){
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    }
  
    function deleteRow(rowMap, rowKey) {
      closeRow(rowMap, rowKey)
      const newData = [...listData]
      const prevIndex = listData.findIndex(item => item.key === rowKey)
      newData.splice(prevIndex, 1)
      setListData(newData)
    }

    function renderItem({item}) {
      return (
        <Box>
          <Pressable _dark={{bg: 'coolGray.800'}} _light={{bg: 'white'}}>
            <VStack m="4">
              <HStack p="3">
                <Text>{item.qty}</Text>
                <Spacer />
                <Text>{item.description}</Text>
                <Spacer />
                <Text>{item.price}</Text>
              </HStack>
              <HStack space="1" alignSelf="center">
                <Avatar size="sm" bg="yellow.500">JW</Avatar>
              </HStack>
              <Divider />
            </VStack>
          </Pressable>
        </Box>
      )
    }
  
    function renderHiddenItem(data, rowMap) {
      return (
        <HStack flex="1" pl="2">
          <Spacer />
          <Pressable w="70" cursor="pointer" bg="red.500" justifyContent="center" onPress={() => deleteRow(rowMap, data.item.key)} _pressed={{opacity: 0.5}}>
            <VStack alignItems="center" space={2}>
              <Icon as={<Feather name="delete" />} color="white" size="xs" />
              <Text color="white" fontSize="xs" fontWeight="medium">
                Delete
              </Text>
            </VStack>
          </Pressable>
        </HStack>
      )
    }

    return (
      <><SwipeListView data={listData} renderItem={renderItem} renderHiddenItem={renderHiddenItem} rightOpenValue={-70} previewRowKey={'0'} previewOpenValue={-40} previewOpenDelay={3000} /></>
    )
  }

  function AddItemManually() {
    const [modalVisible, setModalVisible] = useState(false)
    const [inputQty, setInputQty] = useState()
    const [inputDescription, setInputDescription] = useState()
    const [inputPrice, setInputPrice] = useState()
    const [errors, setErrors] = useState(false);
    const [buttonColor, setButtonColor] = useState("violet.800")

    const validate = () => {

      //this validation for inputPrice does not work. The form returns a string,
      // and if i force it with Number() then string input gets validated as a number
      // if (typeof(inputPrice) !== "number") {
      //   setErrors(true)
      //   return false
      // }
     if(typeof(inputQty) !== "number") {
        setErrors(true)
        return false
      } 
      else if(typeof(inputDescription) !== "string") {
        setErrors(true)
        return false
      } 
      return true;
    }

    function SelectDropdownMenu() {
      const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
      return (
            <Select selectedValue={inputQty} _selectedItem={{bgColor: "violet.800", endIcon: <CheckIcon size="5" />}} mt={1} onValueChange={quantity=> {setInputQty(quantity)}}>
              {numbers.map((number) => {
                return (
                  <Select.Item key={numbers + 20} alignItems="center" label={number} value={number} />
                )
              })}
            </Select>
        )
    }
    
    return <>
        <Modal isOpen={modalVisible} avoidKeyboard justifyContent="space-around" bottom="4" size="lg" onClose={() => setModalVisible(false)}>
          <Spacer />
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header >Manually enter item</Modal.Header>
            <Modal.Body>
              <FormControl mt="3">
                <FormControl.Label>Qty</FormControl.Label>
                {/* Cannot get quantity to display when selected */}
                <SelectDropdownMenu />
                <FormControl.Label>Description</FormControl.Label>
                <Input onChangeText={ userDescription => setInputDescription(userDescription)}/>
                <FormControl.Label>Price per item</FormControl.Label>
                <Input onChangeText={ itemPrice => setInputPrice(itemPrice)}/>
                <FormControl.HelperText> Price must be a number. Do not include "$"</FormControl.HelperText>


                {/* this error message will not display, even when it was part of a ternary */}
                {/* <FormControl.ErrorMessage _text={{
        fontSize: 'xs'
      }}>Error. Price must be a number. Do not include "$"</FormControl.ErrorMessage> */}
                
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button key={"formButton"} flex="1" bgColor={buttonColor} onPress={() => {
                if(validate()) {
                  setButtonColor("green.500")
                  setTimeout(() => {
                    setButtonColor("violet.800")
                    setListData([...listData, {
                    key: <>{inputQty + inputPrice}</>,
                    qty: inputQty,
                    description: inputDescription,
                    price: "$" + inputPrice
                  }])
                  }, 1000)
                }
                else {
                  setButtonColor("red.500")
                  setTimeout(() => {
                    setButtonColor("violet.800")
                  }, 1000)
                }
              }}>
                Add Item
              </Button>
            </Modal.Footer>
          </Modal.Content>
              <Spacer />
              <Spacer />
              <Spacer />
        </Modal>
        <VStack alignSelf="center" space="1">
          <Avatar bg="violet.800">
            <Button  bg="transparent" onPress={() => {
              setModalVisible(!modalVisible);
          }}>
             +
            </Button>
          </Avatar>
        </VStack>
      </>;
  }
  
  return (
    <>
    <VStack h="100%">
      <NavBar />
      <VStack mt="5">
            <Heading alignSelf="center"  size="lg">
              Items
            </Heading>
            <AddItemManually />
        </VStack>
      <SwipeableScrollableMenu />

      {/* Avatar and checkbox section */}
      <VStack>
        <HStack space="1" alignSelf="center">
          {participants.map((participant) => {
            return (<Avatar key={participant.name}bg={participant.avatarColor}>{participant.initials}</Avatar>)
          })}
          <Avatar bg="orange.500">
            <VStack alignItems="center">
              <MaterialCommunityIcons name="account-group" size={24} color="violet.800" />
              <Text color="white">All</Text>
            </VStack>
          </Avatar>
          <Avatar bg="violet.800">+</Avatar>
        </HStack>
        <HStack alignSelf="center" p="5">
          <AntDesign name="checkcircle" size={50} color="black" />
        </HStack>
      </VStack>
    </VStack>
  </>)
}