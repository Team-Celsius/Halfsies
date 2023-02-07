import {
	Box,
	HStack,
	StatusBar,
	IconButton,
	HamburgerIcon,
	CloseIcon,
	Spacer,
} from "native-base";
import { SimpleLineIcons } from "@expo/vector-icons";
import { auth } from "../Firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import NavDrawer from "./Drawer/NavDrawer";

export default function NavBar() {
	const logOut = () => {
		signOut(auth)
			.then(() => {
				console.log("signed out");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<StatusBar bg="#3700B3" barStyle="light-content" />
			<Box safeAreaTop bg="violet.800" />
			<HStack
				bg="violet.800"
				justifyContent="space-between"
				alignItems="center"
			>
				<NavDrawer />
				<Spacer />
				<HStack>
					<IconButton
						icon={<SimpleLineIcons name="camera" size={25} color="white" />}
					/>
					<IconButton icon={<CloseIcon size="md" color="white" />} />
				</HStack>
			</HStack>
		</>
	);
}
