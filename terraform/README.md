# Terraform

## Was ist Terraform?

[Terraform](https://developer.hashicorp.com/terraform/intro) verwendet cloud infrastructure cli's, wie z.B. `aws` um die Infrastruktur via Code zu erstellen.
Dabei verwendet Terraform eine eigene, Scriptsprache die `JSON` nachempfunden wurde.

## Wieso verwenden wir Terraform?

Das Ziel des Moduls ist es, in einer für DevOps ausgelegte Infrastruktur Erfahrung zu sammeln.
Terraform ist dazu zum einen eine super Technologie, welche Ihr auch im Geschäft verwenden könnt,
zum anderen ermöglicht es jedoch für jeden eine Umgebung auf Amazon aufzusetzen, ohne dass die einzelne Person
AWS komplett verstanden hat!

Mit Terraform versuche ich den Unterricht für alle spannend zu machen, während direkt
"best-practices" von DevOps zu vermitteln.

Dieses Modul erweitert "DevOps" mit "GitOps", was soviel bedeutet, dass alle Konfiguration in Git vorliegt
und somit einfach für neue Team-Mitglieder ersichtlich und anwendbar ist.

> [!TIP]
>
> - In diesem Projekt befindet sich die ganze Konfiguration in der Datei `main.tf`.
> - deployed wird durch das script `deploy.sh`

## Terraform im devcontainer "depoyen"

Hierzu braucht ihr Folgendes:

1. Den Ordner `../local-template` duplizieren und in `local` umbenennen.
2. Die AWS credentials nach `./local/aws/credentials` kopieren.
3. Den Ssh-Key vom AWS nach `./local/ssh/id_rsa.pem` kopieren.
4. Den VSCode DevContainer vom Projekt starten oder neu bauen.
5. In den Container einloggen via VSCode DevContainer Terminal.
6. Folgenden Befehl im Ordner `./terraform` ausführen.

   `sh deploy.sh`

## Was macht `deploy.sh`

Dies bedeutet, dass es durch `bash` ausgeführt werden soll

```bash
#!/bin/bash
```

Dann wird lokal der Terraform Status gelöscht. Dies kann sonst zu Inkonsistenzen führen.
Der Status wird später nochmals live von AWS importiert.

```bash
echo "**cleanup state**"
rm -rf .terraform || true
rm terraform.tfstate || true
rm terraform.tfstate.backup || true
```

Es wird Terraform initialisiert und validiert, ob das `main.tf` Script korrekt ist.

```bash
echo "** Running Terraform Init**"
terraform init

echo "** Running Terraform Validate**"
terraform validate
```

Nun werden existierende Ressourcen importiert.

> [!CAUTION]
> Wird dieser Schritt ausgelassen werden Ressourcen mehrfach erstellt! Das gibt ein Durcheinander.

```bash
echo "** Running Terraform import for existing resources**"
sh scripts/terraform_import_existing_aws_vpc.sh
sh scripts/terraform_import_existing_aws_subnet.sh
sh scripts/terraform_import_existing_aws_internet_gateways.sh
sh scripts/terraform_import_existing_aws_route_table.sh
sh scripts/terraform_import_existing_aws_security_group.sh
sh scripts/terraform_import_existing_ec2_instances.sh
sh scripts/terraform_import_existing_aws_ecr_repositories.sh
```

Mit `terraform plan` wird geprüft, was das Script auf AWS für einen Effekt hätte.

```bash
echo "** Running Terraform plan**"
terraform plan
```

Mit `terraform apply` führten wir das Script auf AWS aus. Ohne dies würde es nichts machen.

```bash
echo "** Running Terraform Apply**"
terraform apply -auto-approve
sleep 20 # HACK: let it warm up to be ready for later ssh connections
```

Nun wird die öffentliche IP der erstellten ubuntu Instanz abgerufen und in eine Environment-Variable geschrieben.

```bash
# write ServerIP as enviroment variable to be used in step "Set up Kamal"
echo "SERVER_IP=$(sh scripts/get_public_ip.sh ubuntu2404)" >>$GITHUB_ENV
```
