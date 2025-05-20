# Tempo Track Vitals

Author: Bryce Pillwein (s216133495)  
Project: SIT323 – Cloud-Native Application Development  

A cloud-native backend system for ingesting, processing, storing, and monitoring simulated health vitals from wearable devices. Built with Express, TypeScript, Firestore, and deployed via GKE Autopilot using Kubernetes.  

## Table of Contents

1. [Features](#features)  
2. [Project Structure](#project-structure)  
3. [Tech Stack](#tech-stack)  
4. [Setup & Initialisation](#setup--initialisation)  
5. [Environment Variables](#environment-variables)  
6. [API Endpoints](#api-endpoints)  
7. [Data Flow & Firestore Schema](#data-flow--firestore-schema)  
8. [Monitoring & Logging](#monitoring--logging)  
9. [Deployment](#deployment)  
10. [Challenges & Solutions](#challenges--solutions)


<br/>


## Features

- **Data Ingestion:** Accepts health metrics via `POST /api/v1/data`, validates using Zod schemas.
- **Abnormal Detection:** Flags unsafe vitals and logs alerts.
- **Live Snapshots:** Stores latest data in `liveVitals/{userId}`.
- **Historical Records:** Appends raw entries under `vitalHistory/{userId}/entries/{uuid}`.
- **Run Aggregation:** Groups every 5 entries into time-based averages under `vitalAggregates/{userId}/batches`.
- **User Profiles:** Fetch thresholds via `GET /api/v1/profile/:userId`.
- **Logs:** Firestore `appLogs` collection for console messages.
- **Health Checks:** `/healthz` for K8s readiness.
- **Simulator-Ready:** Containers push mock data for load testing.


<br/>


## Project Structure

```
Task10.2HD/
├── cloud-native-app/
│   ├── node_modules
│   ├── src/
│   │   ├── config/
│   │   │   └── firebase.ts
│   │   ├── middleware/
│   │   │   └── validation.ts
│   │   ├── routes/
│   │   │   ├── delete/
│   │   │   │   └── clearData.ts
│   │   │   ├── get/
│   │   │   │   ├── aggregates.ts
│   │   │   │   ├── history.ts
│   │   │   │   ├── logs.ts
│   │   │   │   └── profile.ts
│   │   │   ├── post/
│   │   │   │   └── data.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── monitoring/
│   │   │   │   └── appLogger.ts
│   │   │   ├── aggregateHealthData.ts
│   │   │   ├── alertService.ts
│   │   │   ├── checkForAbnormalVitals.ts
│   │   │   ├── clearUserData.ts
│   │   │   ├── haversinDistance.ts
│   │   │   └── updateRunAggregation.ts
│   │   ├── types/
│   │   │   ├── HealthData.ts
│   │   │   └── UserProfile.ts
│   │   └── index.ts
│   ├── .env
│   ├── Dockerfile
│   ├── jest.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── deployment.yaml
│   └── service.yaml
├── tempo-web-app/
│   └── [Front-End]
└── README.md
```


<br/>


## Tech Stack

| Tool / Service              | Purpose                                   |
|-----------------------------|-------------------------------------------|
| **Node.js / Express**       | Backend application and routing logic     |
| **TypeScript**              | Typed JavaScript support                  |
| **Zod**                     | Schema validation                         |
| **Docker**                  | Containerization                          |
| **Docker Hub / GCP AR**     | Hosting container images                  |
| **Firestore**               | NoSQL database for vitals and logs        |
| **GKE Autopilot**           | Kubernetes hosting and autoscaling        |
| **Cloud Logging / Metrics** | Observability in GCP                      |


<br/>



## Setup & Initialisation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **TypeScript setup:**
   ```bash
   npx tsc --init
   ```

3. **Scripts:**
   ```json
   "scripts": {
     "dev": "ts-node src/index.ts",
     "build": "tsc",
     "start": "node dist/index.js"
   }
   ```


<br/>


## Environment Variables

| Name                             | Description                                     |
|----------------------------------|-------------------------------------------------|
| `PORT`                           | Express server port (default: 3000)             |
| `FIREBASE_PROJECT_ID`            | Firebase project ID                             |
| `FIREBASE_ADMIN_CLIENT_EMAIL`    | Firebase service account email                  |
| `FIREBASE_ADMIN_PRIVATE_KEY`     | Private key (escaped newlines required)         |


<br/>


## API Endpoints

### Health & Logs
- `GET /healthz` – Liveness check  
- `GET /api/v1/logs?limit=50` – Retrieve recent logs  

### Data
- `POST /api/v1/data` – Submit validated health data  
- `GET /api/v1/history/:userId?page=n&size=m` – Paginated vital history  
- `GET /api/v1/aggregates/:userId?limit=n` – Fetch recent aggregates  
- `GET /api/v1/profile/:userId` – Get user thresholds  
- `DELETE /api/v1/users/:userId/data` – Delete all user data (except profile)  


<br/>


## Data Flow & Firestore Schema

### Flow
1. **Ingestion:** `POST /data` → Validate → Write to Firestore  
2. **Live Vitals:** `liveVitals/{userId}` (replaces)  
3. **History:** `vitalHistory/{userId}/entries/{uuid}`  
4. **Aggregation:** Every 5 entries → `vitalAggregates/{userId}/batches`  
5. **Alerts:** If abnormal → `alerts/{auto-id}`  

### Firestore Collections
```
liveVitals/{userId}
vitalHistory/{userId}/entries/{uuid}
alerts/{auto-id}
aggregates/{userId}
vitalAggregates/{userId}/batches/{auto-id}
appLogs/{auto-id}
USER_PROFILES/{userId}
```


<br/>


## Monitoring & Logging

- **Logs:** All console logs are saved to Firestore `appLogs`
- **Cloud Monitoring:** GCP dashboard shows container usage
- **Log Explorer Tips:** Filter by cluster name, pod, or resource type


<br/>


## Deployment

### Containerisation

```bash
# Build image with version tag
docker build -t brycepillwein/tempo-backend:v1.0.2 .

# Push Image
docker push brycepillwein/tempo-backend:v1.0.2 
```

### Tag and Update in Kubernetes

```bash
kubectl set image deployment/tempo-backend tempo-backend=brycepillwein/tempo-backend:v1.0.2 --record
```

### Deploy to GKE

```bash
# Authenticate with GKE
gcloud container clusters get-credentials tempo-cluster --region australia-southeast2

# Apply deployment and service
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Restart (Optional - use for updating)
kubectl rollout restart deployment tempo-backend 
kubectl rollout status deployment/tempo-backend 

# Get Pod Status
kubectl get pods   

# Get External IP
kubectl get svc tempo-backend
```


<br/>


## Updating or Resetting the System

```bash
# Scale down to 0
kubectl scale deployment tempo-backend --replicas=0
kubectl delete service tempo-backend

# Scale up again
kubectl scale deployment tempo-backend --replicas=2
kubectl apply -f service.yaml
```


<br/>


## Challenges & Solutions

| Challenge                                          | Resolution                                                             |
|----------------------------------------------------|------------------------------------------------------------------------|
| `ErrImagePull` due to GCP restrictions             | Switched from Artifact Registry to Docker Hub                          |
| Autopilot cluster showing no nodes                 | Understood that nodes provision dynamically upon workload scheduling   |
| GKE authentication failure                         | Used `gcloud auth application-default login` for ADC setup             |
| Too many logs in Log Explorer                      | Applied filters (resource, pod, namespace) to refine results           |
| Kubernetes pulling stale `latest` image            | Adopted semantic versioning (e.g., `v1.0.2`) to ensure image freshness |