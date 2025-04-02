# Task 5.1P - SIT323

Bryce Pillwein (s216133495)

This document outlines the steps to set up a **Node.js** and **Express** web server using **TypeScript**. It covers project initialisation, development, testing, and deployment of a simple calculator microservice.   

This task focused on preparing the calculator microservice for production by containerising it with Docker and deploying the image to a private container registry on Google Cloud Platform (GCP) using Artifact Registry.  

## Table of Contents

1. [Project Initialisation](#project-initialisation)
2. [**(NEW)** Development and Testing](#development-and-testing)
3. [Copied From Past Task - Project Structure](#project-structure)
4. [Copied From Past Task - API Endpoints](#api-endpoints)



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

## Development and Testing

### Docker Deployment & Google Cloud Registry

- **Dockerisation:**  
  A Dockerfile was created to define the build process and generate a lean production image for the application. Additionally, a docker-compose.yml file was created to configure and orchestrate the container environment.

- **Development Mode:**  
  Docker Desktop was opened, and the following command was run to build and start the container:
  ```sh
  docker-compose up --build
  ```

- **Publishing to Google Artifact Registry:**
  1. Enable Google Artifact Registry
    - Enabled the Artifact Registry API via the GCP Console.
    - Created a Docker-format repository named calculator in the australia-southeast2 region.
  
  2. Build the Docker Image
  ```sh
  docker build -t gcr.io/sit323-25t1-pillwein-49bc3d5/calculator:latest .
  ```
  3. Re-tag for Artifact Registry
  ```sh
  docker tag gcr.io/sit323-25t1-pillwein-49bc3d5/calculator:latest australia-southeast2-docker.pkg.dev/sit323-25t1-pillwein-49bc3d5/calculator/calculator:latest
  ```
  4. Authenticate Docker
  ```sh
  gcloud auth configure-docker australia-southeast2-docker.pkg.dev
  ```
  5. Push the Image
  ```sh
  docker push australia-southeast2-docker.pkg.dev/sit323-25t1-pillwein-49bc3d5/calculator/calculator:latest
  ```

### Verification / Deployment
To verify the image works in a production-like environment, the following command was run to pull and run the container:
```sh
docker run -p 3000:3000 australia-southeast2-docker.pkg.dev/sit323-25t1-pillwein-49bc3d5/calculator/calculator:latest
```


---
# Below Outlines Steps from Previos Task

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

