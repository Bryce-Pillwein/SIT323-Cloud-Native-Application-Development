# Tempo Track Vitals

Author: Bryce Pillwein (s216133495)  
Project: SIT323 – Cloud-Native Application Development  

A cloud-native, microservice-based system for ingesting, processing, and monitoring simulated health vitals from wearable devices. Services are built using Express and TypeScript, containerized with Docker, and deployed on GKE Autopilot. Real-time observability is provided by an internal monitoring service that tracks CPU and memory usage of all services.

## Table of Contents

1. [Project Structure](#project-structure)  
2. [Features](#features)
3. [Microservices](#microservices)  
4. [Tech Stack](#tech-stack)  
5. [Setup & Initialisation](#setup--initialisation)  
6. [Environment Variables](#environment-variables)  
7. [API Endpoints](#api-endpoints)  
8. [Data Flow & Firestore Schema](#data-flow--firestore-schema)  
9. [Monitoring & Logging](#monitoring--logging)  
10. [Deployment](#deployment)  
11. [Challenges & Solutions](#challenges--solutions)


<br/>


## Project Structure

```
Task10.2HD/
├── tempo-cloud-native-app/
│   ├── k8s/
│   │   ├── abnormality-service.yaml
│   │   ├── alert-service.yaml
│   │   ├── analytics-service.yaml
│   │   ├── frontend-gateway.yaml
│   │   ├── ingestion-service.yaml
│   │   ├── monitoring-service.yaml
│   │   ├── profile-service.yaml
│   │   └── simulation-service.yaml
│   ├── services/
│   │   ├── abnormality-service/
│   │   │   └── node_modules | src/ | Dockerfile | etc.
│   │   ├── alert-service/
│   │   │   └── node_modules | src/ | Dockerfile | etc.
│   │   ├── analytics-service/
│   │   │   └── node_modules | src/ | Dockerfile | etc.
│   │   ├── frontend-gateway/
│   │   │   └── node_modules | src/ | Dockerfile | etc.
│   │   ├── ingestion-service/
│   │   │   └── node_modules | src/ | Dockerfile | etc.
│   │   ├── monitoring-service/
│   │   │   └── node_modules | src/ | Dockerfile | etc.
│   │   ├── profile-service/
│   │   │   └── node_modules | src/ | Dockerfile | etc.
│   │   └── simulation-service/
│   │       └── node_modules | src/ | Dockerfile | etc.
├── tempo-web-app/
│   └── [Front-End]
└── README.md
```


<br/>


## Features

- **Ingestion Service:** Accepts health metrics, validates using Zod, and stores snapshots and history in Firestore.  
- **Profile Service:** Provides user-specific threshold configurations (min/max heart rate, temp, SpO2).  
- **Abnormality Service:** Detects unsafe vitals and publishes alerts.  
- **Alert Service:** Logs alerts received and exposes them via API.  
- **Analytics Service:** Aggregates historical data into time-window summaries.  
- **Simulation Service:** Periodically generates and publishes mock health data for multiple users.  
- **Monitoring Service:** Tracks CPU/memory usage of each service via internal metrics endpoints.  
- **Frontend Gateway:** Proxies all services behind a unified REST API, compatible with frontend frameworks (e.g. Remix).  


<br/>


## Microservices

Each microservice runs independently with its own:
- Codebase (`services/<service-name>`)
- Dockerfile
- Deployment + Service YAML
- Health check at `/healthz`

| Service               | Port | Role                                       |
|-----------------------|------|--------------------------------------------|
| ingestion-service     | 3000 | Accept and store validated health data     |
| profile-service       | 3001 | Serve user threshold profiles              |
| abnormality-service   | 3002 | Detect and publish abnormal events         |
| alert-service         | 3003 | Log and expose alert history               |
| analytics-service     | 3004 | Summarise health data into aggregates      |
| simulation-service    | 3005 | Simulate and publish mock device readings  |
| frontend-gateway      | 3006 | API gateway for all services               |
| monitoring-service    | 3007 | Poll system metrics and expose them        |


<br/>


## Tech Stack

| Tool / Service             | Purpose                                       |
|----------------------------|-----------------------------------------------|
| **Node.js / Express**      | REST API logic                                |
| **TypeScript**             | Static typing                                 |
| **Zod**                    | Runtime validation for health data            |
| **Firestore**              | Primary NoSQL data storage                    |
| **Docker**                 | Containerization                              |
| **Kubernetes (GKE)**       | Service orchestration                         |
| **MQTT (HiveMQ)**          | Message transport for simulator + detectors   |
| **Docker Hub**             | Public image registry                         |
| **kubectl + port-forward** | Dev/test ingress                              |


<br/>



## Setup & Initialisation

1. **Install dependencies:**
   ```bash
   cd services/<service-name>
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
| Variable                      | Description                      |
| ----------------------------- | -------------------------------- |
| `PORT`                        | Service port                     |
| `MQTT_BROKER_URL`             | MQTT broker (HiveMQ)             |
| `MQTT_TOPIC`                  | Topic for publishing health data |
| `PROFILE_SERVICE_URL`         | URL to fetch user thresholds     |
| `FIREBASE_PROJECT_ID`         | Firestore project ID             |
| `FIREBASE_ADMIN_CLIENT_EMAIL` | Firebase Admin email             |
| `FIREBASE_ADMIN_PRIVATE_KEY`  | Escaped private key string       |


<br/>


## API Endpoints

### Ingestion
- `POST /v1/data` – Accept health data
- `GET /v1/history/:userId` – Paginated historical vitals
- `GET /v1/aggregates/:userId` – Aggregated metrics
- `DELETE /v1/users/:userId/data` – Wipe all user data

### Profile & Alert
- `GET /v1/profile/:userId` – Fetch user thresholds
- `GET /v1/alerts/:userId` – Get alert history
- `POST /v1/alert` – Manually trigger alert

### Monitoring & Gateway
- `GET /v1/services-status` – Metrics from all services
- `GET /v1/monitoring` – Proxy for monitoring-service via gateway
- `GET /healthz` – Liveness probe for each service


<br/>


## Data Flow & Firestore Schema

### Flow
1. **Simulator** → publishes to MQTT
2. **Ingestion** → validates and stores raw & live data
3. **Abnormality** Service → fetches profile → checks thresholds → triggers alert
4. **Alert Service** → logs alert in Firestore
5. **Analytics Service** → buffers every 5 entries into aggregate
6. **Frontend Gateway** → central access to services + metrics

### Storage Paths
```
liveVitals/{userId}
vitalHistory/{userId}/entries/{uuid}
vitalAggregates/{userId}/batches/{auto-id}
aggregates/{userId}
alerts/{auto-id}
USER_PROFILES/{userId}
appLogs/{auto-id}
```


<br/>


## Monitoring Architecture
The monitoring-service polls internal /v1/metrics endpoints exposed by each microservice and returns:  
```sh 
{
  "data": {
    "ingestion-service": {
      "uptime": "60.2s",
      "memory": { "heapUsed": 24132000, ... },
      "cpu": { "user": 130800, "system": 6200 }
    },
    ...
  },
  "timestamp": "2024-05-22T08:43:01.215Z"
}
```

This is available via:
```sh
GET /v1/services-status
GET /v1/monitoring (via gateway)
```

Metrics also availible with:
```sh
kubectl top pods 
```

<br/>


## Deployment

### Build & Push Each Image
```sh
docker build -t brycepillwein/<service-name>:latest ./services/<service-name>
docker push brycepillwein/<service-name>:latest
```

### Deploy to Kubernetes (GKE)
```sh
# Authenticate with GKE
gcloud container clusters get-credentials tempo-cluster --region australia-southeast2

# Apply deployment and service
kubectl apply -f k8s/

# Restart (Optional - use for updating)
kubectl rollout restart deployment tempo-backend 
kubectl rollout status deployment/tempo-backend 

# Get Pod Status
kubectl get pods   

# Get External IP
kubectl get svc tempo-backend
```

<br/>


## Challenges & Solutions

| Challenge                                  | Solution                                            |
| ------------------------------------------ | --------------------------------------------------- |
| Stale Docker images                        | Used `imagePullPolicy: Always` or versioned tags    |
| `kubectl` not working in container         | Replaced with internal `/metrics` polling           |
| GCP permissions for monitoring API blocked | Implemented custom monitoring via Express + polling |
| Logs too noisy                             | Centralized logs in `appLogs` collection            |
| MQTT broker reliability                    | Switched to HiveMQ public broker for testing        |
| Firestore reads too frequent               | Reduced polling + centralized summaries             |
