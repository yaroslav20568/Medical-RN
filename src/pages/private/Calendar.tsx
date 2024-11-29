import React, { useEffect } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { s } from 'react-native-wind';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CalendarContent, GoBack, HeaderLogo } from '../../components';
import { RootStackParams } from '../../navigation/HomeStacks';
import { calendarStore, userStore } from '../../mobx';

interface IProps extends NativeStackScreenProps<RootStackParams, 'Calendar'> {}

const Calendar = observer(({ navigation }: IProps) => {
	useEffect(() => {
		calendarStore.loadCalendarEvents(userStore.userData?.id);
	}, []);

	return (
		<View style={s`flex-auto pb-3`}>
			<HeaderLogo 
				logo={require('../../assets/images/vstrecha-logo.png')} 
			/>
			<GoBack 
				navigation={navigation} 
			/>
			<View style={s`flex-auto mt-3 px-3`}>
				<CalendarContent 
					calendarEvents={calendarStore.getCalendarEventsObj}
					markedDates={calendarStore.getMarkedDates}
				/>
			</View>
		</View>
	)
})

export default Calendar;