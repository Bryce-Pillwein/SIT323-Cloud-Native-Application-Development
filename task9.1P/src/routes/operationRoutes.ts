import express, { Request, Response } from 'express';
import { extractParam, sendError, safeParseFloat, validateNumbers } from '../utils';
import { getHistoryCollection } from '../db';
import { ObjectId } from 'mongodb';

const router = express.Router();

/**
 * Log To Database
 * @param operation 
 * @param a 
 * @param b 
 * @param result 
 */
const logToDatabase = async (operation: string, a: number, b: number | null, result: number) => {
  const collection = await getHistoryCollection();
  await collection.insertOne({
    operation,
    num1: a,
    ...(b !== null && { num2: b }),
    result,
    timestamp: new Date()
  });
};



/**
 * GET /add
 * Calculates the sum of num1 and num2.
 */
router.get('/add', async (req: Request, res: Response) => {
  const num1Str = extractParam(req.query.num1 as string | string[]);
  const num2Str = extractParam(req.query.num2 as string | string[]);
  const a = safeParseFloat(num1Str);
  const b = safeParseFloat(num2Str);

  if (!validateNumbers(res, a, b)) return;

  const result = a + b;
  await logToDatabase('add', a, b, result);
  res.json({ result });
});

/**
 * GET /subtract
 * Calculates the difference between num1 and num2.
 */
router.get('/subtract', async (req: Request, res: Response) => {
  const num1Str = extractParam(req.query.num1 as string | string[]);
  const num2Str = extractParam(req.query.num2 as string | string[]);
  const a = safeParseFloat(num1Str);
  const b = safeParseFloat(num2Str);

  if (!validateNumbers(res, a, b)) return;

  const result = a - b;
  await logToDatabase('subtract', a, b, result);
  res.json({ result });
});

/**
 * GET /multiply
 * Calculates the product of num1 and num2.
 */
router.get('/multiply', async (req: Request, res: Response) => {
  const num1Str = extractParam(req.query.num1 as string | string[]);
  const num2Str = extractParam(req.query.num2 as string | string[]);
  const a = safeParseFloat(num1Str);
  const b = safeParseFloat(num2Str);

  if (!validateNumbers(res, a, b)) return;

  const result = a * b;
  await logToDatabase('multiply', a, b, result);
  res.json({ result });
});

/**
 * GET /divide
 * Calculates the quotient of num1 divided by num2.
 */
router.get('/divide', async (req: Request, res: Response) => {
  const num1Str = extractParam(req.query.num1 as string | string[]);
  const num2Str = extractParam(req.query.num2 as string | string[]);
  const a = safeParseFloat(num1Str);
  const b = safeParseFloat(num2Str);

  if (!validateNumbers(res, a, b)) return;
  if (b === 0) return sendError(res, 'Division by zero is not allowed.');

  const result = a / b;
  await logToDatabase('divide', a, b, result);
  res.json({ result });
});

/**
 * GET /exponent
 * Calculates num1 raised to the power of num2.
 */
router.get('/exponent', async (req: Request, res: Response) => {
  const baseStr = extractParam(req.query.num1 as string | string[]);
  const expStr = extractParam(req.query.num2 as string | string[]);
  const base = safeParseFloat(baseStr);
  const exponent = safeParseFloat(expStr);

  if (!validateNumbers(res, base, exponent)) return;

  const result = Math.pow(base, exponent);
  await logToDatabase('exponent', base, exponent, result);
  res.json({ result });
});

/**
 * GET /sqrt
 * Calculates the square root of a given number.
 */
router.get('/sqrt', async (req: Request, res: Response) => {
  const numStr = extractParam(req.query.num1 as string | string[]);
  const num = safeParseFloat(numStr);

  if (isNaN(num)) return sendError(res, `Input ${numStr} is invalid. Please provide a valid number.`);
  if (num < 0) return sendError(res, 'Square root of a negative number is not allowed.');

  const result = Math.sqrt(num);
  await logToDatabase('sqrt', num, null, result);
  res.json({ result });
});

/**
 * GET /modulo
 * Calculates the remainder of num1 divided by num2.
 */
router.get('/modulo', async (req: Request, res: Response) => {
  const num1Str = extractParam(req.query.num1 as string | string[]);
  const num2Str = extractParam(req.query.num2 as string | string[]);
  const a = safeParseFloat(num1Str);
  const b = safeParseFloat(num2Str);

  if (!validateNumbers(res, a, b)) return;
  if (b === 0) return sendError(res, 'Modulo by zero is not allowed.');

  const result = a % b;
  await logToDatabase('modulo', a, b, result);
  res.json({ result });
});

export default router;
