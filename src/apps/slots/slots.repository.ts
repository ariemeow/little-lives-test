import {
	getAppointmentRepository,
	Appointment,
    Configuration,
    getConfigurationRepository,
    getHolidayRepository,
    Holiday
} from '../../modules/helpers/database';

const cancelAppointment = async (uid: number, id: string): Promise<Appointment> => {

	const appointmentRepository = getAppointmentRepository();

	const _cancelAppointment = (): Promise<Appointment>=>{

		return new Promise((resolve,reject)=>{

			appointmentRepository.find({
				_id: id,
                uid: uid,
				isActive: true
			}, (err, res)=>{

				if(err){

					reject(err);
				}else{

                    appointmentRepository.update({
                        _id: id
                    },{
                        $set: {
                            isActive: false
                        }
                    }, {}, (err)=>{

                        if(err){

                            reject(err);
                        }else{

                            resolve(res);
                        }
                    });
				}
			});
		});
	}

	return _cancelAppointment();
}

const findUserAppointments = async (uid: number, date: string): Promise<Appointment[]> => {

	const appointmentRepository = getAppointmentRepository();

	const _getAppointmentDatas = (): Promise<Appointment[] | null>=>{

		return new Promise((resolve,reject)=>{

			appointmentRepository.find({
				date: {
                    $gte: date
                },
                uid: uid,
				isActive: true
			}, (err, res)=>{

				if(err){

					reject(err);
				}else{

                    resolve(res);
				}
			});
		});
	}

    const datas = await _getAppointmentDatas();

	return datas ? datas : [];
}

const findScheduledAppointments = async (date: string): Promise<Appointment[]> => {

	const appointmentRepository = getAppointmentRepository();

	const _getAppointmentDatas = (): Promise<Appointment[] | null>=>{

		return new Promise((resolve,reject)=>{

			appointmentRepository.find({
				date: date,
				isActive: true
			}, (err, res)=>{

				if(err){

					reject(err);
				}else{

                    resolve(res);
				}
			});
		});
	}

    const datas = await _getAppointmentDatas();

	return datas ? datas : [];
}

const getConfigs = async (): Promise<Configuration[]> => {

	const configRepository = getConfigurationRepository();

	const _getConfigs = (): Promise<Configuration[]>=>{

		return new Promise((resolve,reject)=>{

			configRepository.find({}, (err, res)=>{

				if(err){

					reject(err);
				}else{

                    resolve(res);
				}
			});
		});
	}

    return _getConfigs();
}

const getHoliday = async (date: string): Promise<Holiday> => {

	const holidayRepository = getHolidayRepository();

	const _getHoliday = (): Promise<Holiday>=>{

		return new Promise((resolve,reject)=>{

			holidayRepository.findOne({
                date: date,
                isActive: true
            }, (err, res)=>{

				if(err){

					reject(err);
				}else{

                    resolve(res);
				}
			});
		});
	}

    return _getHoliday();
}

const createAppointment = async (uid: number, date: string, time: string): Promise<Appointment> => {
    
	const appointmentRepository = getAppointmentRepository();

	const _createAppointment = (): Promise<Appointment>=>{

		return new Promise((resolve,reject)=>{

            appointmentRepository.insert({
                uid: uid,
                date: date,
                time: time,
                isActive: true
            }, (err, doc)=>{

				if(err){

					reject(err);
				}else{

                    resolve(doc);
				}
            });
		});
	}

    return _createAppointment();
}

export default {
	findScheduledAppointments,
    getConfigs,
    getHoliday,
    createAppointment,
    findUserAppointments,
    cancelAppointment
};
