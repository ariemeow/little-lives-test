import JoiCore from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiCore.extend(JoiDate) as typeof JoiCore;

const slotRequestParam: JoiCore.ObjectSchema = Joi.object({
	date: Joi.date().greater(new Date().setHours(0,0,-1)).format('YYYY-MM-DD').raw().required()
});

const appointmentRequestParam: JoiCore.ObjectSchema = Joi.object({
	date: Joi.date().greater(new Date().setHours(0,0,-1)).format('YYYY-MM-DD').raw().required(),
	time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required()
});

const appointmentCancelParam: JoiCore.ObjectSchema = Joi.object({
	id: Joi.string().required()
});

export default {
    slotRequestParam,
    appointmentRequestParam,
    appointmentCancelParam
};
