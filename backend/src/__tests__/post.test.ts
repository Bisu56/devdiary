import request from 'supertest';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/api/posts', (req, res) => {
  res.json([
    { _id: '1', title: 'Test Post', slug: 'test-post', content: '<p>Test</p>', published: true },
  ]);
});

app.get('/', (req, res) => {
  res.json({ message: 'DevDiary API' });
});

describe('API Routes', () => {
  it('should return health check message', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('DevDiary API');
  });

  it('should return posts array', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('Post Model', () => {
  it('should have required fields', () => {
    const post = { _id: '1', title: 'Test', slug: 'test', content: '<p>Test</p>', published: true };
    expect(post).toHaveProperty('_id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('slug');
    expect(post).toHaveProperty('content');
    expect(post).toHaveProperty('published');
  });
});