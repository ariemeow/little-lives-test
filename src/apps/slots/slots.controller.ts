import express, { NextFunction, Request, Response, Router } from 'express';
import slotValidator from './slots.validator';
import helper from '../../modules/helpers/helper';
import { userToken } from '../users/users.type';
import userRepository from '../users/users.repository';
import { appointmentCancelParams, appointmentParams, slotListingParams } from './slots.type';
import slotsService from './slots.service';

const router: Router = express.Router();

router.use(async (req: Request, res: Response, next: NextFunction)=>{

	const bearerToken = req.headers.authorization || '';

	try{

		const isBearer = bearerToken.includes('Bearer');
		const token = isBearer ? bearerToken.split(' ')[1] : bearerToken;

		const decodedToken = helper.decode(token) as userToken;

		const userData = await userRepository.findUserWithId(decodedToken.uid);
		
		req.userData = userData;

		next();
	}catch(err: any){

		res.send({
			code: 401,
			msg: err.message
		});
	}
});

router.get('/me', async (_req: Request, res: Response) => {

    if(!_req.userData){

		res.send({
			code: 401
		});
        return;
    }

	try{

        res.send({
            code:200,
            data: await slotsService.getUserAppointments(_req.userData.id)
        });
	}catch(err: any){

		res.send({
			code: 500,
			msg: err.message
		});
	}
});

router.patch('/cancel', async (_req: Request, res: Response) => {

    if(!_req.userData){

		res.send({
			code: 401
		});
        return;
    }

	try{

		const validateParam = await slotValidator.appointmentCancelParam.validate(_req.body);

		if(validateParam.error){

			res.send({
				code: 400,
				msg: validateParam.error.details[0].message
			});
		}else{

			const param: appointmentCancelParams = validateParam.value as appointmentCancelParams;

			res.send({
				code:200,
				data: await slotsService.cancelAppointment(_req.userData.id, param)
			});
		}
	}catch(err: any){

		res.send({
			code: 500,
			msg: err.message
		});
	}
});

router.get('/', async (_req: Request, res: Response) => {

	try{

		const validateParam = await slotValidator.slotRequestParam.validate(_req.query);

		if(validateParam.error){

			res.send({
				code: 400,
				msg: validateParam.error.details[0].message
			});
		}else{

			const param: slotListingParams = validateParam.value as slotListingParams;

			res.send({
				code:200,
				data: await slotsService.getListing(param)
			});
		}
	}catch(err: any){

		res.send({
			code: 500,
			msg: err.message
		});
	}
}).post('/', async (_req: Request, res: Response) => {

    if(!_req.userData){

		res.send({
			code: 401
		});
        return;
    }

	try{

		const validateParam = await slotValidator.appointmentRequestParam.validate(_req.body);

		if(validateParam.error){

			res.send({
				code: 400,
				msg: validateParam.error.details[0].message
			});
		}else{

			const param: appointmentParams = validateParam.value as appointmentParams;

			res.send({
				code:200,
				data: await slotsService.createAppointment(_req.userData.id, param)
			});
		}
	}catch(err: any){

		res.send({
			code: 500,
			msg: err.message
		});
	}
});


export default express.Router().use('/slots', router);