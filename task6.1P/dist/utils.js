"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNumbers = exports.safeParseFloat = exports.sendError = exports.extractParam = void 0;
/**
 * Extracts a single string value from a query parameter.
 * @param param - The query parameter which may be a string or an array of strings.
 * @returns The extracted string value or an empty string if undefined.
 */
const extractParam = (param) => {
    if (Array.isArray(param)) {
        return param[0];
    }
    return param !== null && param !== void 0 ? param : '';
};
exports.extractParam = extractParam;
/**
 * Sends an error response with a 400 status code.
 * @param res - Express response object.
 * @param message - The error message to be sent.
 */
const sendError = (res, message) => {
    res.status(400).json({ error: message });
};
exports.sendError = sendError;
/**
 * Safely parses a string to a floating-point number.
 * Trims the input before parsing.
 * @param value - The string value to parse.
 * @returns The parsed number, or NaN if the input is invalid.
 */
const safeParseFloat = (value) => {
    const trimmed = value.trim();
    return parseFloat(trimmed);
};
exports.safeParseFloat = safeParseFloat;
/**
 * Validates two numeric inputs.
 * @param res - Express response object.
 * @param num1 - The first number to validate.
 * @param num2 - The second number to validate.
 * @returns True if both inputs are valid numbers; false otherwise.
 */
const validateNumbers = (res, num1, num2) => {
    if (isNaN(num1) && isNaN(num2)) {
        (0, exports.sendError)(res, `Inputs ${num1} and ${num2} are invalid. Please provide valid numbers.`);
        return false;
    }
    if (isNaN(num1)) {
        (0, exports.sendError)(res, `First Input: ${num1} is invalid. Please provide a valid number.`);
        return false;
    }
    if (isNaN(num2)) {
        (0, exports.sendError)(res, `Second Input: ${num2} is invalid. Please provide a valid number.`);
        return false;
    }
    return true;
};
exports.validateNumbers = validateNumbers;
