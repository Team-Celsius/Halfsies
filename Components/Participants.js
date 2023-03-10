import { Box, Avatar, HStack, VStack, Text, Input, Divider, ScrollView, Pressable, Modal, FormControl, Button, Spacer, Center, AlertDialog } from 'native-base'
import { AntDesign, FontAwesome, Feather } from '@expo/vector-icons'
import randomColor from 'randomcolor'
import { useState, useRef, useEffect } from 'react'
import { auth, db } from '../Firebase/firebaseConfig'
import { ref, set, onValue, remove, push } from 'firebase/database'
import uuid from 'react-native-uuid'
import { useNavigation } from '@react-navigation/native'

export default function Participants(props) {
	const [participants, setParticipants] = useState([])
	const navigation = useNavigation()
	const [ocrResults, setOcrResults] = useState({})

	let [newFriends, setNewFriends] = useState([])

	const userId = auth.currentUser.uid
	const userFriendsRef = ref(db, 'users/' + userId + '/friends/')

	useEffect(() => {
		if (props.route?.params?.ocrResults) {
			// equiv of (props.route.params && props.route.params.ocrResults)
			// ocrResults = props.route.params.ocrResults;
			setOcrResults(props.route.params.ocrResults)
		}
		onValue(userFriendsRef, (snapshot) => {
			const data = snapshot.val()
			if (Object.values(data).some((e) => Object.keys(e).some((e) => e === 'name'))) {
				setNewFriends(Object.values(data))
			} else {
				setNewFriends([data])
			}
		})
	}, [])

	let favorites = []

	const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

	function getInitials(firstName, lastName) {
		if (lastName) {
			const fInitial = firstName[0]
			const lInitial = lastName[0]

			return fInitial.concat(lInitial)
		} else {
			return firstName[0]
		}
	}

	function joinName(firstName, lastName) {
		return (firstName + ' ' + lastName).trim()
	}

	function addfriendData(userId, firstName, lastName, phone) {
		const fullName = joinName(firstName, lastName)
		const initials = getInitials(firstName, lastName)

		const friendRef = ref(db, 'users/' + userId + '/friends')
		const newFriendRef = push(friendRef)

		set(newFriendRef, {
			userId: newFriendRef.key,
			initials: initials,
			name: fullName,
			phone: phone,
			numPaymentRequests: 0,
			avatarColor: randomColor(),
			selected: false,
		})
	}

	function addUserToParticipants(friends) {
		friends.forEach((friend) => {
			if (friend.selected && !participants.includes(friend)) {
				setParticipants([friend])
			}
		})
	}

	addUserToParticipants(newFriends)

	const unselectUsers = (userArr) => {
		userArr.forEach((user) => {
			if (user.selected === true) {
				user.selected = false
			}
		})
	}

	function ConfirmButton() {
		return (
			<Button
				w='100%'
				h='70'
				bg='violet.800'
				rounded='none'
				onPress={() => {
					unselectUsers(participants)
					navigation.navigate('AssignItems', {
						participants: participants,
						ocrResults: ocrResults,
					})
				}}>
				Confirm
			</Button>
		)
	}

	function DeleteFriendAlert(props) {
		const [isOpen, setIsOpen] = useState(false)

		const friend = props.friend

		// const onClose = () => setIsOpen(false);
		const cancelRef = useRef(null)

		return (
			<Center>
				<Button bg='transparent' onPress={() => setIsOpen(!isOpen)}>
					<VStack>
						<Spacer />
						<Feather name='user-x' size={24} color='black' />
						<Spacer />
					</VStack>
				</Button>
				<AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={() => setIsOpen(false)}>
					<AlertDialog.Content>
						<AlertDialog.CloseButton />
						<AlertDialog.Header>Delete Friend</AlertDialog.Header>
						<AlertDialog.Body>
							<Text> This will delete all data relating to {friend.name}. This action cannot be reversed!</Text>
						</AlertDialog.Body>
						<AlertDialog.Footer>
							<Button.Group space={2}>
								<Button variant='unstyled' colorScheme='coolGray' onPress={() => setIsOpen(false)} ref={cancelRef}>
									Cancel
								</Button>
								<Button
									colorScheme='danger'
									onPress={() => {
										setIsOpen(false)
										const friendRef = ref(db, 'users/' + userId + '/friends/' + friend.userId)
										remove(friendRef)
									}}>
									Delete
								</Button>
							</Button.Group>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog>
			</Center>
		)
	}

	function addfriendData(userId, firstName, lastName, phone) {
		const fullName = joinName(firstName, lastName)
		const initials = getInitials(firstName, lastName)

		const friendRef = ref(db, 'users/' + userId + '/friends')
		const newFriendRef = push(friendRef)

		set(newFriendRef, {
			userId: newFriendRef.key,
			initials: initials,
			name: fullName,
			phone: phone,
			numPaymentRequests: 0,
			avatarColor: randomColor(),
			selected: false,
			bill: 'test',
		})
	}

	function AddFriendForm() {
		const [modalVisible, setModalVisible] = useState(false)
		const [newFriendFirstName, setNewFriendFirstName] = useState('')
		const [newFriendLastName, setNewFriendLastName] = useState('')
		const [newFriendPhone, setNewFriendPhone] = useState('')
		const userUid = auth.currentUser.uid
		const numberReg = /^\d{10}/

		return (
			<>
				<Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard='true' justifyContent='space-around' mt='1/5' bottom='4' size='lg'>
					<Modal.Content>
						<Modal.CloseButton />
						<Modal.Header>Don't let them skip out on the bill!</Modal.Header>
						<Modal.Body>
							<FormControl mt='3'>
								<FormControl.Label>First Name</FormControl.Label>
								<Input
									placeholder='First name is required'
									onChangeText={(firstName) => {
										setNewFriendFirstName(firstName)
									}}
								/>
								<FormControl.Label>Last Name</FormControl.Label>
								<Input
									onChangeText={(lastName) => {
										setNewFriendLastName(lastName)
									}}
								/>
								<FormControl.Label>Phone Number</FormControl.Label>
								<Input
									keyboardType={'number-pad'}
									type='tel'
									maxLength={10}
									placeholder='XXX-XXX-XXXX'
									value={newFriendPhone}
									onChangeText={(phone) => {
										setNewFriendPhone(phone)
									}}
								/>
							</FormControl>
						</Modal.Body>
						<Modal.Footer>
							<Button
								disabled={newFriendFirstName.length > 0 && numberReg.test(newFriendPhone) ? false : true}
								flex='1'
								onPress={() => {
									setModalVisible(false)
									addfriendData(userUid, newFriendFirstName, newFriendLastName, newFriendPhone)
								}}>
								Add
							</Button>
						</Modal.Footer>
					</Modal.Content>
					<Spacer />
					<Spacer />
					<Spacer />
					<Spacer />
					<Spacer />
					<Spacer />
				</Modal>

				<Button
					bgColor='transparent'
					onPress={() => {
						setModalVisible(!modalVisible)
					}}>
					<AntDesign name='adduser' size={47} color='#5B21B6' />
				</Button>
			</>
		)
	}

	function FavoriteFriendsSection(props) {
		const friends = props.friends

		const createFavorites = (friends) => {
			const sortedFriends = friends.sort((a, b) => b.numPaymentRequests - a.numPaymentRequests)

			for (let i = 0; i < 4; i++) {
				if (sortedFriends[i]) {
					favorites.push(sortedFriends[i])
				}
			}
		}

		createFavorites(friends)

		return (
			<>
				{/* The map below renders the sorted favorites array  */}
				{favorites.map((favorite) => {
					return (
						<Box key={uuid.v4()}>
							{/* The pressable code below keeps track of who is selected */}
							<HStack space='3' m='1'>
								<Pressable>
									{({ isPressed }) => {
										if (isPressed) {
											favorite.selected = !favorite.selected

											if (!participants.includes(favorite) && favorite.selected) {
												setParticipants([...participants, favorite])
											} else if (participants.includes(favorite)) {
												let newParticipants = participants.filter((participant) => {
													return participant.selected === true
												})
												setParticipants(newParticipants)
											}
										}

										return (
											<>
												{favorite.selected ? (
													<AntDesign name='checkcircle' size={47} color='green' />
												) : (
													<Avatar bg={favorite.avatarColor} justify='center'>
														{favorite.initials}
													</Avatar>
												)}
											</>
										)
									}}
								</Pressable>
								<VStack>
									<Spacer />
									<Text pl='3'>{favorite.name}</Text>
									<Spacer />
								</VStack>
								<Spacer />
								{favorite.user ? null : <DeleteFriendAlert friend={favorite} />}
							</HStack>
						</Box>
					)
				})}
			</>
		)
	}

	function AlphabeticalFriendsSection(props) {
		const { alphabet, friends } = props

		return (
			<>
				{alphabet.map((letter) => {
					return (
						<Box key={uuid.v4()}>
							<Text fontSize='11'> {letter} </Text>
							<Divider w='100%' alignSelf='center' />
							{/* The map below renders the friends array alphabetically  */}
							{friends.map((friend) => {
								console.log('FRIEND', friend)
								if (friend.name[0] === letter && !favorites.includes(friend)) {
									return (
										<Box key={uuid.v4()}>
											{/* The pressable code below keeps track of who is selected */}
											<HStack space='3' m='1'>
												<Pressable>
													{({ isPressed }) => {
														friend.selected = !friend.selected

														if (!participants.includes(friend) && friend.selected) {
															setParticipants([...participants, friend])
														} else if (participants.includes(friend)) {
															let newParticipants = participants.filter((participant) => {
																return participant.selected === true
															})
															setParticipants(newParticipants)
														}
													}}
												</Pressable>
												<VStack flex={1}>
													<Spacer />
													<Text justify='center' pl='3'>
														{friend.name}
													</Text>
													<Spacer />
												</VStack>
												{friend.user ? null : <DeleteFriendAlert friend={friend} />}
											</HStack>
										</Box>
									)
								}
							})}
						</Box>
					)
				})}
			</>
		)
	}

	return (
		<>
			<VStack flex={1} pt='5'>
				<ScrollView>
					<VStack pl='3'>
						<HStack flex={1} alignItems='center'>
							<Spacer />
							<Spacer />
							<AddFriendForm />
							<Text>Add a friend!</Text>
							<Spacer />
							<Spacer />
							<Spacer />
						</HStack>
						<Text>Favorites</Text>
						{newFriends.length > 0 ? (
							<Box>
								<FavoriteFriendsSection friends={newFriends} />
								<AlphabeticalFriendsSection alphabet={alphabet} friends={newFriends} />
							</Box>
						) : null}
					</VStack>
				</ScrollView>
				<HStack>
					<Spacer />
					<ConfirmButton participants={participants} />
					<Spacer />
				</HStack>
			</VStack>
		</>
	)
}
