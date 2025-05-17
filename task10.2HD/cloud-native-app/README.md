



### Deployment

Artifact Path
- australia-southeast2-docker.pkg.dev/sit323-25t1-pillwein-49bc3d5/tempo/tempo-backend:latest


Enable Artifact Registry in GCP

Go to GCP Console → Artifact Registry → Enable API.
Create a repository:
Format: Docker
Name: tempo
Region: australia-southeast2


Step 3: Build your Docker image
docker build -t gcr.io/sit323-25t1-pillwein-49bc3d5/tempo-backend:latest .

Step 4: Re-tag for Artifact Registry
docker tag gcr.io/sit323-25t1-pillwein-49bc3d5/tempo-backend:latest australia-southeast2-docker.pkg.dev/sit323-25t1-pillwein-49bc3d5/tempo/tempo-backend:latest

docker tag tempo-backend:latest australia-southeast2-docker.pkg.dev/sit323-25t1-pillwein-49bc3d5/tempo/tempo-backend:latest

Step 5: Authenticate Docker
gcloud auth configure-docker australia-southeast2-docker.pkg.dev

Step 6: Push the image
docker push australia-southeast2-docker.pkg.dev/sit323-25t1-pillwein-49bc3d5/tempo/tempo-backend:latest




gcloud container clusters get-credentials tempo-cluster --region australia-southeast2

### Testing
Test Locally
docker run -p 3001:3001 australia-southeast2-docker.pkg.dev/sit323-25t1-pillwein-49bc3d5/tempo/tempo-backend:latest

visit 
http://localhost:3001/




Deploy to Cloud run

gcloud services enable run.googleapis.com


gcloud run deploy tempo-backend --image australia-southeast2-docker.pkg.dev/sit323-25t1-pillwein-49bc3d5/tempo/tempo-backend:latest --platform managed --region australia-southeast2 --allow-unauthenticated

get public endpoint for react native app
Service [tempo-backend] revision [tempo-backend-00002-xk5] has been deployed and is serving 100 percent of traffic.
Service URL: https://tempo-backend-866428026611.australia-southeast2.run.app

reduce credit consumption
gcloud run services update tempo-backend --min-instances 0







kubectl apply -f deployment-dev.yaml
kubectl rollout status deployment tempo-backend
kubectl get pods

# 1. (If not already) log in to Docker Hub
docker login

# 2. Tag your local image for your Docker Hub repo
docker tag tempo-backend:local brycepillwein/tempo-backend:latest

# 3. Push it to Docker Hub
docker push brycepillwein/tempo-backend:latest
