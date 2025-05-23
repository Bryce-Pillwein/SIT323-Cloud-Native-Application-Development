# Task 6.2C - SIT323

Bryce Pillwein (s216133495)

This document outlines the steps to set up a **Node.js** and **Express** web server using **TypeScript**. It covers project initialisation, development, testing, and deployment of a simple calculator microservice.   


## Table of Contents

1. [Project Structure](#project-structure) 
2. [Project Initialisation](#project-initialisation)
3. [API Endpoints](#api-endpoints)
4. [Development and Testing (**Task 6.2C**)](#development-and-testing)


## Project Structure  
```sh
  task6.2C/
  ├── deployment.yaml
  ├── service.yaml
  ├── Dockerfile
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

- Step 4: Forward the Port
  ```sh
  kubectl port-forward pod/node-calculator-deployment-b9946f645-sxnjh 8080:3000
  ```

- Step 5: Access the Application  
  - http://localhost:30080
  -  e.g. http://localhost:30080/calculator/sqrt?num1=32

### Verify Application is Running
In this section, I extended the Kubernetes deployment from Task 6.2C and demonstrated interaction with the Kubernetes cluster using both CLI and the Kubernetes Dashboard.  
This confirmed that the calculator microservice pod and its associated service were correctly deployed and available.

- Step 1: Check the running pods
  ```sh
  kubectl get pods
  ```

- Step 1: Check the running services
  ```sh
  kubectl get services
  ```
