import { Input, Pressable, Text, Modal, Button, ScrollView } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function LoginForm() {
	const navigation = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);
	const [errorText, setErrorText] = useState("");
	const [show, setShow] = useState(false);

	const handleClick = () => setShow(!show);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data) => {
		signInWithEmailAndPassword(auth, data.email.trim(), data.password)
			.then((userCredential) => {
				const user = userCredential.user;
				navigation.navigate("Participants");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode);
				setErrorText(errorTextCreator(errorCode));
				setModalVisible(true);
			});
	};

	function errorTextCreator(errorCode) {
		if (errorCode === "auth/invalid-email") {
			return "Email invalid";
		} else if (errorCode === "auth/user-not-found") {
			return "Sorry User not found please try again";
		}
	}

	function LogInError() {
		return (
			<>
				<Modal isOpen={modalVisible} onClose={setModalVisible} size="sm">
					<Modal.Content maxH="212">
						<Modal.CloseButton />
						<Modal.Header>Error</Modal.Header>
						<Modal.Body>
							<ScrollView>
								<Text>{errorText}</Text>
							</ScrollView>
						</Modal.Body>
						<Modal.Footer>
							<Button.Group space={2}>
								<Button
									backgroundColor="violet.900"
									onPress={() => {
										setModalVisible(false);
									}}
								>
									Close
								</Button>
							</Button.Group>
						</Modal.Footer>
					</Modal.Content>
				</Modal>
			</>
		);
	}

	return (
		<View>
			<LogInError />
			<Controller
				control={control}
				rules={{
					required: true,
					pattern: /^\S+@\S+/i,
				}}
				render={({ field: { onChange, value } }) => (
					<Input
						textAlign="center"
						borderWidth="3"
						borderColor="violet.900"
						variant="rounded"
						backgroundColor="white"
						color="violet.900"
						p="5"
						m="2"
						placeholder="Email"
						onChangeText={onChange}
						value={value}
					/>
				)}
				name="email"
			/>
			{errors.email && <Text>Email is required.</Text>}
			<View style={{ width: "100%", alignItems: "center" }}>
				<Controller
					control={control}
					rules={{
						required: true,
						minLength: 6,
						maxLength: 100,
					}}
					render={({ field: { onChange, value } }) => (
						<Input
							textAlign="center"
							borderWidth="3"
							borderColor="violet.900"
							variant="rounded"
							backgroundColor="white"
							color="violet.900"
							p="5"
							m="2"
							placeholder="Password"
							onChangeText={onChange}
							value={value}
							type={show ? "text" : "password"}
							InputRightElement={
								<Button
									size="xs"
									rounded="none"
									w="20"
									h="full"
									backgroundColor="white"
									onPress={handleClick}
									style={{ marginLeft: "-23%" }}
								>
									{show ? (
										<Feather name="eye-off" size={24} color="gray" />
									) : (
										<Feather name="eye" size={24} color="gray" />
									)}
								</Button>
							}
						/>
					)}
					name="password"
				/>
				{errors.password && <Text>Password is required.</Text>}
			</View>

			<Pressable
				textAlign="center"
				borderWidth="3"
				borderColor="violet.900"
				variant="rounded"
				backgroundColor="violet.900"
				color="violet.900"
				p="5"
				m="2"
				onPress={handleSubmit(onSubmit)}
			>
				<Text textAlign="center" color="white">
					Log In
				</Text>
			</Pressable>
		</View>
	);
}
