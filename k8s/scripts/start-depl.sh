#!/bin/bash

# ===================== SET UP GIT  =========================== #
USERNAME_GITHUB=$1
EMAIL_GITHUB=$2

if [ ! -n "$USERNAME_GITHUB" -o ! -n "$EMAIL_GITHUB" ]; then
    echo "Username and email of Github must be provided"
    exit 2
fi

git config --global user.name "$USERNAME_GITHUB"
git config --global user.email "$EMAIL_GITHUB"

# ===================== START UP KUBERNETES DEPLOYMENTS =========================== #
K8S_HOME="$HOME/challenge-devops-abat/k8s"

echo "==> Pulling nestjs Image"
docker pull alexandergc/auth:latest

echo "==> Applying Kubernetes configurations for auth"
cd $K8S_HOME && kubectl apply -f auth-postgres-depl.yaml && kubectl apply -f auth-depl.yaml

echo "==> Applying Kubernetes configurations for nginx"
cd $K8S_HOME && kubectl apply -f nginx-config-map.yaml && kubectl apply -f nginx-depl.yaml
