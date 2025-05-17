# Task 5.2D - SIT323

Bryce Pillwein (s216133495)

This document outlines the steps to set up a **Node.js** and **Express** web server using **TypeScript**. It covers project initialisation, development, testing, and deployment of a simple calculator microservice.   

This project demonstrates the deployment and monitoring of a Node.js application using Docker, Kubernetes (Autopilot mode), and Google Cloud Monitoring tools. The service exposes a simple HTTP endpoint and is deployed in a fully containerised and observable cloud-native architecture.


## Table of Contents
1. [Project Structure](#project-structure)  
2. [Tools and Configurations Used](#tools-and-configurations-used)  
3. [Project Initialisation](#project-initialisation)  
4. [Development and Testing](#development-and-testing)
5. [Monitoring](#monitoring)
6. [Challenes Faced and Solutions](#challenges-faced-and-solutions)
7. [API Endpoints](#api-endpoints)


<br/>


## Tools and Configurations Used
| Tool / Service                     | Purpose                                  |
| ---------------------------------- | ---------------------------------------- |
| **Node.js**                        | Runtime environment for the application  |
| **Docker**                         | Containerisation of the Node.js app      |
| **Docker Hub**                     | Hosting the public Docker image          |
| **Google Kubernetes Engine (GKE)** | Hosting and scaling the container        |
| **Kubernetes Autopilot**           | Simplified cluster management            |
| **kubectl**                        | CLI tool to interact with Kubernetes     |
| **Cloud Monitoring**               | Viewing CPU, memory, and traffic metrics |
| **Cloud Logging**                  | Viewing logs from the running container  |


<br/>


## Project Structure  
```sh
  task10.1P/
  ├── /src
  │   ├── db.ts
  │   ├── index.ts
  │   ├── routes/
  │   │   ├── operationRoutes.ts
  │   └── utils.ts
  ├── Dockerfile
  ├── package.json
  ├── tsconfig.json
  ├── README.md
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


<br/>


## Development and Testing

### Docker Deployment & Google Cloud Registry

- **Dockerisation:**  
  Dockerfile was used to build a production-ready image.
- Build the image:
  ```sh
  docker build -t gscloud-monitor .
  ```

### Push to Docker Hub (public registry)
- Due to account restrictions, Docker Hub was used instead of Artifact Registry.
```sh
docker tag gscloud-monitor docker.io/brycepillwein/gscloud-monitor:latest
docker login
docker push brycepillwein/gscloud-monitor:latest
```

### Create Kubernetes Cluster (Autopilot)
- Created via GCP Console under Kubernetes Engine
- Region: australia-southeast2
- Mode: Autopilot

### Connect to the Cluster
```sh
gcloud auth application-default login
gcloud config set container/use_application_default_credentials true
gcloud container clusters get-credentials monitor-cluster --region australia-southeast2
```

### Deploy to GKE
- Deployment and Service YAMLs used:
```sh
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

### Access the Application
- External IP was provisioned by GKE:
```sh
http://34.129.179.208:3000
```
- Accessing this URL triggers requests and usage metrics.


<br/>


## Monitoring

Metrics Explorer  
- Location: Google Cloud Console → Monitoring → Metrics Explorer
- Resource Type: Kubernetes Scale
- Metrics Viewed:
  - kubernetes.io/autoscaler/container/memory/per_replica_recommended_request_bytes
  - kubernetes.io/autoscaler/container/cpu/per_replica_recommended_request_cores


<br/>

## Challenges Faced and Solutions

| Challenge                 | Resolution                                                |
|---------------------------|-----------------------------------------------------------|
| Image couldn't be pulled  | Used Docker Hub instead of private registry               |
| No nodes in Autopilot     | Triggered by deploying a workload                         |
| `kubectl` access failed   | Enabled ADC with `gcloud auth application-default login`  |
| No metrics appeared       | Generated traffic manually via https web access           |


<br/>


## API Endpoints

The microservice provides basic calculator functionality with the following endpoints:

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
