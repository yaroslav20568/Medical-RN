import React, { useState, useEffect } from 'react';
import { View, Dimensions, PermissionsAndroid, Alert } from 'react-native';
import { s } from 'react-native-wind';
import Mapbox from '@rnmapbox/maps';
import { observer } from 'mobx-react-lite';
import Geolocation from '@react-native-community/geolocation';
import { IInstitution } from '../../types';

interface IProps {
	institutions: Array<IInstitution>;
}

Mapbox.setAccessToken('sk.eyJ1IjoicmVhY3QtbmF0aXZlMjA1NjgiLCJhIjoiY20yejExb3IzMDY3azJpc2FtYTlxeGtpeiJ9.WE6Wqe9kd7I__WswYQIk6g');

const Map = observer(({ institutions }: IProps) => {
	const [myCoords, setMyCoords] = useState<Array<number>>([0, 0]);
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
			scaleBarEnabled={false}
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
					coordinate={[+item.coordinates.split(',')[0], +item.coordinates.split(',')[1]]}
					key={`marker_${index}`}
				>
					<></>
				</Mapbox.PointAnnotation>
			)}
		</Mapbox.MapView>
	)
})

export default Map;