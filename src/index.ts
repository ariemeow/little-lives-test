import { Request, Response } from 'express';
import logger from './modules/helpers/logger';
import server from './routes';
import {
	getConfigurationRepository,
	getHolidayRepository,
	getUserRepository
} from './modules/helpers/database';

const runningPort = process.env.PORT || '8080';
if(!runningPort){

	throw new Error('PORT is not defined');
}

const _fillMockData = ():void => {

	const userRepository = getUserRepository();

	userRepository.insert([
		{
			id:1,
			username:'user1',
			password:'password1',
			isActive:true
		},{
			id:2,
			username:'user2',
			password:'password2',
			isActive:false
		},{
			id:3,
			username:'user3',
			password:'password3',
			isActive:true
		}
	], (err)=>{

		if(err){

			logger.log(`Failed to insert mock data : ${err.message}`);
		}else{

			logger.log('[User] Mock data inserted succesfully');
		}
	});
	
	const holidayRepository = getHolidayRepository();

	holidayRepository.insert([
		{
			date: '2024-10-05',
			title: 'Owner want to go holiday',
			isActive: true
		}
	], (err)=>{

		if(err){

			logger.log(`Failed to insert mock data : ${err.message}`);
		}else{

			logger.log('[Holiday] Mock data inserted succesfully');
		}
	});

	const configurationRepository = getConfigurationRepository();
	
	configurationRepository.insert([
		{
			constant:'START_TIME',
			value:'08:00'
		},
		{
			constant:'END_TIME',
			value:'17:00'
		},
		{
			constant:'OPERATIONAL_DAYS',
			value:'[1,2,3,4,5]'
		},
		{
			constant:'START_BREAK_HOUR',
			value:'12:00'
		},
		{
			constant:'BREAK_HOUR_DURATION',
			value:'3600'
		},
		{
			constant:'SLOT_COUNT',
			value:'1'
		},
		{
			constant:'SLOT_DURATION',
			value:'1800'
		}
	], (err)=>{

		if(err){

			logger.log(`Failed to insert mock data : ${err.message}`);
		}else{

			logger.log('[Config] Mock data inserted succesfully');
		}
	});
}

server.listen(runningPort, async () => {

	logger.log(`app running listening on port ${runningPort}`);
	_fillMockData();

	server.all('*', (_req: Request, res: Response) => {

		res.sendStatus(404);
	});
});
