import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectDestination, selectOrigin, setTimeTravelInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';

const Map = () => {
	const origin = useSelector(selectOrigin);
	const dispatch = useDispatch();
	const destination = useSelector(selectDestination);
	const mapRef = useRef(null);

	console.log('origin', origin);
	console.log('destination', destination);

	useEffect(() => {
		if (!origin || !destination) return;
		//Zoom out and fit to map
		mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
			edgePadding: { top: 50, right: 50, left: 50, bottom: 50 },
		});
	}, [origin, destination]);

	useEffect(() => {
		if (!origin || !destination) return;
		const getTravelTime = async () => {
			const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}
			`;

			fetch(url)
				.then((res) => res.json())
				.then((data) => {
					dispatch(setTimeTravelInformation(data.rows[0].elements[0]));
				});
		};
		getTravelTime();
	}, [origin, destination, GOOGLE_MAPS_APIKEY]);

	return (
		<MapView
			ref={mapRef}
			style={tw`flex-1`}
			mapType="mutedStandard"
			initialRegion={{
				latitude: origin.location.lat,
				longitude: origin.location.lng,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005,
			}}
		>
			{destination && origin && (
				<MapViewDirections
					lineDashPattern={[0]}
					origin={origin.description}
					destination={destination.description}
					apikey={GOOGLE_MAPS_APIKEY}
					strokeWidth={3}
					strokeColor="black"
				/>
			)}
			{origin && (
				<Marker
					coordinate={{
						latitude: origin.location.lat,
						longitude: origin.location.lng,
					}}
					title="Origin"
					description={origin.description}
					identifier="origin"
				/>
			)}

			{destination && (
				<Marker
					coordinate={{
						latitude: destination.location.lat,
						longitude: destination.location.lng,
					}}
					title="Destination"
					description={destination.description}
					identifier="destination"
				/>
			)}
		</MapView>
	);
};

export default Map;

const styles = StyleSheet.create({});
