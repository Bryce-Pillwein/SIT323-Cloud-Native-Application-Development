import express, { Request, Response } from 'express';

const app = express();

/**
 * Extract Params (utility function)
 * @param param 
 * @returns 
 */
const extractParam = (param: string | string[] | undefined): string => {
  if (Array.isArray(param)) {
    return param[0];
  }
  return param ?? '';
};


/**
 * Add Endpoint
 */
app.get('/add', (req: Request, res: Response): void => {
  const num1Str = extractParam(req.query.num1 as string | string[]);
  const num2Str = extractParam(req.query.num2 as string | string[]);

  const a = parseFloat(num1Str);
  const b = parseFloat(num2Str);

  if (isNaN(a) || isNaN(b)) {
    res.status(400).json({ error: 'Invalid input. Please provide valid numbers for num1 and num2.' });
    return;
  }

  res.json({ result: a + b });
});


/**
 * Subtraction Endpoint
 */
app.get('/subtract', (req: Request, res: Response): void => {
  const num1Str = extractParam(req.query.num1 as string | string[]);
  const num2Str = extractParam(req.query.num2 as string | string[]);

  const a = parseFloat(num1Str);
  const b = parseFloat(num2Str);

  if (isNaN(a) || isNaN(b)) {
    res.status(400).json({ error: 'Invalid input. Please provide valid numbers for num1 and num2.' });
    return;
  }

  res.json({ result: a - b });
});


/**
 * Multiplication Endpoint
 */
app.get('/multiply', (req: Request, res: Response): void => {
  const num1Str = extractParam(req.query.num1 as string | string[]);
  const num2Str = extractParam(req.query.num2 as string | string[]);

  const a = parseFloat(num1Str);
  const b = parseFloat(num2Str);

  if (isNaN(a) || isNaN(b)) {
    res.status(400).json({ error: 'Invalid input. Please provide valid numbers for num1 and num2.' });
    return;
  }

  res.json({ result: a * b });
});


/**
 * Division Endpoint
 */
app.get('/divide', (req: Request, res: Response): void => {
  const num1Str = extractParam(req.query.num1 as string | string[]);
  const num2Str = extractParam(req.query.num2 as string | string[]);

  const a = parseFloat(num1Str);
  const b = parseFloat(num2Str);

  if (isNaN(a) || isNaN(b)) {
    res.status(400).json({ error: 'Invalid input. Please provide valid numbers for num1 and num2.' });
    return;
  }

  if (b === 0) {
    res.status(400).json({ error: 'Division by zero is not allowed.' });
    return;
  }

  res.json({ result: a / b });
});


/**
 * Start The Server
 */
const PORT: number = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
  console.log(`Calculator microservice is running on port ${PORT}.`);
});
