import { Avatar, HStack, VStack, Text, Input, Spacer, Divider, ScrollView, Pressable } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import randomColor from "randomcolor";
import React, { useState } from "react";
import NavBar from "./NavBar";

export default function Participants() {
  let participants = []
  const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  let friends = [
    {
      initials: "SK",
      paymentHandle: "@therealsteven",
      name: "Steven King",
      numPaymentRequests: 1,
      avatarColor: randomColor(),
      selected: false
    },
    {
      initials: "JW",
      paymentHandle: "@justinw",
      name: "Justin Wooley",
      numPaymentRequests: 2,
      avatarColor: randomColor(),
      selected: false
    },
    {
      initials: "JP",
      paymentHandle: "@jasonp",
      name: "Jason Potvin",
      numPaymentRequests: 4,
      avatarColor: randomColor(),
      selected: false
    },
    {
      initials: "MT",
      paymentHandle: "@michaeltheboss",
      name: "Michael Timo",
      numPaymentRequests: 3,
      avatarColor: randomColor(),
      selected: false
    }
  ]

  function FavoriteFriendsSection(props) {
    let friends = props.friends
    let favorites = []
    //The for/map combo below organizes the friends in order of how many times you've sent them a payment request
    for(let i = 0; i < 4; ++i) {
      let currentHighest = friends[0]
      let currentHighestIndex = 0
      friends.map(friend => {
        if(friends[friends.indexOf(friend) + 1]) {
          let nextFriend = friends[friends.indexOf(friend) + 1]
          if((currentHighest.numPaymentRequests <= nextFriend.numPaymentRequests) && !favorites.includes(nextFriend)){
            currentHighest = nextFriend
            currentHighestIndex = friends.indexOf(nextFriend)
          }
        }
      })
      favorites.push(currentHighest)
    }

    return(<>
      {/* The map below renders the sorted favorites array  */}
      {favorites.map(favorite => {
        return(<>
        {/* The pressable code below keeps track of who is selected, but it is not live updating the alphabetical section yet */}
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
          {/* the conditional statement in ternary below is returning undefined */}
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

//all these need to be pressable as well
//bg color needs to be state managed still, its not live updating
  function AlphabeticalFriendsSection() {
    return(<>
      {alphabet.map(letter => {
        return (<>
          <Text fontSize="11" key={letter}> {letter} </Text>

          {friends.map(friend => {
            if(friend.name[0] === letter) {
              return (<>
                <HStack space="3" m="1" bg={friend.selected ? "green.400" : "white"}> 
                  <Avatar bg={friend.avatarColor}>{friend.initials}</Avatar>
                  <VStack> 
                    <Text>{friend.paymentHandle}</Text>
                    <Text pl="3">{friend.name}</Text>
                  </VStack>
                </HStack>
              </>)
            }
          })}
          
          <Divider w="100%" alignSelf="center"/>
        </>)})}
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

      {/* Add via Name/Payment/QR/NFC/ handle section */}
      <Input alignSelf="center" textAlign="center" size="2xl" w="85%" borderWidth="3" borderColor="violet.800" variant="rounded">Name or @paymentHandle</Input>

      <HStack pl="8" pr="8">    
        <MaterialIcons name="qr-code-scanner" size={40} color="black" />
        <VStack><Spacer /><Text pl="3">Add via QR Code</Text><Spacer /></VStack>
        <Spacer />
        <MaterialCommunityIcons name="cellphone-nfc" size={40} color="black" />
        <VStack><Spacer /><Text pl="1">Add via NFC</Text><Spacer /></VStack>
      </HStack>

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