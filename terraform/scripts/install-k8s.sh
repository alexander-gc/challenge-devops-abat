#!/bin/bash

# ================= INSTALL BASIC PACKAGES ===================== #
echo "==> Updating the instance for the firstime"
sudo apt update

echo "==> Installing basic packages..."
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common git

# ===================== INSTALL DOCKER ========================== #
echo "==> Adding the oficial Docker GPG key"
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "==> Adding Docker repository"
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null

echo "==> Installing Docker"
sudo apt update && sudo apt install -y docker-ce docker-ce-cli

echo "==> Starting and enabling Docker service"
sudo systemctl start docker
sudo systemctl enable docker

# ===================== INSTALL KUBECTL AND MINIKUBE =========================== #
echo "==> Downloading the Kubectl binary"
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

echo "==> Making the Kubectl binary executable"
chmod +x kubectl

echo "==> Moving Kubectl binary to PATH"
sudo mv kubectl /usr/local/bin

echo "==> Downloading the Minikube binary"
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

echo "==> Installing Minikube"
sudo install minikube-linux-amd64 /usr/local/bin/minikube
