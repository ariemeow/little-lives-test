import { slotListingParams, appointmentSlot, appointmentParams, appointmentCancelParams } from './slots.type';
import slotRepository from './slots.repository';
import { ConfigurationConstant } from '../../modules/helpers/constant';
import slotsUtility from './slots.utility';
import { Appointment } from '../../modules/helpers/database';
import helper from '../../modules/helpers/helper';

const getUserAppointments = async (uid: number): Promise<Appointment[]>=>{

    const currentDate = helper.formatDate(new Date());

	const appointmentDatas = await slotRepository.findUserAppointments(uid, currentDate);
    
    return appointmentDatas;
}

const cancelAppointment = async (uid: number, param: appointmentCancelParams): Promise<Appointment>=>{
    
    return slotRepository.cancelAppointment(uid, param.id);
}

const getListing = async (param: slotListingParams): Promise<appointmentSlot[]>=>{

    const appointmentDate = new Date(param.date);

    const holidayData = await slotRepository.getHoliday(param.date);
    if(holidayData){

        return [];
    }

    const configurationDatas = await slotRepository.getConfigs();

    const configOperationalDays = configurationDatas.find(obj => obj.constant == ConfigurationConstant.OPERATIONAL_DAYS);
    if(!configOperationalDays){

        throw new Error(`OPERATIONAL_DAYS configuration is missing`);
    }
    const operationalDays = JSON.parse(configOperationalDays.value);
    if(!operationalDays.includes(appointmentDate.getDay())){

        return [];
    }

	const appointmentDatas = await slotRepository.findScheduledAppointments(param.date);
    const appointmentSlots = slotsUtility.createAppointmentSlots(param.date, configurationDatas);

    for(let i=0; i<appointmentSlots.length; i++){
        
        const appointment = appointmentDatas.filter(obj => obj.time == appointmentSlots[i].time);
        appointmentSlots[i].available_slots -= appointment.length;
    }
    
    return appointmentSlots;
}

const createAppointment = async (uid:number, param: appointmentParams): Promise<Appointment>=>{

    const appointmentDate = new Date(param.date);

    const holidayData = await slotRepository.getHoliday(param.date);
    if(holidayData){

        throw new Error(`Can't make appointment due to holiday: ${holidayData.title}`);
    }

    const configurationDatas = await slotRepository.getConfigs();

    const configOperationalDays = configurationDatas.find(obj => obj.constant == ConfigurationConstant.OPERATIONAL_DAYS);
    if(!configOperationalDays){

        throw new Error(`OPERATIONAL_DAYS configuration is missing`);
    }
    const operationalDays = JSON.parse(configOperationalDays.value);
    if(!operationalDays.includes(appointmentDate.getDay())){

        throw new Error(`Can't make appointment due to not in operational days`);
    }

	const appointmentDatas = await slotRepository.findScheduledAppointments(param.date);
    const appointmentSlots = slotsUtility.createAppointmentSlots(param.date, configurationDatas);

    const currentAppointment = appointmentDatas.filter(obj => obj.time == param.time);
    const appointmentSlot = appointmentSlots.find(obj => obj.time == param.time);
    if(!appointmentSlot){
        
        throw new Error(`Can't make appointment due to appointment slot is not found`);
    }

    if(currentAppointment.length >= appointmentSlot.available_slots){

        throw new Error(`Can't make appointment due to appointment slot already full`);
    }

    const duplicateCheck = currentAppointment.find(obj => obj.uid == uid);
    if(duplicateCheck){

        throw new Error(`Can't make appointment due to appointment slot already booked - duplicate`);
    }

    const createAppointment = await slotRepository.createAppointment(uid, param.date, param.time);
    
    return createAppointment;
}

export default {
	getListing,
    createAppointment,
    getUserAppointments,
    cancelAppointment
};
