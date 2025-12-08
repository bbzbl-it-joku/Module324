#!/bin/bash

# INFO: $1   : Beinhaltet der erste Parameter, der dem Script übergeben wird
#       2>&1 : Sendet Errors nach /dev/null, damit das Script nicht beendet wird
result=$(aws ec2 describe-internet-gateways --filter Name=tag:App,Values=myapp 2>&1)

if [ $? -eq 0 ]; then
  echo "$result" | jq -c ".InternetGateways" | while read -r vpc; do
    echo "$vpc" | jq -rc ".[].InternetGatewayId" | while read -r internetGatewayId; do
      echo "$internetGatewayId"
      terraform import aws_internet_gateway.mygateway "$internetGatewayId" 2>&1
    done
  done
fi
