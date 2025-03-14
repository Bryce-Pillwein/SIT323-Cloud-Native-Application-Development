import { Response } from 'express';

/**
 * Extracts a single string value from a query parameter.
 * @param param - The query parameter which may be a string or an array of strings.
 * @returns The extracted string value or an empty string if undefined.
 */
export const extractParam = (param: string | string[] | undefined): string => {
  if (Array.isArray(param)) {
    return param[0];
  }
  return param ?? '';
};

/**
 * Sends an error response with a 400 status code.
 * @param res - Express response object.
 * @param message - The error message to be sent.
 */
export const sendError = (res: Response, message: string): void => {
  res.status(400).json({ error: message });
};

/**
 * Safely parses a string to a floating-point number.
 * Trims the input before parsing.
 * @param value - The string value to parse.
 * @returns The parsed number, or NaN if the input is invalid.
 */
export const safeParseFloat = (value: string): number => {
  const trimmed = value.trim();
  return parseFloat(trimmed);
};

/**
 * Validates two numeric inputs.
 * @param res - Express response object.
 * @param num1 - The first number to validate.
 * @param num2 - The second number to validate.
 * @returns True if both inputs are valid numbers; false otherwise.
 */
export const validateNumbers = (res: Response, num1: number, num2: number): boolean => {
  if (isNaN(num1) && isNaN(num2)) {
    sendError(res, `Inputs ${num1} and ${num2} are invalid. Please provide valid numbers.`);
    return false;
  }

  if (isNaN(num1)) {
    sendError(res, `First Input: ${num1} is invalid. Please provide a valid number.`);
    return false;
  }

  if (isNaN(num2)) {
    sendError(res, `Second Input: ${num2} is invalid. Please provide a valid number.`);
    return false;
  }

  return true;
};
