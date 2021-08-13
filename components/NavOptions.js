import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin } from '../slices/navSlice';

const data = [
	{
		id: 123,
		title: 'Get a ride',
		image: 'https://links.papareact.com/3pn',
		screen: 'MapScreen',
	},
	{
		id: 456,
		title: 'Order food',
		image: 'https://links.papareact.com/28w',
		screen: 'EatsScreen',
	},
];

const NavOptions = () => {
	const navigation = useNavigation();
	const origin = useSelector(selectOrigin);
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id.toString()}
			horizontal
			renderItem={({ item }) => (
				// <View>
				<TouchableOpacity
					disabled={!origin}
					onPress={() => navigation.navigate(item.screen)}
					style={tw`bg-gray-200 p-2 pl-6 pb-8 pt-4 w-40 m-2`}
				>
					<View style={tw`${!origin && 'opacity-20'} `}>
						<Image
							source={{ uri: item.image }}
							style={{ width: 120, height: 120, resizeMode: 'contain' }}
						/>
						<Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
						<Icon
							style={tw`p-2 bg-black rounded-full w-10 mt-4`}
							type="antdesign"
							name="arrowright"
							color="white"
						/>
					</View>
				</TouchableOpacity>
				// </View>
			)}
		/>
	);
};

export default NavOptions;

const styles = StyleSheet.create({});
