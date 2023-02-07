import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Participants from "../Participants";
import AssignItems from "../AssignItems";
import CameraView from "../Camera/CameraView";
import LoginPage from "../Login/LoginPage";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

function MyDrawer() {
	return (
		<Drawer.Navigator initialRouteName="LogIn">
			<Drawer.Screen
				name="LogIn"
				component={LoginPage}
				options={{ title: "Log In" }}
			/>
			<Drawer.Screen name="Camera" component={CameraView} />
			<Drawer.Screen name="Participants" component={Participants} />
			<Drawer.Screen name="Assign Items" component={AssignItems} />
		</Drawer.Navigator>
	);
}

export default function NavDrawer() {
	return (
		<NavigationContainer>
			<MyDrawer />
		</NavigationContainer>
	);
}
