import Joi from 'joi';

const userLoginRequestParam: Joi.ObjectSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required()
});

export default {
	userLoginRequestParam
};
