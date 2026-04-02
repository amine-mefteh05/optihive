import request from 'supertest';
import { app } from '../src/app.js';
import User from '../src/models/User.js';
import { connectDB, clearDB, closeDB } from './setup.js';
import jwt from 'jsonwebtoken';

beforeAll(async () => await connectDB());
afterEach(async () => await clearDB());
afterAll(async () => await closeDB());

describe('Auth API /api/auth', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('role', 'user'); // Default role
  });

  it('should login an existing user', async () => {
    // Manually create the user
    await User.create({ name: 'Bob', email: 'bob@example.com', password: 'password123' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'bob@example.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should reject invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'fake@example.com', password: 'wrong' });

    expect(res.statusCode).toBe(401);
  });
});
