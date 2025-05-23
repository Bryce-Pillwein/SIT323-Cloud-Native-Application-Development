# Ingestion Service
docker build -t brycepillwein/ingestion-service:latest ./services/ingestion-service
docker push brycepillwein/ingestion-service:latest

# Profile Service
docker build -t brycepillwein/profile-service:latest ./services/profile-service
docker push brycepillwein/profile-service:latest

# Abnormality Service
docker build -t brycepillwein/abnormality-service:latest ./services/abnormality-service
docker push brycepillwein/abnormality-service:latest

# Alert Service
docker build -t brycepillwein/alert-service:latest ./services/alert-service
docker push brycepillwein/alert-service:latest

# Analytics Service
docker build -t brycepillwein/analytics-service:latest ./services/analytics-service
docker push brycepillwein/analytics-service:latest

# Simulation Service
docker build -t brycepillwein/simulation-service:latest ./services/simulation-service
docker push brycepillwein/simulation-service:latest

# Monitoring Service
docker build -t brycepillwein/monitoring-service:latest ./services/monitoring-service
docker push brycepillwein/monitoring-service:latest

# Frontend Gateway
docker build -t brycepillwein/frontend-gateway:latest ./services/frontend-gateway
docker push brycepillwein/frontend-gateway:latest


# DEPLOY Kuberntes
kubectl apply -f k8s/


# Scale Down
kubectl scale deployment ingestion-service --replicas=0
kubectl scale deployment profile-service --replicas=0
kubectl scale deployment abnormality-service --replicas=0
kubectl scale deployment alert-service --replicas=0
kubectl scale deployment analytics-service --replicas=0
kubectl scale deployment monitoring-service --replicas=0
kubectl scale deployment frontend-gateway --replicas=0
kubectl scale deployment simulation-service --replicas=0


# Restart
kubectl rollout restart deployment ingestion-service
kubectl rollout restart deployment profile-service
kubectl rollout restart deployment abnormality-service
kubectl rollout restart deployment alert-service
kubectl rollout restart deployment analytics-service
kubectl rollout restart deployment monitoring-service
kubectl rollout restart deployment frontend-gateway
kubectl rollout restart deployment simulation-service


# Ports
kubectl port-forward service/monitoring-service 3007:3007