#!/bin/bash

# INFO: $1   : Beinhaltet der erste Parameter, der dem Script übergeben wird
#       2>&1 : Sendet Errors nach /dev/null, damit das Script nicht beendet wird
result=$(aws ec2 describe-route-tables --filter Name=tag:App,Values=myapp 2>&1)

if [ $? -eq 0 ]; then
  echo "$result" | jq -c ".RouteTables" | while read -r routeTable; do
    echo "$routeTable" | jq -rc ".[].RouteTableId" | while read -r routeTableId; do
      terraform import aws_route_table.my-route-table "$routeTableId" 2>&1
    done
  done
fi
