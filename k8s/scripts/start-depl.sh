#!/bin/bash

K8S_HOME="$HOME/challenge-devops-abat/k8s"

echo "==> Pulling nestjs Image"
docker pull alexandergc/users:latest

echo "==> Applying Kubernetes configurations for users"
cd $K8S_HOME && kubectl apply -f users-postgres-depl.yaml && kubectl apply -f users-depl.yaml

echo "==> Applying Kubernetes configurations for nginx"
cd $K8S_HOME && kubectl apply -f nginx-config-map.yaml && kubectl apply -f nginx-depl.yaml
