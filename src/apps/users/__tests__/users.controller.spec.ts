import request from 'supertest';
import app from '../../../routes';
import userService from '../users.service';

jest.mock('../users.service.ts');

describe('users.controller', () => {
	describe('/users/auth/login', () => {

		afterEach(() => {
			jest.clearAllMocks();
		});

		it('should get HTTP 500 if credential invalid', async () => {

			(userService.userLogin as jest.Mock).mockRejectedValueOnce(
				new Error('User Not Found')
			);

			const resp = await request(app)
				.post('/users/auth/login')
				.send({
					username:'user1',
					password:'password1'
				});

			expect(resp.statusCode).toBe(200);

			const response = JSON.parse(resp.text);
			expect(response.code).toEqual(500);
		});

		it('should get HTTP 400 if `password` is missing', async () => {

			const resp = await request(app)
				.post('/users/auth/login')
				.send({
					username:'user1',
				});

			expect(resp.statusCode).toBe(200);

			const response = JSON.parse(resp.text);
			expect(response.code).toEqual(400);
		});

		it('should get HTTP 400 if `username` is missing', async () => {

			const resp = await request(app)
				.post('/users/auth/login')
				.send({
					password:'password1',
				});

			expect(resp.statusCode).toBe(200);

			const response = JSON.parse(resp.text);
			expect(response.code).toEqual(400);
		});

		it('should get HTTP 200 if credential valid', async () => {
			(userService.userLogin as jest.Mock).mockResolvedValueOnce(
				{
					isValid: true,
					token: 'ini_token_jwt'
				}
			);

			const resp = await request(app)
				.post('/users/auth/login')
				.send({
					username:'user1',
					password:'password1'
				});

			expect(resp.statusCode).toBe(200);

			const response = JSON.parse(resp.text);
			expect(response.code).toEqual(200);
		});
	});
});
