import { Box, HStack, StatusBar, IconButton, HamburgerIcon, CloseIcon, Spacer } from "native-base";
import { SimpleLineIcons } from '@expo/vector-icons';

export default function NavBar() {
  return <>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="violet.800" />
      <HStack bg="violet.800"  justifyContent="space-between" alignItems="center">
        <IconButton icon={<HamburgerIcon name="search" size="md" color="white" />} />
        <Spacer />
        <HStack>
          <IconButton icon={<SimpleLineIcons name="camera" size={25} color="white" />} />
          <IconButton icon={<CloseIcon size="md" color="white" />} />
        </HStack>
      </HStack>
    </>;
}
