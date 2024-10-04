import { User } from '../../modules/helpers/database';
import helper from '../../modules/helpers/helper';
import userRepository from './users.repository';
import { userLoginResponse, userLoginParams, userToken } from './users.type';

const userLogin = async (param: userLoginParams): Promise<userLoginResponse>=>{

	const userData: User = await userRepository.findUserWithLogin(param);

	const token: userToken = {
		uid: userData.id
	};

	return {
		isValid: true,
		token: helper.encode(token)
	} as userLoginResponse;
}

export default {
	userLogin
};
