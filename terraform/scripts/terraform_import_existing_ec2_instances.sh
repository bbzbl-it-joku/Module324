#!/bin/bash

# INFO: $1   : Beinhaltet der erste Parameter, der dem Script übergeben wird
#       2>&1 : Sendet Errors nach /dev/null, damit das Script nicht beendet wird
instanceId=$(aws ec2 describe-instances --filter Name=tag:App,Values=myapp --query "Reservations[*].Instances[?!contains(State.Name, 'terminated')].{Instance:InstanceId}" --output text 2>&1)

if [ $? -eq 0 ]; then
  if [ -n "$instanceId" ]; then
    terraform import aws_instance.ubuntu2404 "$instanceId" 2>&1
  fi
fi
