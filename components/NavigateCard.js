import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import { useDispatch } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/core';
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	return (
		<SafeAreaView style={tw`bg-white flex-1`}>
			<Text style={tw`text-center py-5 pt-0 text-xl`}>Good Morning, Nick</Text>
			<View style={tw`border-t border-gray-200 flex-shrink`}>
				<View>
					<GooglePlacesAutocomplete
						styles={toInputBoxStyles}
						onPress={(data, details = null) => {
							dispatch(
								setDestination({
									location: details.geometry.location,
									description: data.description,
								})
							);
							navigation.navigate('RideOptionsCard');
						}}
						fetchDetails={true}
						placeholder="Where to?"
						query={{
							key: GOOGLE_MAPS_APIKEY,
							language: 'en',
						}}
						nearbyPlacesAPI="GooglePlacesSearch"
						enablePoweredByContainer={false}
						debounce={400}
					/>
				</View>
				<NavFavourites />
			</View>
			<View style={tw`flex flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
				<TouchableOpacity
					onPress={() => navigation.navigate('RideOptionsCard')}
					style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
				>
					<Icon name="car" type="font-awesome" color="white" size={16} />
					<Text style={tw`text-white text-center`}>Rides</Text>
				</TouchableOpacity>
				<TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
					<Icon name="car" type="font-awesome" color="black" size={16} />
					<Text style={tw`text-black text-center`}>Eates</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
	container: {
		flex: 0,
		backgroundColor: 'white',
		paddingTop: 0,
	},
	textInput: {
		fontSize: 18,
		backgroundColor: '#DDDDDF',
		borderRadius: 0,
	},
	textInputContainer: {
		paddingHorizontal: 20,
		paddingBottom: 0,
	},
});
