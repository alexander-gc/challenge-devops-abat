#!/bin/bash

echo "==> Pulling nestjs Image"
docker pull alexandergc/auth:latest

echo "==> Applying deployments for auth"
cd ../ && kubectl apply -f auth-postgres-depl.yaml && kubectl apply -f auth-depl.yaml

echo "==> Applying deployments and config for nginx"
cd ../ && kubectl apply -f nginx-config-map.yaml && kubectl apply -f nginx-depl.yaml
