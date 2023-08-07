#!/bin/bash

USERS_HOME="$HOME/users"
K8S_HOME="$HOME/k8s"

echo "Building Users image"
cd $USERS_HOME && docker build -t alexandergc/users .

echo "# Applying Kubernetes configurations for users"
cd $K8S_HOME && kubectl apply -f users-postgres-depl.yaml && kubectl apply -f users-depl.yaml

echo "# Applying Kubernetes configurations for nginx"
cd $K8S_HOME && kubectl apply -f nginx-config-map.yaml && kubectl apply -f nginx-depl.yaml
