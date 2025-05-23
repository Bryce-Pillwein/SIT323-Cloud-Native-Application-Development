$services = @(
  "ingestion-service",
  "profile-service",
  "abnormality-service",
  "alert-service",
  "analytics-service",
  "simulation-service",
  "frontend-gateway"
)

foreach ($service in $services) {
  Write-Host "Building $service..."
  docker build -t "brycepillwein/$service:latest" ".\\services\\$service"

  Write-Host "Pushing $service..."
  docker push "brycepillwein/$service:latest"
}
