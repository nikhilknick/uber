import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';

const data = [
	{
		id: '123',
		icon: 'home',
		location: 'Home',
		destination: 'New Delhi, India',
	},
	{
		id: '456',
		icon: 'briefcase',
		location: 'Work',
		destination: 'Gurgaon, India',
	},
	{
		id: '678',
		icon: 'briefcase',
		location: 'Work',
		destination: 'Noida, India',
	},
];

const NavFavourites = () => {
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id.toString()}
			ItemSeparatorComponent={() => <View style={[tw`bg-gray-300`,{height:0.5}]} />}
			renderItem={({ item: { location, destination, icon } }) => (
				<TouchableOpacity style={tw`flex-row items-center p-5`}>
					<Icon
						style={tw`rounded-full mr-4 bg-gray-300 p-3`}
						name={icon}
						type="ionicon"
						color="white"
						size={18}
					/>
					<View style={tw`font-semibold text-lg`}>
						<Text style={tw`text-gray-500`}>{location}</Text>
						<Text>{destination}</Text>
					</View>
				</TouchableOpacity>
			)}
		/>
	);
};

export default NavFavourites;

const styles = StyleSheet.create({});
