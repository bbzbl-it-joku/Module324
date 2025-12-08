#!/bin/bash

# echo "**cleanup state**"
# rm -rf .terraform || true
# rm terraform.tfstate || true
# rm terraform.tfstate.backup || true

echo "** Running Terraform Init**"
terraform init

echo "** Running Terraform Validate**"
terraform validate

echo "** Running Terraform import for existing resources**"
sh scripts/terraform_import_existing_aws_vpc.sh
sh scripts/terraform_import_existing_aws_subnet.sh
sh scripts/terraform_import_existing_aws_internet_gateways.sh
sh scripts/terraform_import_existing_aws_route_table.sh
sh scripts/terraform_import_existing_aws_security_group.sh
sh scripts/terraform_import_existing_ec2_instances.sh
sh scripts/terraform_import_existing_aws_ecr_repositories.sh

echo "** Running Terraform plan**"
terraform plan

echo "** Running Terraform Apply**"
terraform apply -auto-approve
sleep 20 # HACK: let it warm up to be ready for later ssh connections
