import { makeObservable, observable, action, runInAction, computed } from "mobx";
import axios from "axios";
import { ICalendarEvent } from '../types';
import { siteUrl } from "../constants";
import { AgendaSchedule } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { returnDotColor } from "../helpers";

class CalendarStore {
	calendarEvents: Array<ICalendarEvent>;

	constructor() {
		this.calendarEvents = [];
		makeObservable(this, {
			calendarEvents: observable,
			loadCalendarEvents: action,
			getCalendarEventsObj: computed,
			getMarkedDates: computed
		})
	}

	loadCalendarEvents(userId: number | undefined): void {
		axios<Array<ICalendarEvent>>(`${siteUrl}/api/calendar-events?userId=${userId}`)
    .then(({ data }) => {
			runInAction(() => {
				this.calendarEvents = data;
			});
		})
	}

	get getCalendarEventsObj(): AgendaSchedule {
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

	get getMarkedDates(): MarkedDates {
		const markedDatesObj: MarkedDates = {};
		this.calendarEvents.forEach(calendarEvent => {
			const date = calendarEvent.dateEvent.slice(0, 10);
			const color = returnDotColor(calendarEvent.typeEvent);
			if(!markedDatesObj.hasOwnProperty(date)) {
				markedDatesObj[date] = {
					dots: [{key: calendarEvent.typeEvent, color: color}]
				};
			} else {
				let dots = markedDatesObj[date].dots || [];
				markedDatesObj[date] = {
					dots: [...dots, {key: calendarEvent.typeEvent, color: color}]
				};
			}
		});

		return markedDatesObj;
	}
}

export default new CalendarStore();