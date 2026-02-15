resource "aws_ecs_cluster" "main" {
  name = "two-tier-cluster"
}

resource "aws_ecs_task_definition" "app" {
  family                   = "two-tier-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = aws_iam_role.ecs_execution_role.arn

  container_definitions = jsonencode([
    {
      name      = "two-tier-container"
      image     = var.ecr_image_url
      essential = true

      portMappings = [{
        containerPort = 3000
        hostPort      = 3000
      }]

      environment = [
        { name = "DB_HOST", value = aws_db_instance.mysql.address },
        { name = "DB_USER", value = var.db_username },
        { name = "DB_PASSWORD", value = var.db_password },
        { name = "DB_NAME", value = "employees" }
      ]
    }
  ])
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

resource "aws_ecs_service" "app" {
  name            = "two-tier-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  depends_on = [
    aws_db_instance.mysql
  ]
  
  network_configuration {
    subnets          = data.aws_subnets.default.ids
    security_groups  = [aws_security_group.ecs_sg.id]
    assign_public_ip = true
  }
}
