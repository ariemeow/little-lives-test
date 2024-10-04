import express, { Request, Response, Router } from 'express';
import userValidator from './users.validator';
import userService from './users.service';
import { userLoginParams } from './users.type';

const router: Router = express.Router();

router.post('/auth/login', async (_req: Request, res: Response) => {

	try{

		const validateParam = await userValidator.userLoginRequestParam.validate(_req.body);

		if(validateParam.error){

			res.send({
				code: 400,
				msg: validateParam.error.details[0].message
			});
		}else{

			const param: userLoginParams = validateParam.value as userLoginParams;

			res.send({
				code:200,
				data: await userService.userLogin(param)
			});
		}
	}catch(err: any){

		res.send({
			code: 500,
			msg: err.message
		});
	}
});

export default express.Router().use('/users', router);
