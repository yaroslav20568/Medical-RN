import { TypesEvents } from "../constants";

const returnDotColor = (typeEvent: string): string | undefined => {
	if(typeEvent === TypesEvents.TreatmentRegimen) {
		return 'red';
	} else if(typeEvent === TypesEvents.DoctorAppointment) {
		return 'blue';
	} else if(typeEvent === TypesEvents.TakingTests) {
		return 'yellow';
	} else if(typeEvent === TypesEvents.AnotherReminder) {
		return 'cyan';
	}
};

export default returnDotColor;