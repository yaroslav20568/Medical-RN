import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "axios";
import { ICalendarEvent } from '../types';
import { siteUrl } from "../constants";
import { AgendaSchedule } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { DOT } from "react-native-calendars/src/calendar/day/marking";
import { returnDotColor } from "../helpers";

class CalendarStore {
	isLoading: boolean;
	calendarEvents: Array<ICalendarEvent>;

	constructor() {
		this.isLoading = false;
		this.calendarEvents = [];
		makeObservable(this, {
			isLoading: observable,
			calendarEvents: observable,
			loadCalendarEvents: action
		})
	}

	loadCalendarEvents(userId: number | undefined) {
		this.isLoading = true;
		axios<Array<ICalendarEvent>>(`${siteUrl}/api/calendar-events?userId=${userId}`)
    .then(({ data }) => {
			runInAction(() => {
				this.calendarEvents = data;
				this.isLoading = false;
			});
		})
	}

	get getCalendarEventsObj() {
		const calendarEventsObj: AgendaSchedule = {};
		this.calendarEvents.forEach(calendarEvent => {
			const date = calendarEvent.dateEvent.slice(0, 10);
			if(!calendarEventsObj.hasOwnProperty(date)) {
				calendarEventsObj[date] = [calendarEvent];
			} else {
				calendarEventsObj[date] = [...calendarEventsObj[date], calendarEvent];
			}
		});

		return calendarEventsObj;
	}

	get getMarkedDates() {
		const markedDatesObj: MarkedDates = {};
		this.calendarEvents.forEach(calendarEvent => {
			const date = calendarEvent.dateEvent.slice(0, 10);
			const color = returnDotColor(calendarEvent.typeEvent);
			if(!markedDatesObj.hasOwnProperty(date)) {
				markedDatesObj[date] = {
					dots: [{key: calendarEvent.typeEvent, color: color}]
				};
			} else {
				let dots: Array<DOT> = markedDatesObj[date].dots || [];
				markedDatesObj[date] = {
					dots: [...dots, {key: calendarEvent.typeEvent, color: color}]
				};
			}
		});

		return markedDatesObj;
	}
}

export default new CalendarStore();