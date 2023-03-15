import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';
import connectDB from '../../database/connection';
import { AuthRequest } from './auth-types';

describe('Given an app with auth-router', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUrl = mongoServer.getUri();
    await connectDB(mongoUrl);
  });

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.connection.close();
  });

  describe('When a user wants to register with a valid mail and password', () => {
    test('Then it should be registered', async () => {
      const user: AuthRequest = {
        email: 'n4t4l14@gmail.com',
        password: 'indescifrable',
      };

      await request(app).post('/auth/register').send(user).expect(201);
    });
  });

  describe('When a user wants to register with an invalid email', () => {
    test('Then it should not be registered', async () => {
      const invalidUser: AuthRequest = {
        email: 'm@',
        password: 'indescifrable2',
      };

      const response = await request(app)
        .post('/auth/register')
        .send(invalidUser)
        .expect(400);

      expect(response.body).toEqual({
        msg: '"email" must be a valid email',
      });
    });
  });
});
