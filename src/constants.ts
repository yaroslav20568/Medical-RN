const siteUrl = 'http://192.168.100.33:5000';
const mapBoxDirectionsUrl = 'https://api.mapbox.com/directions/v5/mapbox';
const mapBoxApiKey = 'pk.eyJ1IjoicmVhY3QtbmF0aXZlMjA1NjgiLCJhIjoiY20yeW45NHhoMDJkcDJsczdqdmZvcXNtciJ9.WrAHFryTEAt40nf6SISkeA';

enum TypesEvents {
	TreatmentRegimen = 'Схема лечения',
  DoctorAppointment = 'Запись к врачу',
	TakingTests = 'Сдача анализов',
	AnotherReminder = 'Другое напоминание',
}

const genders = [
	{label: 'Мужской', value: 'Мужской'},
	{label: 'Женский', value: 'Женский'}
];

export { siteUrl, mapBoxDirectionsUrl, mapBoxApiKey, TypesEvents, genders };