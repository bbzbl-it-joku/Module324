#!/bin/bash

# INFO: $1   : Beinhaltet der erste Parameter, der dem Script übergeben wird
#       2>&1 : Sendet Errors nach /dev/null, damit das Script nicht beendet wird
result=$(aws ec2 describe-vpcs --filter Name=tag:App,Values=myapp 2>&1)

if [ $? -eq 0 ]; then
  echo "$result" | jq -c ".Vpcs" | while read -r vpc; do
    echo "$vpc" | jq -rc ".[].VpcId" | while read -r vpcId; do
      terraform import aws_vpc.myvpc "$vpcId" 2>&1
    done
  done
fi
