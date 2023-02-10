import { Image, Text, ZStack, VStack, Spacer, Pressable } from "native-base";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { useState } from "react";


export default function LoginPage() {
	const [signIn, setSignIn] = useState(false);

	const toggleSignIn = () => {
		setSignIn(!signIn);
	};

	return (
	<KeyboardAwareScrollView contentContainerStyle={{flex: 1}} >
			<ZStack>
			<>
				<Image
					source={require("../../assets/loginPage.jpg")}
					alt="A yellow background with a hand full of fries with ketchup on then with one fry being taken by another hand"
					style={{ width: "100%", height: "100%" }}
					/>
			</>
			<VStack w="100%" h="100%" p="5">
				<Spacer />
				<Text
					alignSelf="center"
					// fontFamily="monospace"
					fontSize="65"
					fontWeight="bold"
					color="violet.900"
				>
					Halfsies
				</Text>
				<Spacer />
				<Spacer />
				{signIn ? <SignUpForm /> : <LoginForm />}
				<Pressable
					textAlign="center"
					borderWidth="3"
					borderColor="rgba(255, 122, 89, 0)"
					variant="rounded"
					background="rgba(255, 122, 89, 0)"
					color="violet.900"
					m="2"
					onPress={toggleSignIn}
				>
					<Text textAlign="center" color="black">
						{signIn ? (
							<Text textAlign="center" color="black">
								Already have an account? {""}
								<Text
									style={{
										color: "blue",
										textDecorationLine: "underline",
									}}
								>
									Login
								</Text>
							</Text>
						) : (
							<Text textAlign="center" color="blue">
								Don't have an account?{" "}
								<Text
									style={{
										color: "blue",
										textDecorationLine: "underline",
									}}
								>
									Sign up
								</Text>
							</Text>
						)}
					</Text>
				</Pressable>
			</VStack>
		</ZStack>
	</KeyboardAwareScrollView>
	);
}
