"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    it('should be defined', () => {
        expect(true).toBe(true);
    });
});
