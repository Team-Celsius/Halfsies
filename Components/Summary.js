import { Box, Avatar, HStack, VStack, Text, Divider, ScrollView, Button, Spacer } from 'native-base'
import { auth, db } from '../Firebase/firebaseConfig'
import { ref, onValue } from 'firebase/database'
import { AntDesign } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import uuid from 'react-native-uuid'

export default function Summary() {
	const [bgColorUnpaid, setBgColorUnpaid] = useState('green.800')
	const [bgColorPaid, setBgColorPaid] = useState('violet.800')
	const [renderPaid, setRenderPaid] = useState(false)
	const [newFriends, setNewFriends] = useState([])
	const [favorites, setFavorites] = useState([])

	const userId = auth.currentUser.uid
	const userFriendsRef = ref(db, 'users/' + userId + '/friends/')

	useEffect(() => {
		onValue(userFriendsRef, (snapshot) => {
			const data = snapshot.val()
			if (Object.values(data).some((e) => Object.keys(e).some((e) => e === 'name'))) {
				setNewFriends(Object.values(data))
			} else {
				setNewFriends([data])
			}
		})
	}, [])

	const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

	function TabButton(text) {
		return (
			<VStack space={8} alignItems='center'>
				<Button
					value={text}
					bg={bgColorPaid}
					onPress={() => {
						if (renderPaid === true) {
							setRenderPaid(false)
							setBgColorUnpaid('green.800')
							setBgColorPaid('violet.800')
						} else {
							setRenderPaid(true)
							setBgColorUnpaid('violet.800')
							setBgColorPaid('green.800')
						}
					}}></Button>
			</VStack>
		)
	}

	function FavoriteFriendsSection(props) {
		const [selected, setSelected] = useState(false)
		const friends = props.friends
		const createFavorites = (friends) => {
			const sortedFriends = friends.sort((a, b) => b.numPaymentRequests - a.numPaymentRequests)

			for (let i = 0; i < 4; i++) {
				if (sortedFriends[i] && !favorites.includes(sortedFriends[i])) {
					sortedFriends[i].selected = false
					favorites.push(sortedFriends[i])
				}
			}
		}

		createFavorites(friends)

		return (
			<>
				{/* The map below renders the sorted favorites array  */}
				{favorites.map((favorite) => {
					let totalBalance = 0
					Object.values(favorite.balance).map((item, id) => {
						if (item.payed === false) {
							totalBalance += item.price
						}
					})

					return (
						<Box key={uuid.v4()}>
							{/* The pressable code below keeps track of who is selected */}
							{favorite.selected && !renderPaid ? (
								<VStack flex={1}>
									<HStack alignItems='center' mb='3' mr='3'>
										<Button
											// alignSelf='center'
											bgColor='transparent'
											onPress={() => {
												let newFavorites = [...favorites]
												newFavorites[newFavorites.indexOf(favorite)].selected = !newFavorites[newFavorites.indexOf(favorite)].selected
												setFavorites(newFavorites)
											}}>
											<AntDesign name='checkcircle' size={47} color='green' />
										</Button>
										<Text pl='3'>{favorite.name}</Text>
										<Spacer />
										{renderPaid ? null : <Text>${Number.parseFloat(totalBalance).toFixed(2)}</Text>}
									</HStack>
									<HStack>
										<Text pl='12'>Qty</Text>
										<Spacer />
										<Text>Item</Text>
										<Spacer />
										<Spacer />
										<Text pr='4'>Price</Text>
									</HStack>

									{Object.values(favorite.balance).map((item, id) => {
										if (!item.payed) {
											return (
												<HStack alignItems='center' mb='3' mr='3'>
													<Button
														id={id}
														bgColor='transparent'
														size='md'
														onPress={() => {
															setSelected(id)
															setTimeout(() => {
																//jasonnnnnnnnnnnnnnn, right here is where we need to update item.payed in DB so it rerenders like you were talking about
																item.payed = true
															}, 2000)
														}}>
														<AntDesign name='checkcircleo' size={24} color='black' />
													</Button>
													<Text ml='3' mr='3' textDecorationLine={id === selected ? 'line-through' : null}>
														{item.qty}
													</Text>
													<Text textDecorationLine={id === selected ? 'line-through' : null}>{item.description}</Text>
													<Spacer />
													<Text textDecorationLine={id === selected ? 'line-through' : null}>${item.price}</Text>
												</HStack>
											)
										}
									})}
								</VStack>
							) : favorite.selected && renderPaid ? (
								<VStack flex={1}>
									<HStack alignItems='center' mb='3' mr='3'>
										<Button
											bgColor='transparent'
											onPress={() => {
												let newFavorites = [...favorites]
												newFavorites[newFavorites.indexOf(favorite)].selected = !newFavorites[newFavorites.indexOf(favorite)].selected
												setFavorites(newFavorites)
											}}>
											<AntDesign name='checkcircle' size={47} color='green' />
										</Button>
										<Text pl='3'>{favorite.name}</Text>
										<Spacer />
									</HStack>
									<HStack>
										<Text pl='12'>Qty</Text>
										<Spacer />
										<Text>Item</Text>
										<Spacer />
										<Spacer />
										<Text pr='4'>Price</Text>
									</HStack>
									{Object.values(favorite.balance).map((item, id) => {
										if (item.payed) {
											return (
												<VStack flex={1}>
													<HStack alignItems='center' mb='3' mr='3'>
														<Button
															id={id}
															bgColor='transparent'
															size='md'
															onPress={() => {
																setSelected(id)
																setTimeout(() => {
																	//jasonnnnnnnnnnnnnnn, right here is where we need to update item.payed in DB so it rerenders like you were talking about
																	item.payed = false
																}, 2000)
															}}>
															<AntDesign name='checkcircleo' size={24} color='green' />
														</Button>
														<Text ml='3' mr='3' textDecorationLine={id === selected ? 'line-through' : null}>
															{item.qty}
														</Text>
														<Text textDecorationLine={id === selected ? 'line-through' : null}>{item.description}</Text>
														<Spacer />
														<Text textDecorationLine={id === selected ? 'line-through' : null}>{item.price}</Text>
													</HStack>
												</VStack>
											)
										}
									})}
								</VStack>
							) : (
								<HStack flex={1} alignItems='center'>
									<Button
										bgColor='transparent'
										onPress={() => {
											let newFavorites = [...favorites]
											newFavorites[newFavorites.indexOf(favorite)].selected = !newFavorites[newFavorites.indexOf(favorite)].selected
											setFavorites(newFavorites)
										}}>
										<Avatar bg={favorite.avatarColor} justify='center'>
											{favorite.initials}
										</Avatar>
									</Button>
									<Text pl='3'>{favorite.name}</Text>
									<Spacer />
									{renderPaid ? null : <Text pr='3'>${Number.parseFloat(totalBalance).toFixed(2)}</Text>}
								</HStack>
							)}
							<VStack />
						</Box>
					)
				})}
			</>
		)
	}
	function AlphabeticalFriendsSection(props) {
		const { alphabet } = props
		const [friends, setFriends] = useState(props.friends)
		const [selected, setSelected] = useState(false)

		return alphabet.map((letter) => {
			return (
				<Box key={uuid.v4()}>
					<Text fontSize='11'> {letter} </Text>
					<Divider w='100%' alignSelf='center' />
					{/* The map below renders the sorted favorites array  */}
					{friends.map((friend) => {
						if (friend.name[0] === letter && !favorites.includes(friend) && friend.balance) {
							let totalBalance = 0
							Object.values(friend.balance).map((item, id) => {
								if (item.payed === false) {
									totalBalance += item.price
								}
							})
							return (
								<Box key={uuid.v4()}>
									{/* The pressable code below keeps track of who is selected */}
									{friend.selected && !renderPaid ? (
										//This first return from the ternary renders a list of unpaid items when you click the persons avatar
										<VStack>
											<HStack alignItems='center' mb='3' mr='3'>
												<Button
													bgColor='transparent'
													onPress={() => {
														let newFriends = [...friends]
														newFriends[newFriends.indexOf(friend)].selected = !newFriends[newFriends.indexOf(friend)].selected
														setFriends(newFriends)
													}}>
													<AntDesign name='checkcircle' size={47} color='green' />
												</Button>
												<Text pl='3'>{friend.name}</Text>
												<Spacer />
												{renderPaid ? null : <Text pr='3'>${Number.parseFloat(totalBalance).toFixed(2)}</Text>}
											</HStack>
											<HStack>
												<Text pl='12'>Qty</Text>
												<Spacer />
												<Text>Item</Text>
												<Spacer />
												<Spacer />
												<Text pr='4'>Price</Text>
											</HStack>
											{Object.values(friend.balance).map((item, id) => {
												if (!item.payed) {
													return (
														<VStack flex={1}>
															<HStack space='5' mb='3' mr='3'>
																<Button
																	id={id}
																	bgColor='transparent'
																	size='md'
																	onPress={() => {
																		setSelected(id)
																		setTimeout(() => {
																			//jasonnnnnnnnnnnnnnn, right here is where we need to update item.payed in DB so it rerenders like you were talking about
																			item.payed = true
																		}, 2000)
																	}}>
																	<AntDesign name='checkcircleo' size={24} color='black' />
																</Button>
																<Text textDecorationLine={id === selected ? 'line-through' : null}>{item.qty}</Text>
																<Text textDecorationLine={id === selected ? 'line-through' : null}>{item.description}</Text>
																<Spacer />
																<Text textDecorationLine={id === selected ? 'line-through' : null}>{item.price}</Text>
															</HStack>
														</VStack>
													)
												}
											})}
										</VStack>
									) : //this ternary renders a list of paid items when you have the paid tab selected and tap a friends avatar
									friend.selected && renderPaid ? (
										<VStack>
											<HStack alignItems='center' mb='3' mr='3'>
												<Button
													bgColor='transparent'
													onPress={() => {
														let newFriends = [...friends]
														newFriends[newFriends.indexOf(friend)].selected = !newFriends[newFriends.indexOf(friend)].selected
														setFriends(newFriends)
													}}>
													<AntDesign name='checkcircle' size={47} color='green' />
												</Button>
												<Text pl='3'>{friend.name}</Text>
												<Spacer />
												{renderPaid ? null : <Text pr='3'>${Number.parseFloat(totalBalance).toFixed(2)}</Text>}
											</HStack>
											<HStack>
												<Text pl='12'>Qty</Text>
												<Spacer />
												<Text>Item</Text>
												<Spacer />
												<Spacer />
												<Text pr='4'>Price</Text>
											</HStack>
											{Object.values(friend.balance).map((item, id) => {
												if (item.payed) {
													return (
														<VStack flex={1}>
															<HStack space='5' mb='3' mr='3'>
																<Button
																	id={id}
																	bgColor='transparent'
																	size='md'
																	onPress={() => {
																		setSelected(id)
																		setTimeout(() => {
																			//jasonnnnnnnnnnnnnnn, right here is where we need to update item.payed in DB so it rerenders like you were talking about
																			item.payed = true
																		}, 2000)
																	}}>
																	<AntDesign name='checkcircleo' size={24} color='black' />
																</Button>
																<Text textDecorationLine={id === selected ? 'line-through' : null}>{item.qty}</Text>
																<Text textDecorationLine={id === selected ? 'line-through' : null}>{item.description}</Text>
																<Spacer />
																<Text textDecorationLine={id === selected ? 'line-through' : null}>{item.price}</Text>
															</HStack>
														</VStack>
													)
												}
											})}
										</VStack>
									) : (
										//this last part of the ternary renders when no avatar is selected
										<HStack alignItems='center'>
											<Button
												bgColor='transparent'
												onPress={() => {
													let newFriends = [...friends]
													newFriends[newFriends.indexOf(friend)].selected = !newFriends[newFriends.indexOf(friend)].selected
													setFriends(newFriends)
												}}>
												<Avatar bg={friend.avatarColor} justify='center'>
													{friend.initials}
												</Avatar>
											</Button>
											<Text pl='3'>{friend.name}</Text>
											<Spacer />
											{renderPaid ? null : <Text pr='3'>${Number.parseFloat(totalBalance).toFixed(2)}</Text>}
										</HStack>
									)}
									<VStack />
								</Box>
							)
						}
					})}
				</Box>
			)
		})
	}

	return (
		<>
			<VStack flex={1} space='3' pt='5'>
				<HStack>
					<Spacer />
					<TabButton text={'Unpaid'} />
					<Spacer />
					<TabButton text={'Paid'} />
					<Spacer />
				</HStack>
				<HStack flex={1}>
					<ScrollView>
						<VStack space='4' pl='3'>
							{newFriends.length > 0 ? (
								<Box>
									<FavoriteFriendsSection friends={newFriends} />
									<AlphabeticalFriendsSection alphabet={alphabet} friends={newFriends} />
								</Box>
							) : null}
						</VStack>
					</ScrollView>
				</HStack>
			</VStack>
		</>
	)
}
