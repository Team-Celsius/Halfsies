import { Avatar, HStack, VStack, Text, Input, Spacer, Divider, ScrollView } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function Participants() {

  return (<>
    <VStack space="4">
      {/* Add via Name/Payment/QR/NFC/ handle section */}

      <Input alignSelf="center" textAlign="center" size="2xl" w="85%" borderWidth="3" borderColor="violet.800" variant="rounded">Name or @paymentHandle</Input>

      <HStack pl="8" pr="8">
        <MaterialIcons name="qr-code-scanner" size={40} color="black" />
        <Text>Add via QR Code</Text>
        <Spacer />
        <MaterialCommunityIcons name="cellphone-nfc" size={40} color="black" />
        <Text>Add via NFC</Text>
      </HStack>

      <HStack>
        <ScrollView>
          <VStack space="4" pl="3">

            {/* Favorite contacts section */}
            <Text>Favorites</Text>
            <HStack space="3"> 
              <Avatar bg="green.500">JW</Avatar>
              <VStack> 
                <Text>@justinw</Text>
                <Text pl="3">Justin Wooley</Text>
              </VStack>
            </HStack>
            <HStack space="3"> 
              <Avatar bg="blue.500">JP</Avatar>
              <VStack> 
                <Text>@jasonp</Text>
                <Text pl="3">Jason Potvin</Text>
              </VStack>
            </HStack>
            <HStack space="3"> 
              <Avatar bg="red.500">MT</Avatar>
              <VStack> 
                <Text>@michaeltheboss</Text>
                <Text pl="3">Michael Timo</Text>
              </VStack>
            </HStack>
            <HStack space="3"> 
              <Avatar bg="yellow.500">SK</Avatar>
              <VStack> 
                <Text>@therealsteven</Text>
                <Text pl="3">Steven King</Text>
              </VStack>
            </HStack>
            <Divider w="100%" alignSelf="center"/>

            {/* Alphabetical contacts section */}
            <Text fontSize="11"> A </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> B </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> C </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> D </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> E </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> F </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> G </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> H </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> I </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> J </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> K </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> L </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> M </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> N </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> O </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> P </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> Q </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> R </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> S </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> T </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> U </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> V </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> W </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> X </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> Y </Text>
            <Divider w="100%" alignSelf="center"/>

            <Text fontSize="11"> Z </Text>
            <Divider w="100%" alignSelf="center"/>

          </VStack>
        </ScrollView>
        <VStack w="5%">
          <Text fontSize="11"> A </Text>
          <Text fontSize="11"> B </Text>
          <Text fontSize="11"> C </Text>
          <Text fontSize="11"> D </Text>
          <Text fontSize="11"> E </Text>
          <Text fontSize="11"> F </Text>
          <Text fontSize="11"> G </Text>
          <Text fontSize="11"> H </Text>
          <Text fontSize="11"> I </Text>
          <Text fontSize="11"> J </Text>
          <Text fontSize="11"> K </Text>
          <Text fontSize="11"> L </Text>
          <Text fontSize="11"> M </Text>
          <Text fontSize="11"> N </Text>
          <Text fontSize="11"> O </Text>
          <Text fontSize="11"> P </Text>
          <Text fontSize="11"> Q </Text>
          <Text fontSize="11"> R </Text>
          <Text fontSize="11"> S </Text>
          <Text fontSize="11"> T </Text>
          <Text fontSize="11"> U </Text>
          <Text fontSize="11"> V </Text>
          <Text fontSize="11"> W </Text>
          <Text fontSize="11"> X </Text>
          <Text fontSize="11"> Y </Text>
          <Text fontSize="11"> Z </Text>
        </VStack>
      </HStack>
    </VStack></>
  )
}