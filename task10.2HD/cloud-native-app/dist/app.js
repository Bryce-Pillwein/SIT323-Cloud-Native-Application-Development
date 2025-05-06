"use strict";
// App
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const run_routes_1 = __importDefault(require("./routes/run.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('TempoTrack Cloud Backend is running');
});
app.use('/api/run', run_routes_1.default);
exports.default = app;
