import { Avatar, HStack, VStack, Text, Input, Spacer, Divider, ScrollView, Center, Box, Heading, Pressable, Icon } from "native-base";
import { MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons';
import { useState } from "react";
import NavBar from "./NavBar";
import { SwipeListView } from 'react-native-swipe-list-view';

function SwipeScrollList() {
  return <Center h="60%">
      <Box _dark={{
      bg: 'coolGray.800'
    }} _light={{
      bg: 'white'
    }} flex="1"  maxW="400px" h="100%" w="100%">
        <Heading p="4" pb="3" size="lg">
          Items
        </Heading>
        <ScrollView >
          <Basic />
        </ScrollView>
      </Box>
    </Center>;
}

function Basic() {

  const data = [{
    qty: 1,
    description: 'Chicken Sandwich',
    price: '$14',
  }, {
    qty: 2,
    description: 'Cheeseburger',
    price: '$12',
  }, {
    qty: 1,
    description: 'Steak',
    price: '$40',
  }, {
    qty: 2,
    description: 'Salad',
    price: '$12',
  }, {
    qty: 6,
    description: 'Ice Cream',
    price: '$10',
  }];
  
  const [listData, setListData] = useState(data);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const renderItem = ({
    item,
    index
  }) => <Box>
      <Pressable _dark={{
      bg: 'coolGray.800'
    }} _light={{
      bg: 'white'
    }}>
        <VStack>
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
    </Box>;

  const renderHiddenItem = (data, rowMap) => <HStack flex="1" pl="2">
      <Pressable w="70" ml="auto" cursor="pointer" bg="white" justifyContent="center" onPress={() => closeRow(rowMap, data.item.key)} _pressed={{
      opacity: 0.5
    }}>
      </Pressable>
      <Pressable w="70" cursor="pointer" bg="red.500" justifyContent="center" onPress={() => deleteRow(rowMap, data.item.key)} _pressed={{
      opacity: 0.5
    }}>
        <VStack alignItems="center" space={2}>
          <Icon as={<Feather name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>;

  return <Box bg="white" h="100%" flex="1">
      <SwipeListView data={listData} renderItem={renderItem} renderHiddenItem={renderHiddenItem} rightOpenValue={-70} previewRowKey={'0'} previewOpenValue={-40} previewOpenDelay={3000} onRowDidOpen={onRowDidOpen} />
    </Box>;
}

export default function AssignItems() {
  return (
    <>
    <VStack h="100%">
      <NavBar />
      <SwipeScrollList />
      <Spacer />

      {/* Manual item entry section*/}
      <HStack alignSelf="center" space="2" pl="4" pr="4" pb="4">
        <Input textAlign="center" w="20%" borderWidth="3" borderColor="violet.800" variant="rounded">Qty</Input>
        <Input textAlign="center" w="60%" borderWidth="3" borderColor="violet.800" variant="rounded">Description</Input>
        <Input textAlign="center" w="20%" borderWidth="3" borderColor="violet.800" variant="rounded">Price</Input>
      </HStack>

      {/* Avatar and checkbox section */}
      <VStack>
        <HStack space="1" alignSelf="center">
          <Avatar bg="blue.500">JP</Avatar>
          <Avatar bg="green.500">SK</Avatar>
          <Avatar bg="yellow.500">JW</Avatar>
          <Avatar bg="orange.500">MT</Avatar>
          <Avatar bg="orange.500">
            <VStack alignItems="center">
              <MaterialCommunityIcons name="account-group" size={24} color="black" />
              <Text color="white">All</Text>
            </VStack>
          </Avatar>
          <Avatar bg="orange.500"><Text fontSize="2xl" color="white">+</Text></Avatar>
        </HStack>
        <HStack alignSelf="center" p="5">
        <AntDesign name="checkcircle" size={50} color="black" />
        </HStack>
      </VStack>
    </VStack>
  </>)
}