import Nedb from 'nedb';

export type User = {
	id: number;
	username: string;
	password: string;
	isActive: boolean;
}
let userRepository: Nedb<User>;

export type Appointment = {
	uid: number;
	date: string;
	time: string;
	isActive: boolean;
}
let appointmentRepository: Nedb<Appointment>;

export type Holiday = {
	date: string;
	title: string;
	isActive: boolean;
}
let holidayRepository: Nedb<Holiday>;

export type Configuration = {
	constant: string;
	value: string;
}
let configurationRepository: Nedb<Configuration>;

const getUserRepository = (): Nedb<User> => {

	if(!userRepository){

		userRepository = new Nedb<User>();
	}

	return userRepository;
}

const getAppointmentRepository = (): Nedb<Appointment> => {

	if(!appointmentRepository){

		appointmentRepository = new Nedb<Appointment>();
	}

	return appointmentRepository;
}

const getHolidayRepository = (): Nedb<Holiday> => {

	if(!holidayRepository){

		holidayRepository = new Nedb<Holiday>();
	}

	return holidayRepository;
}

const getConfigurationRepository = (): Nedb<Configuration> => {

	if(!configurationRepository){

		configurationRepository = new Nedb<Configuration>();
	}

	return configurationRepository;
}

export {
	getUserRepository,
	getAppointmentRepository,
	getHolidayRepository,
	getConfigurationRepository
};
