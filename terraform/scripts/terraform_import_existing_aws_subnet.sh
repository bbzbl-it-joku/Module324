#!/bin/bash

# INFO: $1   : Beinhaltet der erste Parameter, der dem Script übergeben wird
#       2>&1 : Sendet Errors nach /dev/null, damit das Script nicht beendet wird
result=$(aws ec2 describe-subnets --filter Name=tag:App,Values=myapp 2>&1)

if [ $? -eq 0 ]; then
  echo "$result" | jq -c ".Subnets" | while read -r vpc; do
    echo "$vpc" | jq -rc ".[].SubnetId" | while read -r subnetId; do
      echo "$subnetId"
      terraform import aws_subnet.mysubnet "$subnetId" 2>&1
    done
  done
fi
