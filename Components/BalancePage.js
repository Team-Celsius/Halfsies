import {
  FlatList,
  IconButton,
  Box,
  Icon,
  MaterialIcons,
  Text,
  Button,
} from "native-base";
import { useEffect, useState } from "react";
import { auth, db } from "../Firebase/firebaseConfig";
import { ref, onValue, remove } from "firebase/database";

export default function AppDrawer() {
  let [friendData, setFriendData] = useState([]);

  const userId = auth.currentUser.uid;
  const userFriendsRef = ref(db, "users/" + userId + "/friends/");

  useEffect(() => {
    return onValue(userFriendsRef, (snap) => {
      const data = snap.val();
      setFriendData(Object.values(data));
    });
  }, []);

  // use to get balance as array
  // friendData.forEach((e) => {
  //   if (e.balance) {
  //     console.log(Object.values(e.balance));
  //   }
  // });

  const deleteItem = (userUid, friendUid, itemUid) => {
    const itemRef = ref(
      db,
      "users/" + userUid + "/friends/" + friendUid + "/balance/" + itemUid
    );

    remove(itemRef);
  };

  const icons = [
    {
      name: "bolt",
      bg: "amber.600",
    },
    {
      name: "build",
      bg: "emerald.600",
    },
    {
      name: "cloud",
      bg: "blue.600",
    },
    {
      name: "delivery-dining",
      bg: "orange.600",
    },
    {
      name: "favorite",
      bg: "rose.600",
    },
    {
      name: "music-note",
      bg: "violet.600",
    },
    {
      name: "invert-colors-on",
      bg: "lime.600",
    },
    {
      name: "navigation",
      bg: "indigo.600",
    },
    {
      name: "settings",
      bg: "pink.600",
    },
    {
      name: "sports-esports",
      bg: "coolGray.600",
    },
    {
      name: "shield",
      bg: "darkBlue.600",
    },
    {
      name: "photo-camera",
      bg: "fuchsia.600",
    },
    {
      name: "network-wifi",
      bg: "amber.500",
    },
    {
      name: "nightlight-round",
      bg: "violet.800",
    },
    {
      name: "flight",
      bg: "blue.800",
    },
    {
      name: "extension",
      bg: "indigo.600",
    },
    {
      name: "duo",
      bg: "orange.600",
    },
    {
      name: "album",
      bg: "rose.600",
    },
    {
      name: "access-alarm",
      bg: "emerald.600",
    },
    {
      name: "forum",
      bg: "indigo.600",
    },
  ];

  return (
    <Box>
      <Button
        colorScheme="danger"
        onPress={() => {
          deleteItem(
            "7ccnsAHMivR0ApJZDW6APZXnXZ82",
            "-NNnZ0D7ENK5c_kvVKWr",
            "-NNqqZsoLnri_pXetoj8"
          );
        }}
      >
        Delete
      </Button>
      <FlatList
        numColumns={4}
        m={"-8px"}
        data={icons}
        renderItem={({ item }) => {
          return (
            <IconButton
              m={"8px"}
              borderRadius="full"
              bg={item.bg}
              variant="solid"
              p="3"
              icon={
                <Icon
                  color="white"
                  name={item.name}
                  as={MaterialIcons}
                  size="sm"
                />
              }
            />
          );
        }}
      />
    </Box>
  );
}

function Example() {
  return (
    <Box alignItems="center" flex={1}>
      <AppDrawer />
    </Box>
  );
}
