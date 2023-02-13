import { Image, Text, ZStack, VStack, Spacer, Pressable, HStack } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import { useState } from 'react'

export default function LoginPage() {
	const [signIn, setSignIn] = useState(false)

	const toggleSignIn = () => {
		setSignIn(!signIn)
	}

	return (
		<ZStack>
			<>
				<Image source={require('../../assets/loginPage.jpg')} alt='A yellow background with a hand full of fries with ketchup on then with one fry being taken by another hand' w='100%' h='100%' />
			</>
			<VStack flex={1} w='100%' h='100%' p='5'>
				<Spacer />
				<Text
					alignSelf='center'
					// fontFamily="monospace"
					fontSize='65'
					fontWeight='bold'
					color='violet.800'>
					Halfsies
				</Text>
				<Spacer />
				<Spacer />
				{signIn ? <SignUpForm /> : <LoginForm />}

				{signIn ? (
					<HStack justifyContent='center' alignItems='center'>
						<Text color='black' textAlign='center'>
							Already have an account? {''}
						</Text>
						<Pressable m='2' onPress={toggleSignIn}>
							<Text color='blue.700' textDecorationLine='underline'>
								Login
							</Text>
						</Pressable>
					</HStack>
				) : (
					<HStack justifyContent='center' alignItems='center'>
						<Text color='black'>Don't have an account? </Text>
						<Pressable m='2' onPress={toggleSignIn}>
							<Text color='blue.700' textDecorationLine='underline'>
								Sign up
							</Text>
						</Pressable>
					</HStack>
				)}
			</VStack>
		</ZStack>
	)
}
