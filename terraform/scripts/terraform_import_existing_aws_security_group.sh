#!/bin/bash

# INFO: $1   : Beinhaltet der erste Parameter, der dem Script übergeben wird
#       2>&1 : Sendet Errors nach /dev/null, damit das Script nicht beendet wird
result=$(aws ec2 describe-security-groups --filter Name=tag:App,Values=myapp 2>&1)

if [ $? -eq 0 ]; then
  echo "$result" | jq -c ".SecurityGroups" | while read -r securityGroup; do
    echo "$securityGroup" | jq -rc ".[].GroupId" | while read -r groupId; do
      terraform import aws_security_group.mysecuritygroup "$groupId" 2>&1
    done
  done
fi
