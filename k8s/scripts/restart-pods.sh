#!/bin/bash

echo "==> Deleting old pods of users..."
kubectl delete pods --selector=app=users

echo "==> Creating new pods by Users Deployment..."
