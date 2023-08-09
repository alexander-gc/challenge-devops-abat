#!/bin/bash

K8S_DIR="$HOME/challenge-devops-abat/k8s"

echo "==> Pulling nestjs Image"
docker pull alexandergc/auth:latest

echo "==> Applying deployments for auth"
cd $K8S_DIR && kubectl apply -f auth-postgres-depl.yaml && kubectl apply -f auth-depl.yaml

echo "==> Applying deployments and config for nginx"
cd $K8S_DIR && kubectl apply -f nginx-config-map.yaml && kubectl apply -f nginx-depl.yaml
