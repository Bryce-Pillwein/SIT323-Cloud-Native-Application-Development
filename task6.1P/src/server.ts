import express from 'express';
import operationRoutes from './routes/operationRoutes';

const app = express();

// Calculator routes with a base path
app.use('/calculator', operationRoutes);

// Simple home route
app.get('/', (req, res) => {
  res.send('Welcome to the Calculator Microservice!');
});

// Start the server
const PORT: number = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
  console.log(`Calculator microservice is running on port ${PORT}.`);
});
