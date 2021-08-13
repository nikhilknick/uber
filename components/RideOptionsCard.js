import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import { selectTraveTimeInformation } from '../slices/navSlice';

const data = [
	{
		id: 'Uber-X-123',
		title: 'UberX',
		multiplier: 1,
		image: 'https://links.papareact.com/3pn',
	},
	{
		id: 'Uber-XL-456',
		title: 'Uber XL',
		multiplier: 1.2,
		image: 'https://links.papareact.com/5w8',
	},
	{
		id: 'Uber-LUX-789',
		title: 'Uber LUX',
		multiplier: 1.75,
		image: 'https://links.papareact.com/7pf',
	},
];

//If we have SURGE pricing, this goes up
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
	const [selected, setSelected] = useState(null);
	const travelTimeInformation = useSelector(selectTraveTimeInformation);
	const navigation = useNavigation();
	return (
		<SafeAreaView style={tw`bg-white flex-grow`}>
			<View>
				<TouchableOpacity
					onPress={() => navigation.navigate('NavigateCard')}
					style={tw`absolute top-1 left-5`}
				>
					<Icon name="chevron-left" type="fontawesome" />
				</TouchableOpacity>
				<Text style={tw`text-center py-1 text-xl`}>
					Select a Ride - {travelTimeInformation?.distance?.text}
				</Text>
			</View>
			<FlatList
				data={data}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item: { id, title, multiplier, image }, item }) => (
					<TouchableOpacity
						onPress={() => setSelected(item)}
						style={tw`flex flex-row justify-between items-center px-10 ${
							id === selected?.id && 'bg-gray-200'
						}`}
					>
						<Image
							style={{ width: 100, height: 100, resizeMode: 'contain' }}
							source={{ uri: image }}
						/>
						<View style={tw`-ml-6`}>
							<Text style={tw`text-xl font-semibold`}>{title}</Text>
							<Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
						</View>
						<Text style={tw`text-xl`}>
							₹
							{(
								(travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) /
								100
							).toFixed(2)}
						</Text>
					</TouchableOpacity>
				)}
			/>
			<View style={tw`mt-auto border-t border-gray-200`}>
				<TouchableOpacity
					disabled={!selected}
					style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}
				>
					<Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
