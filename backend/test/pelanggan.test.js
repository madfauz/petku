import supertest from'supertest';
import {web} from '../src/application/web.js';
import {logger} from '../src/application/logging.js';
import {createTestUser, getTestUser, removeTestUser} from "./test-util.js";
import bcrypt from "bcrypt";

describe('POST /api/pelanggan', function () {
    afterEach(async () => {
        await removeTestUser();
    })

    it('should can register new pelanggan', async () => {
        const result = await supertest(web)
            .post('/api/pelanggan')
            .send({
                username: 'test',
                email: 'test@test.com',
                password: 'rahasia',
            });

            logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.password).toBeUndefined();
    });
}) 