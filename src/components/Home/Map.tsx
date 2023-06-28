import React, { useEffect } from 'react';
import { View, Dimensions, PermissionsAndroid, Alert } from 'react-native';
import { s } from 'react-native-wind';
import Mapbox from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import { IInstitutionRB } from '../../types';

interface IProps {
	institutions: Array<IInstitutionRB>;
}

Mapbox.setWellKnownTileServer(Mapbox.TileServers.Mapbox);
Mapbox.setAccessToken('pk.eyJ1IjoicmVhY3QtbmF0aXZlMjA1NjgiLCJhIjoiY2xmNzd0bnoxMXRtMjN4cjBqMzV4a3lldCJ9.mypib9nlR80yCb3PAA5MaQ');

const Map = ({ institutions }: IProps) => {
	const [myCoords, setMyCoords] = React.useState([0, 0]);
	const { width } = Dimensions.get('window');

	useEffect(() => {
		PermissionsAndroid.requestMultiple([
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
		])
		.then(granted => {
			// console.log(granted);
		}).catch(err => {
			// console.warn(err);
		});

		const watchId = Geolocation.watchPosition(
			(lastPosition) => {
				setMyCoords([lastPosition.coords.longitude, lastPosition.coords.latitude]);
			},
			(error) => Alert.alert(JSON.stringify(error)),
			{enableHighAccuracy: false, timeout: 20000, maximumAge: 0, distanceFilter: 1}
		);

		return () => {
			Geolocation.clearWatch(watchId);
		}
	}, []);

	return (
		<Mapbox.MapView 
			logoEnabled={false}
			attributionEnabled={false}
			style={[s`w-full mt-3`, {height: width / 1.5}]}
		>
			<Mapbox.Camera 
				zoomLevel={5}
				centerCoordinate={myCoords}
			/>
			<Mapbox.PointAnnotation 
				id='MyLocation'
				coordinate={myCoords}
			>
				<View style={s`items-center justify-center w-6 h-6 bg-blue-700 rounded-full`}>
					<View style={s`w-2 h-2 absolute rounded-full bg-white`}></View>
				</View>
			</Mapbox.PointAnnotation>
			{institutions.map((item, index) => 
				<Mapbox.PointAnnotation 
					id='MyLocation'
					coordinate={[+item.coordinates.split(',')[1], +item.coordinates.split(',')[0]]}
					key={`marker_${index}`}
				>
					<View></View>
				</Mapbox.PointAnnotation>
			)}
		</Mapbox.MapView>
	)
}

export default Map;