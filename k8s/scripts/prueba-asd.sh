docker network create my-network

docker run --name postgres -e POSTGRES_DB=dumb-db -e POSTGRES_USER=root -e POSTGRES_PASSWORD=pass --network my-network -d postgres:15-alpine

docker run --name users -e PORT=5000 -e DB_USER=root -e DB_HOST=postgres -e DB_NAME=dumb-db -e DB_PASSWORD=pass -e DB_PORT=5432 --network my-network -d alexandergc/users
