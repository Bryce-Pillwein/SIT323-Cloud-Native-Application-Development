# Task 9.1P - SIT323

Bryce Pillwein (s216133495)

Node.js Calculator Microservice with MongoDB (Kubernetes Deployment)  
This project is a cloud-native calculator microservice built using **Node.js** and deployed on **Kubernetes**. It integrates a **MongoDB** database to store and manage calculation history using full **CRUD** functionality.

The microservice exposes arithmetic operations via RESTful API endpoints and logs each operation to a MongoDB database.


<br/>


## Table of Contents

1. [Project Structure](#project-structure)  
2. [Project Initialisation](#project-initialisation)  
3. [Functional Overview]()
4. [Development](#development)  
5. [MongoDB Kubernetes Files](#mongodb-kubernetes-files)  
6. [Deployment](#deployment)  
7. [API Endpoints](#api-endpoints)  
8. [Database Backup](#database-backup)
9. [Monitoring Performance](#monitoring-performance)


<br/>


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


<br/>


## Functional Overview

The calculator microservice exposes several endpoints to perform arithmetic operations. Each time a calculation is performed (e.g., /add, /divide), the result is automatically stored in MongoDB — this effectively represents a "Create" operation in CRUD.  
In addition to automatic logging, a full set of CRUD endpoints was developed to manage stored calculation history:  

| Action     | Description                                                                        |
| ---------- | ---------------------------------------------------------------------------------  |
| **Create** | Calculator operation logs result using an `insertOne()`, equivalent of a `POST`.   |
| **Read**   | The `/calculator/history` endpoint fetches the latest 20 records from MongoDB.     |
| **Update** | The `/calculator/update/:id` endpoint allows modifying a result stored in MongoDB. |
| **Delete** | The `/calculator/delete/:id` endpoint deletes a specific record by `_id`.          |


<br/>


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


<br/>



docker build -t brycepillwein/node-gscloud-monitor:1.0 .
docker push brycepillwein/node-gscloud-monitor:1.0

## Development

### Dockerisation

A multi-stage Dockerfile was created to:
- Build the TypeScript project into dist/
- Create a lightweight production container that only runs the compiled JS

Build the image:

```sh
docker build -t node-calculator:1.0 .
```


<br/>


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


<br/>


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


<br/>


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


<br/>


## Database Backup

MongoDB is deployed with a PersistentVolumeClaim (PVC), which ensures data stored in /data/db is retained even if the pod restarts or is rescheduled. This forms the foundation for basic disaster recovery.

- MongoDB uses a PVC (mongo-pvc) to persist data across restarts and failures.  
- The database path /data/db is mounted via Kubernetes and survives pod lifecycle events.
- Disaster recovery is supported via manual backups using mongodump.

### Using Manual Backups

Mongo Dump: 
```sh
kubectl exec -it <mongo-pod-name> --mongodump --username=mongouser --password=mongopass --authenticationDatabase=admin --out=/data/backup
```

Mongo Restore: 
```sh
kubectl exec -it <mongo-pod-name> --mongorestore --username=mongouser --password=mongopass --authenticationDatabase=admin /data/backup
```


<br/>


## Monitoring Performance

Basic performance and health monitoring are integrated using Kubernetes commands and probes.

### Kubernetes Health Probes
The Node.js microservice deployment includes:

- Liveness Probe: Verifies the service is running. If it fails, Kubernetes will restart the pod.
- Readiness Probe: Ensures the app is fully ready to serve traffic (i.e. connected to MongoDB) before receiving requests.

### Manual Monitoring Tools

Application logs:
```sh
kubectl logs deployment/node-calculator-deployment
```

MongoDB logs:
```sh
kubectl logs deployment/mongo
```

Pod status and events:
```sh
kubectl get pods
kubectl describe pod <pod-name>
```
