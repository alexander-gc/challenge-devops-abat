#!/bin/bash

GITHUB_USERNAME=$1
GITHUB_EMAIL=$2

if [ ! -n "$GITHUB_USERNAME" -o ! -n "$GITHUB_EMAIL" ]; then
    echo "Username and email of Github must be provided"
    exit 2
fi

git config --global user.name "$GITHUB_USERNAME"
git config --global user.email "$GITHUB_EMAIL"
