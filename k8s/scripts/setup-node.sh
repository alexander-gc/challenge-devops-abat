#!/bin/bash

USERNAME_DOCKER=$1
PASSWORD_DOCKER=$2
USERNAME_GITHUB=$3
EMAIL_GITHUB=$4

# ===================== SET UP DOCKER HUB =========================== #
echo "==> Setting up my docker account"

docker login -u "$USERNAME_DOCKER" -p "$PASSWORD_DOCKER"

# ===================== CLONING AND SET UP GIT REPOSITORY =========================== #
echo "==> Cloning my repository"
git clone https://github.com/alexander-gc/challenge-devops-abat.git

echo "==> Generating my temporary key"
echo "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" >pass-repo.txt

git config --global user.name "$USERNAME_GITHUB"
git config --global user.email "$EMAIL_GITHUB"

# ===================== SET UP GIT REPOSITORY =========================== #
#USERS_HOME="$HOME/challenge-devops-abat/users"
K8S_HOME="$HOME/challenge-devops-abat/k8s"

#echo "Building Users image"
#cd $USERS_HOME && docker build -t alexandergc/users .

echo "==> Pulling nestjs Image"
docker pull alexandergc/users:latest

echo "==> Applying Kubernetes configurations for users"
cd $K8S_HOME && kubectl apply -f users-postgres-depl.yaml && kubectl apply -f users-depl.yaml

echo "==> Applying Kubernetes configurations for nginx"
cd $K8S_HOME && kubectl apply -f nginx-config-map.yaml && kubectl apply -f nginx-depl.yaml
