import request from 'supertest';
import { app } from '../src/app.js';
import User from '../src/models/User.js';
import Project from '../src/models/Project.js';
import { connectDB, clearDB, closeDB } from './setup.js';
import jwt from 'jsonwebtoken';

let token;
let user;

beforeAll(async () => await connectDB());
afterEach(async () => await clearDB());
afterAll(async () => await closeDB());

beforeEach(async () => {
  // Create test user and token before each test
  user = await User.create({ name: 'Alice', email: 'alice@example.com', password: 'password123', role: 'user' });
  token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'test_secret', { expiresIn: '1h' });
});

describe('Projects API /api/projects', () => {
  it('should create a project attached to the user', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'New Test Project', priority: 'high' });

    expect(res.statusCode).toBe(201);
    expect(res.body.project).toHaveProperty('title', 'New Test Project');
    expect(res.body.project.owner._id ? res.body.project.owner._id.toString() : res.body.project.owner.toString()).toBe(user._id.toString());
  });

  it('should fetch user projects', async () => {
    await Project.create({ title: 'A Project', owner: user._id });

    const res = await request(app)
      .get('/api/projects')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.projects.length).toBe(1);
    expect(res.body.projects[0].title).toBe('A Project');
  });
});
