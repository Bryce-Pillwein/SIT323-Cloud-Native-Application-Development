# Task 4.2C - SIT323

Bryce Pillwein (s216133495)

This document outlines the steps to set up a **Node.js** and **Express** web server using **TypeScript**. It covers project initialisation, development, testing, and deployment of a simple calculator microservice.  


## Table of Contents

1. [Project Initialisation](#project-initialisation)
2. [Project Structure](#project-structure)
3. [API Endpoints](#api-endpoints)
4. [Development and Testing](#development-and-testing)



## Project Initialisation

1. **Initialise npm:**
     ```sh
     npm init -y
     ```

2. **Install Dependencies:**
   - Install Express and the required development dependencies:
     ```sh
     npm install express  
     npm install --save-dev typescript ts-node @types/node @types/express
     ```
   - Initialse the TypeScript configuration:
     ```sh
     npx tsc --init
     ```

3. **Update package.json Scripts:**
   - Modify the `scripts` section in `package.json` file to include:
     - **dev:** For running the server in development mode using ts-node.
     - **build:** To compile TypeScript to JavaScript.
     - **start:** To run the compiled JavaScript code.
     ```json
     "scripts": {
       "dev": "ts-node src/server.ts",
       "build": "tsc",
       "start": "node dist/server.js"
     }
     ```


## Project Structure  
- **src/server.ts**  
  Contains the Express server setup. It imports the modularised routes from `src/routes/calculatorRoutes.ts` and mounts them under the `/calculator` base path.

- **src/routes/calculatorRoutes.ts**  
  Contains all the calculator API endpoints including addition, subtraction, multiplication, division, exponentiation, square root, and modulo operations.

- **src/utils.ts**  
  Contains utility functions for extracting parameters, error handling, number parsing, and input validation.



## API Endpoints

The microservice provides basic calculator functionality with the following endpoints:

- **Addition:** `/add`  
  Expects query parameters `num1` and `num2` and returns their sum.

- **Subtraction:** `/subtract`  
  Expects query parameters `num1` and `num2` and returns the difference.

- **Multiplication:** `/multiply`  
  Expects query parameters `num1` and `num2` and returns the product.

- **Division:** `/divide`  
  Expects query parameters `num1` and `num2` and returns the quotient.  
  **Note:** Division by zero is handled with an error response.

- **Exponentiation:** `/calculator/exponent`  
  Expects query parameters `num1` (base) and `num2` (exponent) and returns the result of raising the base to the power of the exponent.

- **Square Root:** `/calculator/sqrt`  
  Expects a query parameter `num` and returns the square root of the number.  
  **Note:** Square root of negative numbers is not allowed.

- **Modulo:** `/calculator/modulo`  
  Expects query parameters `num1` and `num2` and returns the remainder when `num1` is divided by `num2`.  
  **Note:** Modulo by zero is handled with an error response.

## Development and Testing

### Running the Server

- **Development Mode:**  
  To run the server using ts-node, execute:
  ```sh
  npm run dev
