import {
	getUserRepository,
	User
} from '../../modules/helpers/database';
import { userLoginParams } from './users.type';

const findUserWithLogin = async (param: userLoginParams): Promise<User> => {

	const userRepository = getUserRepository();

	const _getUserData = (): Promise<User>=>{

		return new Promise((resolve,reject)=>{

			userRepository.findOne({
				username: param.username,
				password: param.password,
				isActive: true
			}, (err, res)=>{

				if(err){

					reject(err);
				}else{

					if(res === null){

						reject(new Error('User Not Found'));
					}else{

						resolve(res);
					}
				}
			});
		});
	}

	return _getUserData();
}

const findUserWithId = async (id: number): Promise<User> => {

	const userRepository = getUserRepository();

	const _getUserData = (): Promise<User>=>{

		return new Promise((resolve,reject)=>{

			userRepository.findOne({
				id: id,
				isActive: true
			}, (err, res)=>{

				if(err){

					reject(err);
				}else{

					if(res === null){

						reject(new Error('User Not Found'));
					}else{

						resolve(res);
					}
				}
			});
		});
	}

	return _getUserData();
}

export default {
	findUserWithLogin,
	findUserWithId
};
