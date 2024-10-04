import { ConfigurationConstant } from "../../modules/helpers/constant";
import { Configuration } from "../../modules/helpers/database";
import { appointmentSlot } from "./slots.type";
import helper from '../../modules/helpers/helper';

const createAppointmentSlots = (date: string, configurations: Configuration[]): appointmentSlot[] => {
    
    const currentTime = helper.convertToUnixTimestamp(new Date());

    const configStartTime = configurations.find(obj => obj.constant == ConfigurationConstant.START_TIME);
    if(!configStartTime){

        throw new Error(`START_TIME configuration is missing`);
    }
    const configEndTime = configurations.find(obj => obj.constant == ConfigurationConstant.END_TIME);
    if(!configEndTime){

        throw new Error(`END_TIME configuration is missing`);
    }
    const configSlotCount = configurations.find(obj => obj.constant == ConfigurationConstant.SLOT_COUNT);
    if(!configSlotCount){

        throw new Error(`SLOT_COUNT configuration is missing`);
    }
    const configSlotDuration = configurations.find(obj => obj.constant == ConfigurationConstant.SLOT_DURATION);
    if(!configSlotDuration){

        throw new Error(`SLOT_DURATION configuration is missing`);
    }
    const configStartBreak = configurations.find(obj => obj.constant == ConfigurationConstant.START_BREAK_HOUR);
    if(!configStartBreak){

        throw new Error(`START_BREAK_HOUR configuration is missing`);
    }
    const configBreakDuration = configurations.find(obj => obj.constant == ConfigurationConstant.BREAK_HOUR_DURATION);
    if(!configBreakDuration){

        throw new Error(`BREAK_HOUR_DURATION configuration is missing`);
    }
    
    let startTime = helper.convertToUnixTimestamp(new Date(`${date} ${configStartTime.value}:00`));
    const endTime = helper.convertToUnixTimestamp(new Date(`${date} ${configEndTime.value}:00`));
    const startBreak = helper.convertToUnixTimestamp(new Date(`${date} ${configStartBreak.value}:00`));
    const endBreak = startBreak + parseInt(configBreakDuration.value);
    
    let slots: appointmentSlot[] = [];
    let loop = true;
    
    while(loop){
        
        if(startTime >= endTime){

            loop = false;
            break;
        }
        const isBreak = startTime >= startBreak && startTime < endBreak;
        const isPast = startTime < currentTime;

        if(!isBreak && !isPast){

            const availableSlot = parseInt(configSlotCount.value);
            const timeSlot = helper.getTimeFromUnixTimestamp(startTime);

            slots.push({
                date: date,
                time: timeSlot,
                available_slots: availableSlot
            });
        }

        startTime += parseInt(configSlotDuration.value);
    }
    
    return slots;
}

export default {
    createAppointmentSlots
};