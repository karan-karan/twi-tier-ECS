# 🚀 Two-Tier AWS Infrastructure with Terraform  
### ECS Fargate + RDS MySQL | Infrastructure as Code

![Terraform](https://img.shields.io/badge/IaC-Terraform-623CE4?logo=terraform)
![AWS](https://img.shields.io/badge/Cloud-AWS-232F3E?logo=amazonaws)
![ECS](https://img.shields.io/badge/Compute-ECS_Fargate-FF9900?logo=amazonaws)
![RDS](https://img.shields.io/badge/Database-RDS_MySQL-527FFF?logo=amazonaws)
![Status](https://img.shields.io/badge/Status-Working-success)

---

## 📌 Project Summary
This project provisions a complete two-tier production-style architecture on AWS using Terraform.

It deploys:

- A containerized Node.js application on Amazon ECS Fargate
- A MySQL database on Amazon RDS
- IAM roles, security groups, and networking configuration

The infrastructure is fully reproducible and version-controlled using Infrastructure as Code (IaC).

---

## 🏗 Architecture Overview

Two-tier architecture separating compute and database layers.

            Internet
                │
                ▼
     ┌────────────────────┐
     │   ECS Fargate      │
     │   (Public IP)      │
     │   Port 3000        │
     └─────────┬──────────┘
               │
               │  Port 3306
               ▼
     ┌────────────────────┐
     │     Amazon RDS     │
     │     MySQL          │
     │   Database:        │
     │   employees        │
     └────────────────────┘

---

## 🧱 Infrastructure Provisioned via Terraform

### 🔹 Compute Layer
- ECS Cluster
- ECS Task Definition (Fargate)
- ECS Service
- Container image pulled from Amazon ECR
- Public IP enabled (No Load Balancer)

### 🔹 Database Layer
- Amazon RDS (MySQL)
- Allocated storage
- Configured DB name
- Security group allowing access only from ECS

### 🔹 IAM
- ECS Task Execution Role
- AmazonECSTaskExecutionRolePolicy
- Handling of existing IAM role conflicts using `data` block

### 🔹 Networking & Security
- Default VPC usage
- Public subnets
- App Security Group:
  - Allow inbound TCP 3000
- DB Security Group:
  - Allow inbound 3306 only from ECS security group

---

## 📂 Terraform Structure
```
terraform/
│
├── provider.tf
├── variables.tf
├── ecs.tf
├── rds.tf
├── iam.tf
├── security-groups.tf
├── outputs.tf
```
---
### State Management
- Local state (`terraform.tfstate`)
- Suitable for single-user environments
- Remote backend not configured (future enhancement)

---

## 🚀 Provisioning
```bash
1️⃣ Configure AWS Credentials
aws configure

2️⃣ Initialize Terraform
terraform init

3️⃣ Validate Configuration
terraform validate

4️⃣ Review Plan
terraform plan

5️⃣ Apply Infrastructure
terraform apply
```

## 👨‍💻 Author
Karan











