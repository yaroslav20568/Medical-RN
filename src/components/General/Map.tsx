import React, { useState, useEffect } from 'react';
import { useWindowDimensions, PermissionsAndroid } from 'react-native';
import { s } from 'react-native-wind';
import Mapbox from '@rnmapbox/maps';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import { IInstitution } from '../../types';
import { mapBoxDirectionsUrl, mapBoxApiKey } from '../../constants';

interface IProps {
	institutions: Array<IInstitution>;
}

interface IDistanceAndDuration {
	distance: number;
	duration: number;
}

interface IRouteDirection extends IDistanceAndDuration {
	geometry: {
		coordinates: Array<Position>;
	}
}

interface IDirection {
	routes: Array<IRouteDirection>;
}

Mapbox.setAccessToken(mapBoxApiKey);

const Map = observer(({ institutions }: IProps) => {
	const [myCoords, setMyCoords] = useState<Array<number>>([0, 0]);
	const [routes, setRoutes] = useState<Array<Position>>([]);
	const [distanceAndDurationArr, setDistanceAndDurationArr] = useState<Array<IDistanceAndDuration>>([]);

	const { width } = useWindowDimensions();

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
	}, []);

	const getHoursAndMinutes = (duration: number): string => {
		const durationHSplit = String(duration).split('.');
		const hours = durationHSplit[0];
		const minutes = Math.ceil(Number('0.' + Number(durationHSplit[1])) * 60);
		
		return `${hours}ч ${minutes}м`
	};

	const fetchDirections = async () => {
		const responses = await Promise.all(
			institutions.map((institution) => 
				axios<IDirection>(`${mapBoxDirectionsUrl}/driving/${myCoords[0]},${myCoords[1]};${institution.coordinates}?overview=full&geometries=geojson&access_token=${mapBoxApiKey}`)
			)
		);

		let shortDistanceDirection = responses[0].data;

		responses.forEach(({ data }) => {
			if(shortDistanceDirection.routes[0].distance > data.routes[0].distance) {
				shortDistanceDirection = {...data};
			}

			const distance = Math.ceil(data.routes[0].distance / 1000);
			const duration = data.routes[0].duration / 60 / 60;
			
			setDistanceAndDurationArr((prevDistanceAndDurationArr) => [...prevDistanceAndDurationArr, {distance, duration}]);
		});

		setRoutes(shortDistanceDirection.routes[0].geometry.coordinates);
	};
	
	useEffect(() => {
		fetchDirections();
	}, [myCoords, institutions]);

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
			<Mapbox.UserLocation 
				showsUserHeadingIndicator={true}
				onUpdate={(location) => setMyCoords([location.coords.longitude, location.coords.latitude])}
			/>
			{routes.length ? 
				<Mapbox.ShapeSource
					id={'routeSource'}
					lineMetrics={true}
					shape={{
						properties: {},
						type: 'Feature',
						geometry: {
							type: 'LineString',
							coordinates: routes
						}
					}}
				>
					<Mapbox.LineLayer
						id="exampleLineLayer"
						style={{
							lineColor: '#000',
							lineCap: 'round',
							lineJoin: 'round',
							lineWidth: 4
						}}
					/>
				</Mapbox.ShapeSource> : 
				''
			}
			{institutions.map((institution, index) => 
				<Mapbox.PointAnnotation 
					id={`institution_${index}`}
					coordinate={[+institution.coordinates.split(',')[0], +institution.coordinates.split(',')[1]]}
					key={`marker_${index}`}
				>
					{distanceAndDurationArr.length ? 
						<Mapbox.Callout title={`Расстояние: ${distanceAndDurationArr[index].distance}км, время: ${getHoursAndMinutes(distanceAndDurationArr[index].duration)}`} /> : 
						<></>}
				</Mapbox.PointAnnotation>
			)}
		</Mapbox.MapView>
	)
})

export default Map;