#!/bin/bash

echo "==> Deleting old pods of auth..."
kubectl delete pods --selector=app=auth

echo "==> Creating new pods by Auth Deployment..."
