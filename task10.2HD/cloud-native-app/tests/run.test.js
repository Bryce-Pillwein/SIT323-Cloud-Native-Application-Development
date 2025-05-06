"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe('Run API Endpoints', () => {
    it('should log a run successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/run')
            .send({
            userId: 'testUser',
            startTime: '2025-04-03T10:00:00Z',
            distance: 5000,
            pace: 300,
            route: [{ lat: 0, lng: 0, timestamp: '2025-04-03T10:00:00Z' }],
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Run logged successfully');
    }));
    it('should fetch runs for a user', () => __awaiter(void 0, void 0, void 0, function* () {
        // Log a run first to ensure data exists
        yield (0, supertest_1.default)(app_1.default)
            .post('/api/run')
            .send({
            userId: 'testUser',
            startTime: '2025-04-03T10:00:00Z',
            distance: 5000,
            pace: 300,
            route: [{ lat: 0, lng: 0, timestamp: '2025-04-03T10:00:00Z' }],
        });
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/run/testUser');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.runs)).toBe(true);
    }));
});
