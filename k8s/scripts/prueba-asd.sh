docker network create test-k8s-nestjs

docker run --name postgres -p 5432:5432 -e POSTGRES_DB=dumb-db -e POSTGRES_USER=root -e POSTGRES_PASSWORD=pass --network test-k8s-nestjs -d postgres:15-alpine

docker run --name users -p 5000:5000 -e PORT=5000 -e DB_USER=root -e DB_HOST=postgres -e DB_NAME=dumb-db -e DB_PASSWORD=pass -e DB_PORT=5432 --network test-k8s-nestjs -d alexandergc/users
