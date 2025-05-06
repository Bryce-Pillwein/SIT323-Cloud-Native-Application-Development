"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const run_controller_1 = require("../controllers/run.controller");
const runRouter = express_1.default.Router();
runRouter.post('/start', run_controller_1.startRun);
runRouter.post('/update', run_controller_1.updateRun);
runRouter.post('/pause', run_controller_1.pauseRun);
runRouter.post('/resume', run_controller_1.resumeRun);
runRouter.post('/finish', run_controller_1.finishRun);
runRouter.post('/cancel', run_controller_1.cancelRun);
runRouter.get('/:userId', run_controller_1.getRunsByUser);
exports.default = runRouter;
