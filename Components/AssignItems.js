import { Avatar, HStack, VStack, Text, Input, Spacer, Divider, ScrollView, Select } from "native-base";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import NavBar from "./NavBar";

export default function AssignItems() {
  return (
    <>
    <VStack h="100%">
    <NavBar />
    <Text fontSize="2xl" fontWeight="bold" alignSelf="center">Assign Items</Text>

    {/* items section */}
      <ScrollView>
        <VStack>
          <HStack pl="8" pr="8" pt="4" pb="2">
            <Text>1</Text>
            <Spacer />
            <Text>Fried Pickles</Text>
            <Spacer />
            <Text>$11</Text>
          </HStack>
          <HStack space="1" alignSelf="center">
            <Avatar size="sm" bg="yellow.500">JW</Avatar>
          </HStack>
          <Divider />
        </VStack>
        <VStack>
          <HStack pl="8" pr="8" pt="4" pb="2">
            <Text>1</Text>
            <Spacer />
            <Text>Cheese Fries</Text>
            <Spacer />
            <Text>$12</Text>
          </HStack>
          <HStack space="1" alignSelf="center">
            <Avatar size="sm" bg="green.500">SK</Avatar>
            <Avatar size="sm" bg="orange.500">MT</Avatar>
          </HStack>
          <Divider />
        </VStack>
        <VStack>
          <HStack pl="8" pr="8" pt="4" pb="2">
            <Text>2</Text>
            <Spacer />
            <Text>Cheeseburger</Text>
            <Spacer />
            <Text>$15</Text>
          </HStack>
          <HStack space="1" alignSelf="center">
            <Avatar size="sm" bg="blue.500">JP</Avatar>
            <Avatar size="sm" bg="green.500">SK</Avatar>
          </HStack>
          <Divider />
        </VStack>
      </ScrollView>
      <Spacer />

      {/* Manual item entry section*/}
      <HStack alignSelf="center" space="2" p="4">
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