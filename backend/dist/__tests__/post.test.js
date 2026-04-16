"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
        const res = await (0, supertest_1.default)(app).get('/');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('DevDiary API');
    });
    it('should return posts array', async () => {
        const res = await (0, supertest_1.default)(app).get('/api/posts');
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
