# Task 9.1P - SIT323

Bryce Pillwein (s216133495)

Node.js Calculator Microservice with MongoDB (Kubernetes Deployment)  
This project is a cloud-native calculator microservice built using **Node.js** and deployed on **Kubernetes**. It integrates a **MongoDB** database to store and manage calculation history using full **CRUD** functionality.

The microservice exposes arithmetic operations via RESTful API endpoints and logs each operation to a MongoDB database.

## Table of Contents

1. [Project Structure](#project-structure)  
2. [Project Initialisation](#project-initialisation)  
3. [Development](#development)  
4. [MongoDB Kubernetes Files Explained](#mongodb-kubernetes-files-explained)  
5. [Deployment](#deployment)  
6. [API Endpoints](#api-endpoints)  


## Project Structure  
```sh
  task9.1P/
  ├── /src
  │   ├── db.ts
  │   ├── index.ts
  │   ├── routes/
  │   │   ├── operationRoutes.ts
  │   │   └── crudRoutes.ts
  │   └── utils.ts
  ├── Dockerfile
  ├── package.json
  ├── tsconfig.json
  ├── README.md
  ├── mongo-deployment.yaml
  ├── mongo-pvc.yaml
  ├── mongo-service.yaml
  ├── mongo-secret.yaml
  ├── node-deployment.yaml
  └── node-service.yaml
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
       "dev": "ts-node src/index.ts",
       "build": "tsc",
       "start": "node dist/index.js"
     }
     ```


## Development

### Dockerisation

A multi-stage Dockerfile was created to:
- Build the TypeScript project into dist/
- Create a lightweight production container that only runs the compiled JS

Build the image:

```sh
docker build -t node-calculator:1.0 .
```



## MongoDB Kubernetes Files
1. mongo-secret.yaml – Secure Credentials  
   Creates a Kubernetes Secret that securely stores MongoDB credentials (mongouser and mongopass), which are injected into the MongoDB container as environment variables.
   > Stored using stringData for human-readable values (Kubernetes encodes them to base64).  

2. mongo-pvc.yaml – Persistent Volume Claim  
   Requests persistent storage for MongoDB’s /data/db folder, so that data survives pod restarts or rescheduling.  

3. mongo-deployment.yaml – MongoDB Pod Configuration  
   Defines how to run MongoDB as a Kubernetes Deployment, including:  
   - Image (mongo)
   - Credentials (injected from the Secret)
   - Volume mount to /data/db using the PVC  

4. mongo-service.yaml – Internal Networking  
   Creates a Kubernetes Service to expose the MongoDB deployment within the cluster. It allows other pods (e.g. your Node.js app) to connect using the hostname mongo-service.  



## Deployment

### Apply MongoDB Resources
```sh
kubectl apply -f mongo-pvc.yaml
kubectl apply -f mongo-secret.yaml
kubectl apply -f mongo-deployment.yaml
kubectl apply -f mongo-service.yaml
```

### Deploy Node.js Microservice
```sh
kubectl apply -f node-deployment.yaml
kubectl apply -f node-service.yaml
```

### Port Forward to Access the App
```sh
kubectl port-forward svc/node-calculator-service 3000:3000
```

### Access the Application  
  - http://localhost:3000
  - http://localhost:3000/calculator/add?num1=15&num2=5
  - http://localhost:3000/calculator/history


## API Endpoints

### Calculator Operations
| Method | Endpoint                             | Description                 |
| ------ | ------------------------------------ | --------------------------- |
| GET    | `/calculator/add?num1=5&num2=3`      | Adds two numbers            |
| GET    | `/calculator/subtract?num1=9&num2=4` | Subtracts second from first |
| GET    | `/calculator/multiply?num1=6&num2=3` | Multiplies two numbers      |
| GET    | `/calculator/divide?num1=10&num2=2`  | Divides first by second     |
| GET    | `/calculator/sqrt?num1=49`           | Calculates square root      |
| GET    | `/calculator/modulo?num1=10&num2=3`  | Modulo operation            |
| GET    | `/calculator/exponent?num1=2&num2=5` | Power function              |


### CRUD Operations
| Method | Endpoint                 | Description                                         |
| ------ | ------------------------ | --------------------------------------------------- |
| GET    | `/calculator/history`    | View the last 20 operations                         |
| PUT    | `/calculator/update/:id` | Update a stored operation                           |
| DELETE | `/calculator/delete/:id` | Delete an operation by its MongoDB ID               |

