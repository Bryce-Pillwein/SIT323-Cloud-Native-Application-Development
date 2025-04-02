"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const operationRoutes_1 = __importDefault(require("./routes/operationRoutes"));
const app = (0, express_1.default)();
// Calculator routes with a base path
app.use('/calculator', operationRoutes_1.default);
// Simple home route
app.get('/', (req, res) => {
    res.send('Welcome to the Calculator Microservice!');
});
// Start the server
const PORT = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
    console.log(`Calculator microservice is running on port ${PORT}.`);
});
