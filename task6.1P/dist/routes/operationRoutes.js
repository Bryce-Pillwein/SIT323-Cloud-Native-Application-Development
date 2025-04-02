"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
/**
 * GET /add
 * Calculates the sum of num1 and num2.
 */
router.get('/add', (req, res) => {
    const num1Str = (0, utils_1.extractParam)(req.query.num1);
    const num2Str = (0, utils_1.extractParam)(req.query.num2);
    const a = (0, utils_1.safeParseFloat)(num1Str);
    const b = (0, utils_1.safeParseFloat)(num2Str);
    if (!(0, utils_1.validateNumbers)(res, a, b))
        return;
    res.json({ result: a + b });
});
/**
 * GET /subtract
 * Calculates the difference between num1 and num2.
 */
router.get('/subtract', (req, res) => {
    const num1Str = (0, utils_1.extractParam)(req.query.num1);
    const num2Str = (0, utils_1.extractParam)(req.query.num2);
    const a = (0, utils_1.safeParseFloat)(num1Str);
    const b = (0, utils_1.safeParseFloat)(num2Str);
    if (!(0, utils_1.validateNumbers)(res, a, b))
        return;
    res.json({ result: a - b });
});
/**
 * GET /multiply
 * Calculates the product of num1 and num2.
 */
router.get('/multiply', (req, res) => {
    const num1Str = (0, utils_1.extractParam)(req.query.num1);
    const num2Str = (0, utils_1.extractParam)(req.query.num2);
    const a = (0, utils_1.safeParseFloat)(num1Str);
    const b = (0, utils_1.safeParseFloat)(num2Str);
    if (!(0, utils_1.validateNumbers)(res, a, b))
        return;
    res.json({ result: a * b });
});
/**
 * GET /divide
 * Calculates the quotient of num1 divided by num2.
 */
router.get('/divide', (req, res) => {
    const num1Str = (0, utils_1.extractParam)(req.query.num1);
    const num2Str = (0, utils_1.extractParam)(req.query.num2);
    const a = (0, utils_1.safeParseFloat)(num1Str);
    const b = (0, utils_1.safeParseFloat)(num2Str);
    if (!(0, utils_1.validateNumbers)(res, a, b))
        return;
    if (b === 0) {
        (0, utils_1.sendError)(res, 'Division by zero is not allowed.');
        return;
    }
    res.json({ result: a / b });
});
/**
 * GET /exponent
 * Calculates num1 raised to the power of num2.
 */
router.get('/exponent', (req, res) => {
    const baseStr = (0, utils_1.extractParam)(req.query.num1);
    const expStr = (0, utils_1.extractParam)(req.query.num2);
    const base = (0, utils_1.safeParseFloat)(baseStr);
    const exponent = (0, utils_1.safeParseFloat)(expStr);
    if (!(0, utils_1.validateNumbers)(res, base, exponent))
        return;
    res.json({ result: Math.pow(base, exponent) });
});
/**
 * GET /sqrt
 * Calculates the square root of a given number.
 */
router.get('/sqrt', (req, res) => {
    const numStr = (0, utils_1.extractParam)(req.query.num1);
    const num = (0, utils_1.safeParseFloat)(numStr);
    if (isNaN(num)) {
        (0, utils_1.sendError)(res, `Input ${numStr} is invalid. Please provide a valid number.`);
        return;
    }
    if (num < 0) {
        (0, utils_1.sendError)(res, 'Square root of a negative number is not allowed.');
        return;
    }
    res.json({ result: Math.sqrt(num) });
});
/**
 * GET /modulo
 * Calculates the remainder of num1 divided by num2.
 */
router.get('/modulo', (req, res) => {
    const num1Str = (0, utils_1.extractParam)(req.query.num1);
    const num2Str = (0, utils_1.extractParam)(req.query.num2);
    const a = (0, utils_1.safeParseFloat)(num1Str);
    const b = (0, utils_1.safeParseFloat)(num2Str);
    if (!(0, utils_1.validateNumbers)(res, a, b))
        return;
    if (b === 0) {
        (0, utils_1.sendError)(res, 'Modulo by zero is not allowed.');
        return;
    }
    res.json({ result: a % b });
});
exports.default = router;
