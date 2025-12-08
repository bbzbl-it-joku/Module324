#!/bin/bash

# INFO: 2>&1 : Sendet Errors nach /dev/null, damit das Script nicht beendet wird
result=$(aws ecr describe-repositories 2>&1)

if [ $? -eq 0 ]; then
  echo "$result" | jq -c ".repositories" | while read -r reservation; do
    echo "$reservation" | jq -rc ".[].repositoryName" | while read -r repositoryName; do
      terraform import aws_ecr_repository.myecr "$repositoryName" 2>&1
    done
  done
fi
