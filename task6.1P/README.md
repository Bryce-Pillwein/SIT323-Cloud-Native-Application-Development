# Task 6.1P - SIT323

Bryce Pillwein (s216133495)

This document outlines the steps to set up a **Node.js** and **Express** web server using **TypeScript**. It covers project initialisation, development, testing, and deployment of a simple calculator microservice.   


## Table of Contents

1. [Project Structure](#project-structure) 
2. [Project Initialisation](#project-initialisation)
3. [API Endpoints](#api-endpoints)
4. [Development and Testing (**Task 6.1P**)](#development-and-testing)


## Project Structure  
```sh
  task6.1P/
  ├── deployment.yaml
  ├── service.yaml
  ├── Dockerfile
  ├── docker-compose.yml (legacy)
  ├── package.json
  ├── tsconfig.json
  ├── README.md
  ├── /src
  │   ├── server.ts
  │   ├── routes/
  │   │   └── operationRoutes.ts
  │   └── utils.ts
  ├── /dist (after build)
```



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

### Local Build and Dockerisation

- A multistage `Dockerfile` was created to build and package the app into a lightweight production image.

- Build the Docker image:
  ```sh
  docker build -t node-calculator:1.0 .
  ```

### Kubernetes Deployment
The app was deployed to a local Kubernetes cluster using Docker Desktop.

- Step 1: Verify Cluster  
  ```
  kubectl get nodes
  ```

- Step 2: Create Deployment and Service  
  - Create the deployment.yaml file  
  - Create the service.yaml file  

- Step 3: Apply Cluster   
  ```sh
  kubectl apply -f deployment.yaml
  kubectl apply -f service.yaml
  ```

- Step 4: Access the Application  
  - http://localhost:30080
  -  e.g. http://localhost:30080/calculator/sqrt?num1=32