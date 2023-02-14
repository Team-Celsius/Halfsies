import { Avatar, HStack, VStack, Text, Input, Spacer, Divider, Box, Heading, Pressable, Icon, Modal, FormControl, Button, Select, CheckIcon, ZStack } from 'native-base'
import { AntDesign, Feather } from '@expo/vector-icons'
import { SwipeListView } from 'react-native-swipe-list-view'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ref, set, push } from 'firebase/database'
import { auth, db } from '../Firebase/firebaseConfig'
import uuid from 'react-native-uuid'
import * as React from 'react'
import * as SMS from 'expo-sms'

export default function AssignItems(props) {
	const [smsAvailable, setSmsAvailable] = useState(false)
	const [participants, setParticipants] = useState(props.route.params.participants)

async function sendBills (participants) {
  for(let i = 0; i < participants.length; ++i) {
    await onComposeSms(participants[i])
  }
}

	const onComposeSms = React.useCallback(
    async (participant) => {
				if (smsAvailable) {
					await SMS.sendSMSAsync(
						'8025950578',
						`${participant.bill.map((item) => {
              return Object.entries(item)
              .map(([name, value]) => `${name}: ${value} \n`).toString().replace(',' , ' ')
						}).join('')}`.replace(',' , ' ')
					)
				}
			},
				[smsAvailable]
	)

  
	const navigation = useNavigation()
	const userId = auth.currentUser.uid
  
	const data = props.route.params.ocrResults.items
	const [listData, setListData] = useState(data)
  
	useEffect(() => {
    SMS.isAvailableAsync().then(setSmsAvailable)
		participants.forEach((participant) => {
			participant.bill = []
		})
	}, [])

	const splitQuantity = (qty, userArr) => {
		const length = Object.keys(userArr).length
		return length === 0
			? 0
			: //rounds to the nearest 100th will need reworking for precision
			  Math.ceil((qty / length) * 100) / 100
	}

	function addItemsData(userId, listData) {
		const newList = JSON.parse(JSON.stringify(listData))
		newList.forEach((data) => {
			data.users = data.users.reduce((accumulator, value) => {
				return { ...accumulator, [value.userId]: value }
			}, {})

			const { description, key, price, qty, selected } = data

			for (const user in data.users) {
				const friendRef = ref(db, 'users/' + userId + '/friends/' + user + '/balance')
				const newFriendRef = push(friendRef)

				set(newFriendRef, {
					itemUid: newFriendRef.key,
					description: description,
					key: key,
					price: price,
					qty: splitQuantity(qty, data.users),
					selected: selected,
					payed: false,
				})
			}
		})
	}

	function AddItemManually() {
		const [modalVisible, setModalVisible] = useState(false)
		const [inputQty, setInputQty] = useState(1)
		const [inputDescription, setInputDescription] = useState()
		const [inputPrice, setInputPrice] = useState()
		const [errors, setErrors] = useState(false)
		const [buttonColor, setButtonColor] = useState('violet.800')
		const validate = () => {
			const inputPriceAsFloat = parseFloat(inputPrice)
			if (isNaN(inputPriceAsFloat)) {
				setErrors(true)
				return false
			} else if (typeof inputQty !== 'number') {
				setErrors(true)
				return false
			} else if (typeof inputDescription !== 'string' || inputDescription.trim().length === 0) {
				// this length check will make sure the desc isn't empty, or contains only whitespace characters
				setErrors(true)
				return false
			} else if (inputQty <= 0 || Math.floor(inputQty) !== inputQty) {
				// makes sure the number is positive, and not a decimal
				setErrors(true)
				return false
			}
			return true
		}

		function SelectDropdownMenu() {
			const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
			return (
				<Select
					selectedValue={inputQty.toString()}
					// this was being toString'ed, but the validate function is making sure it's a number
					// so validation should have permanently failed qty
					_selectedItem={{
						bgColor: 'violet.800',
						endIcon: <CheckIcon size='5' />,
					}}
					mt={1}
					onValueChange={(quantity) => {
						setInputQty(Number(quantity))
					}}>
					{numbers.map((number) => {
						return <Select.Item key={numbers + 20} alignItems='center' label={number.toString()} value={number.toString()} />
					})}
				</Select>
			)
		}
		return (
			<>
				<Modal isOpen={modalVisible} avoidKeyboard justifyContent='space-around' bottom='4' size='lg' onClose={() => setModalVisible(false)}>
					<Spacer />
					<Modal.Content>
						<Modal.CloseButton />
						<Modal.Header>Manually enter item</Modal.Header>
						<Modal.Body>
							<FormControl mt='3'>
								<FormControl.Label>Qty</FormControl.Label>
								<SelectDropdownMenu />
								<FormControl.Label>Description</FormControl.Label>
								<Input onChangeText={(userDescription) => setInputDescription(userDescription)} />
								<FormControl.Label>Price per item</FormControl.Label>
								<Input InputLeftElement={<Text ml='1.5'>$</Text>} onChangeText={(itemPrice) => setInputPrice(Number(itemPrice))} />
								<FormControl.HelperText> Price must be a number. Do not include "$"</FormControl.HelperText>
							</FormControl>
						</Modal.Body>
						<Modal.Footer>
							<Button
								key={'formButton'}
								flex='1'
								bgColor={buttonColor}
								onPress={() => {
									if (validate()) {
										setButtonColor('green.500')
										setTimeout(() => {
											setButtonColor('violet.800')
											setListData([
												...listData,
												{
													key: uuid.v4(),
													qty: inputQty,
													description: inputDescription,
													price: inputPrice,
													selected: false,
													users: [],
												},
											])
										}, 1000)
									} else {
										setButtonColor('red.500')
										setTimeout(() => {
											setButtonColor('violet.800')
										}, 1000)
									}
								}}>
								Add Item
							</Button>
						</Modal.Footer>
					</Modal.Content>
					<Spacer />
					<Spacer />
					<Spacer />
				</Modal>
				<VStack alignSelf='center' space='1'>
					<Avatar bg='violet.800'>
						<Button
							bg='transparent'
							onPress={() => {
								setModalVisible(!modalVisible)
							}}>
							+
						</Button>
					</Avatar>
				</VStack>
			</>
		)
	}

	//eventually want to make it so that it does not scroll up after deleting an item
	function SwipeableScrollableMenu() {
		function closeRow(rowMap, rowKey) {
			if (rowMap[rowKey]) {
				rowMap[rowKey].closeRow()
			}
		}
		function deleteRow(rowMap, rowKey) {
			closeRow(rowMap, rowKey)
			const newData = [...listData]
			const prevIndex = listData.findIndex((item) => item.key === rowKey)
			newData.splice(prevIndex, 1)
			setListData(newData)
		}
		function renderItem({ item }) {
			let newData = [...listData]
			let newParticipants = [...participants]
			return (
				<Box>
					<Pressable
						bgColor='white'
						onPress={() => {
							participants.map((participant) => {
								newData[newData.indexOf(item)].selected = !newData[newData.indexOf(item)].selected

								if (participant.selected === true && !item.users.includes(participant)) {
									setListData(newData)
									newData[newData.indexOf(item)].users.push(participant)
									newParticipants[newParticipants.indexOf(participant)].bill.push({ description: item.description, price: item.price })
									setParticipants(newParticipants)
								}
							})
						}}>
						<VStack m='4'>
							<HStack p='3'>
								<Text>{item.qty}</Text>
							
								<Text ml="10">{item.description}</Text>
								<Spacer />
								<Text>
									{new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'USD',
									}).format(item.price)}
								</Text>
							</HStack>
							<HStack flexWrap='wrap' space='1' ml="10" pl="4">
								{participants.map((participant) => {
									if (item.users.includes(participant)) {
										return (
											<Pressable

												key={uuid.v4()}
												onPress={() => {
													newData = [...listData]
													newData[newData.indexOf(item)].users.splice(item.users.indexOf(participant), 1)
													setListData(newData)
													newParticipants[newParticipants.indexOf(participant)].bill.splice(newParticipants[newParticipants.indexOf(participant)].bill.indexOf(item), 1)
													setParticipants(newParticipants)
												}}>
												<Avatar size={50} bg={participant.avatarColor}>
													{participant.initials}
												</Avatar>
											</Pressable>
										)
									}
								})}
							</HStack>
							<Divider bgColor='violet.800' />
						</VStack>
					</Pressable>
				</Box>
			)
		}
		function renderHiddenItem(data, rowMap) {
			return (
				<HStack flex='1' pl='2'>
					<Spacer />
					<Pressable
						w='70'
						cursor='pointer'
						bg='red.500'
						justifyContent='center'
						onPress={() => {
							deleteRow(rowMap, data.item.key)
						}}
						_pressed={{ opacity: 0.5 }}>
						<VStack alignItems='center' space={2}>
							<Icon as={<Feather name='delete' />} color='white' size='xs' />
							<Text color='white' fontSize='xs' fontWeight='medium'>
								Delete
							</Text>
						</VStack>
					</Pressable>
				</HStack>
			)
		}

		return (
			<>
				<SwipeListView data={listData} renderItem={renderItem} renderHiddenItem={renderHiddenItem} rightOpenValue={-70} previewRowKey={'0'} previewOpenValue={-40} previewOpenDelay={3000} />
			</>
		)
	}

	return (
		<VStack bgColor='white' h='100%'>
			<HStack mt='5' mb='5'>
				<Spacer />
				<VStack alignSelf='center'>
					<AddItemManually />
				</VStack>
				<Spacer />
			</HStack>

			<SwipeableScrollableMenu />
			{/* Avatar section */}
			<VStack>
				<HStack flexWrap='wrap' space='1' mb='3' alignSelf='center'>
					{participants.map((participant) => {
						return (
							<Pressable
								key={uuid.v4()}
								onPress={() => {
									let newData = [...participants]
									newData[newData.indexOf(participant)].selected = !newData[newData.indexOf(participant)].selected
									setParticipants(newData)
								}}>
								{participant.selected === true ? (
									<ZStack>
										<AntDesign name='checkcircle' size={50} color='green' />
										<Text alignSelf='center' color='white'>
											{participant.initials}
										</Text>
									</ZStack>
								) : (
									<Avatar key={participant.name} bg={participant.avatarColor}>
										{participant.initials}
									</Avatar>
								)}
							</Pressable>
						)
					})}
					{/* These have no functionality at the moment
            <Avatar bg='violet.800'>
							<VStack alignItems='center'>
								<MaterialCommunityIcons name='account-group' size={24} color='violet.800' />
								<MaterialCommunityIcons name='account-group' size={24} color='violet.800' />
								<Text color='white'>All</Text>
							</VStack>
						</Avatar>
						<Avatar bg='violet.800'>+</Avatar> */}
				</HStack>
				<Button
					w='100%'
					h='70'
					bg='violet.800'
					rounded='none'
					onPress={ async () => {
						addItemsData(userId, listData, uuid)
            sendBills(participants)
						// {participants.map( (participant) =>  {  onComposeSms(participant)})}
						// navigation.navigate('Summary', {
						// 	participants: participants,
						// })
					}}>
					Confirm
				</Button>
			</VStack>
		</VStack>
	)
}
