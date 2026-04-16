"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postController_1 = require("../controllers/postController");
jest.mock('../models/Post', () => ({
    find: jest.fn().mockReturnThis(),
    findOne: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnValue([]),
    save: jest.fn(),
}));
describe('Post Controller', () => {
    let mockRequest;
    let mockResponse;
    let jsonMock;
    let statusMock;
    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        mockRequest = {};
        mockResponse = {
            json: jsonMock,
            status: statusMock,
        };
    });
    describe('getAllPosts', () => {
        it('should return all published posts', async () => {
            await (0, postController_1.getAllPosts)(mockRequest, mockResponse);
            expect(mockResponse.json).toHaveBeenCalled();
        });
    });
    describe('getPostBySlug', () => {
        it('should return 404 if post not found', async () => {
            mockRequest.params = { slug: 'nonexistent' };
            await (0, postController_1.getPostBySlug)(mockRequest, mockResponse);
            expect(statusMock).toHaveBeenCalledWith(404);
        });
    });
    describe('createPost', () => {
        it('should create a post with valid data', async () => {
            mockRequest.body = {
                title: 'Test Post',
                content: 'Test content',
                published: true,
            };
            mockRequest.user = { id: 'user123', email: 'test@test.com', role: 'user' };
            await (0, postController_1.createPost)(mockRequest, mockResponse);
            expect(statusMock).toHaveBeenCalledWith(201);
        });
    });
});
