import request from 'supertest';
import app from '../../../routes';

describe('default.controller', () => {
	describe('/ping', () => {
		it('should get pong response with HTTP 200', (done) => {
			request(app)
				.get('/ping')
				.then((response) => {
					expect(response.text).toEqual('pong');
					expect(response.statusCode).toBe(200);
					done();
				});
		});
	});
});
