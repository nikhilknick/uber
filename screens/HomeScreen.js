import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { setDestination, setOrigin } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
	const dispatch = useDispatch();
	return (
		<SafeAreaView style={GlobalStyles.droidSafeArea}>
			<View style={tw`p-5`}>
				<Image
					source={{ uri: 'https://links.papareact.com/gzs' }}
					style={{ width: 120, height: 120, resizeMode: 'contain' }}
				/>
				<GooglePlacesAutocomplete
					styles={{
						container: {
							flex: 0,
						},
						textInput: {
							fontSize: 18,
						},
					}}
					onPress={(data, details = null) => {
						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description,
							})
						);

						dispatch(setDestination(null));
					}}
					fetchDetails={true}
					placeholder="Where from?"
					query={{
						key: GOOGLE_MAPS_APIKEY,
						language: 'en',
					}}
					nearbyPlacesAPI="GooglePlacesSearch"
					enablePoweredByContainer={false}
					debounce={400}
				/>
				<NavOptions />
				<NavFavourites />
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	text: {
		color: 'blue',
	},
});
