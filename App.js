import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebaseConfig";
import { useState } from "react";
import NavDrawer from "./Components/Drawer/NavDrawer";

export default function App() {
	const [isLoggedIn, setLoggedIn] = useState(false);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setLoggedIn(true);
			const uid = user.uid;
		} else {
			setLoggedIn(false);
		}
	});

	return (
		<NativeBaseProvider>
			<NavDrawer />
		</NativeBaseProvider>
	);
}
