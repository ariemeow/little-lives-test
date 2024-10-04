import request from 'supertest';
import app from '../../../routes';
import userRepository from '../../users/users.repository';
import slotsRepository from '../../slots/slots.repository';
import helper from '../../../modules/helpers/helper';

jest.mock('../../users/users.repository');
jest.mock('../../slots/slots.repository');

describe('slots.controller', () => {
	describe('GET /slots', () => {

        beforeEach(() => {

			(slotsRepository.getConfigs as jest.Mock).mockResolvedValueOnce(
                [
                    {
                        constant:'START_TIME',
                        value:'09:00'
                    },
                    {
                        constant:'END_TIME',
                        value:'18:00'
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
                ]
			);
        });
		afterEach(() => {
			jest.clearAllMocks();
		});

		it('should get HTTP 401 if credential invalid', async () => {

			const resp = await request(app)
				.get('/slots');

			expect(resp.statusCode).toBe(200);

			const response = JSON.parse(resp.text);
			expect(response.code).toEqual(401);
		});

		it('should get HTTP 200 if credential valid', async () => {

			(userRepository.findUserWithId as jest.Mock).mockResolvedValueOnce(
				{
					id:1,
					username:'user1',
					password:'password1',
					isActive:true
				}
			);
            
			(slotsRepository.findScheduledAppointments as jest.Mock).mockResolvedValueOnce([]);

            const dt = new Date();
            dt.setDate(dt.getDate() + 1);
            if([0,6].includes(dt.getDay())){

                dt.setDate(dt.getDate() + 3);
            }

			const resp = await request(app)
				.get('/slots')
                .query({
                    date: helper.formatDate(dt)
                })
				.set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTY1OTcxMzAzOX0.5XHjMVnP9SRXkgFak93QbMTWccW1J5PawPa7Eiao5hs');

			expect(resp.statusCode).toBe(200);

			const response = JSON.parse(resp.text);
			expect(response.code).toEqual(200);
            expect(slotsRepository.findScheduledAppointments).toBeCalledTimes(1);
		});
	});
    
	describe('POST /slots', () => {

        beforeEach(() => {

			(slotsRepository.getConfigs as jest.Mock).mockResolvedValueOnce(
                [
                    {
                        constant:'START_TIME',
                        value:'09:00'
                    },
                    {
                        constant:'END_TIME',
                        value:'18:00'
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
                ]
			);
        });
		afterEach(() => {
			jest.clearAllMocks();
		});

		it('should get HTTP 401 if credential invalid', async () => {

			const resp = await request(app)
				.post('/slots');

			expect(resp.statusCode).toBe(200);

			const response = JSON.parse(resp.text);
			expect(response.code).toEqual(401);
		});

		it('should get HTTP 200 if credential valid', async () => {

			(userRepository.findUserWithId as jest.Mock).mockResolvedValueOnce(
				{
					id:1,
					username:'user1',
					password:'password1',
					isActive:true
				}
			);
			(slotsRepository.findScheduledAppointments as jest.Mock).mockResolvedValueOnce([]);

            const dt = new Date();
            dt.setDate(dt.getDate() + 1);
            if([0,6].includes(dt.getDay())){

                dt.setDate(dt.getDate() + 3);
            }
            
			(slotsRepository.createAppointment as jest.Mock).mockResolvedValueOnce(
				{
					_id: 'abc',
                    date: helper.formatDate(dt),
                    time: '09:00',
                    isActive: true,
                    uid: 1
				}
			);

			const resp = await request(app)
				.post('/slots')
                .send({
                    date: helper.formatDate(dt),
                    time: '09:00'
                })
				.set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTY1OTcxMzAzOX0.5XHjMVnP9SRXkgFak93QbMTWccW1J5PawPa7Eiao5hs');

			expect(resp.statusCode).toBe(200);

			const response = JSON.parse(resp.text);
			expect(response.code).toEqual(200);
            expect(slotsRepository.createAppointment).toBeCalledTimes(1);
		});
	});
    
	describe('GET /slots/me', () => {

        beforeEach(() => {

			(slotsRepository.getConfigs as jest.Mock).mockResolvedValueOnce(
                [
                    {
                        constant:'START_TIME',
                        value:'09:00'
                    },
                    {
                        constant:'END_TIME',
                        value:'18:00'
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
                ]
			);
        });
		afterEach(() => {
			jest.clearAllMocks();
		});

		it('should get HTTP 401 if credential invalid', async () => {

			const resp = await request(app)
				.get('/slots/me');

			expect(resp.statusCode).toBe(200);

			const response = JSON.parse(resp.text);
			expect(response.code).toEqual(401);
		});

		it('should get HTTP 200 if credential valid', async () => {

			(userRepository.findUserWithId as jest.Mock).mockResolvedValueOnce(
				{
					id:1,
					username:'user1',
					password:'password1',
					isActive:true
				}
			);

            const dt = new Date();
            dt.setDate(dt.getDate() + 1);
            if([0,6].includes(dt.getDay())){

                dt.setDate(dt.getDate() + 3);
            }
            
            const appointmentData = {
                _id: 'abc',
                date: helper.formatDate(dt),
                time: '09:00',
                isActive: true,
                uid: 1
            };
			(slotsRepository.findUserAppointments as jest.Mock).mockResolvedValueOnce([appointmentData]);

			const resp = await request(app)
                .get('/slots/me')
                .set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTY1OTcxMzAzOX0.5XHjMVnP9SRXkgFak93QbMTWccW1J5PawPa7Eiao5hs');

			expect(resp.statusCode).toBe(200);

			const response = JSON.parse(resp.text);
			expect(response.code).toEqual(200);
            expect(slotsRepository.findUserAppointments).toBeCalledTimes(1);
		});
	});
    
	describe('PATCH /slots/cancel', () => {

        beforeEach(() => {

			(slotsRepository.getConfigs as jest.Mock).mockResolvedValueOnce(
                [
                    {
                        constant:'START_TIME',
                        value:'09:00'
                    },
                    {
                        constant:'END_TIME',
                        value:'18:00'
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
                ]
			);
        });
		afterEach(() => {
			jest.clearAllMocks();
		});

		it('should get HTTP 401 if credential invalid', async () => {

			const resp = await request(app)
				.patch('/slots/cancel');

			expect(resp.statusCode).toBe(200);

			const response = JSON.parse(resp.text);
			expect(response.code).toEqual(401);
		});

		it('should get HTTP 200 if credential valid', async () => {

			(userRepository.findUserWithId as jest.Mock).mockResolvedValueOnce(
				{
					id:1,
					username:'user1',
					password:'password1',
					isActive:true
				}
			);

            const dt = new Date();
            dt.setDate(dt.getDate() + 1);
            if([0,6].includes(dt.getDay())){

                dt.setDate(dt.getDate() + 3);
            }
            
			(slotsRepository.cancelAppointment as jest.Mock).mockResolvedValueOnce(
				{
					_id: 'abc',
                    date: helper.formatDate(dt),
                    time: '09:00',
                    isActive: true,
                    uid: 1
				}
			);

			const resp = await request(app)
				.patch('/slots/cancel')
                .send({
                    id: 'abc'
                })
				.set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTY1OTcxMzAzOX0.5XHjMVnP9SRXkgFak93QbMTWccW1J5PawPa7Eiao5hs');

			expect(resp.statusCode).toBe(200);

			const response = JSON.parse(resp.text);
			expect(response.code).toEqual(200);
            expect(slotsRepository.cancelAppointment).toBeCalledTimes(1);
		});
	});
});
