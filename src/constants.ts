const siteUrl = 'http://192.168.100.33:5000';

enum TypesEvents {
	TreatmentRegimen = 'Схема лечения',
  DoctorAppointment = 'Запись к врачу',
	TakingTests = 'Сдача анализов',
	AnotherReminder = 'Другое напоминание',
}

export { siteUrl, TypesEvents };