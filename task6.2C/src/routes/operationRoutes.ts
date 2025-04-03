import express, { Request, Response } from 'express';
import { extractParam, sendError, safeParseFloat, validateNumbers } from '../utils';

const router = express.Router();

/**
 * GET /add
 * Calculates the sum of num1 and num2.
 */
router.get('/add', (req: Request, res: Response): void => {
  const num1Str = extractParam(req.query.num1 as string | string[]);
  const num2Str = extractParam(req.query.num2 as string | string[]);
  const a = safeParseFloat(num1Str);
  const b = safeParseFloat(num2Str);

  if (!validateNumbers(res, a, b)) return;
  res.json({ result: a + b });
});

/**
 * GET /subtract
 * Calculates the difference between num1 and num2.
 */
router.get('/subtract', (req: Request, res: Response): void => {
  const num1Str = extractParam(req.query.num1 as string | string[]);
  const num2Str = extractParam(req.query.num2 as string | string[]);
  const a = safeParseFloat(num1Str);
  const b = safeParseFloat(num2Str);

  if (!validateNumbers(res, a, b)) return;
  res.json({ result: a - b });
});

/**
 * GET /multiply
 * Calculates the product of num1 and num2.
 */
router.get('/multiply', (req: Request, res: Response): void => {
  const num1Str = extractParam(req.query.num1 as string | string[]);
  const num2Str = extractParam(req.query.num2 as string | string[]);
  const a = safeParseFloat(num1Str);
  const b = safeParseFloat(num2Str);

  if (!validateNumbers(res, a, b)) return;
  res.json({ result: a * b });
});

/**
 * GET /divide
 * Calculates the quotient of num1 divided by num2.
 */
router.get('/divide', (req: Request, res: Response): void => {
  const num1Str = extractParam(req.query.num1 as string | string[]);
  const num2Str = extractParam(req.query.num2 as string | string[]);
  const a = safeParseFloat(num1Str);
  const b = safeParseFloat(num2Str);

  if (!validateNumbers(res, a, b)) return;
  if (b === 0) {
    sendError(res, 'Division by zero is not allowed.');
    return;
  }
  res.json({ result: a / b });
});

/**
 * GET /exponent
 * Calculates num1 raised to the power of num2.
 */
router.get('/exponent', (req: Request, res: Response): void => {
  const baseStr = extractParam(req.query.num1 as string | string[]);
  const expStr = extractParam(req.query.num2 as string | string[]);
  const base = safeParseFloat(baseStr);
  const exponent = safeParseFloat(expStr);

  if (!validateNumbers(res, base, exponent)) return;
  res.json({ result: Math.pow(base, exponent) });
});

/**
 * GET /sqrt
 * Calculates the square root of a given number.
 */
router.get('/sqrt', (req: Request, res: Response): void => {
  const numStr = extractParam(req.query.num1 as string | string[]);
  const num = safeParseFloat(numStr);

  if (isNaN(num)) {
    sendError(res, `Input ${numStr} is invalid. Please provide a valid number.`);
    return;
  }
  if (num < 0) {
    sendError(res, 'Square root of a negative number is not allowed.');
    return;
  }
  res.json({ result: Math.sqrt(num) });
});

/**
 * GET /modulo
 * Calculates the remainder of num1 divided by num2.
 */
router.get('/modulo', (req: Request, res: Response): void => {
  const num1Str = extractParam(req.query.num1 as string | string[]);
  const num2Str = extractParam(req.query.num2 as string | string[]);
  const a = safeParseFloat(num1Str);
  const b = safeParseFloat(num2Str);

  if (!validateNumbers(res, a, b)) return;
  if (b === 0) {
    sendError(res, 'Modulo by zero is not allowed.');
    return;
  }
  res.json({ result: a % b });
});

export default router;
