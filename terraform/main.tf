terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }
}

provider "aws" {
  region = "us-east-2"
}

resource "aws_security_group" "sg_test_k8s" {
  name        = "sg_test_k8s"
  description = "Security group of Test K8s"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "SSH"
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTP"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "test_k8s" {
  ami                         = "ami-024e6efaf93d85776" # ID de la AMI de Ubuntu 22.04 LTS
  instance_type               = "t2.medium"
  subnet_id                   = "subnet-024b8467cff75290b"
  vpc_security_group_ids      = [aws_security_group.sg_test_k8s.id]
  associate_public_ip_address = true
  key_name                    = "test-k8s-cluster"

  ebs_block_device {
    device_name           = "/dev/sda1"
    volume_type           = "gp2"
    volume_size           = 16
    delete_on_termination = true
  }

  tags = {
    Name = "test-k8s-cluster"
  }

  provisioner "file" {
    source      = "./scripts"
    destination = "/home/ubuntu"
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.ssh/test-k8s-cluster.pem")
      host        = self.public_ip
    }
  }

  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/ubuntu/scripts/install-k8s.sh",
      "chmod +x /home/ubuntu/scripts/clone-repo.sh",
      "chmod +x /home/ubuntu/scripts/install-nginx.sh",
      "sudo /home/ubuntu/scripts/install-k8s.sh",
      "sudo /home/ubuntu/scripts/clone-repo.sh",
      "sudo /home/ubuntu/scripts/install-nginx.sh"
    ]
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.ssh/test-k8s-cluster.pem")
      host        = self.public_ip
    }
  }

  provisioner "remote-exec" {
    inline = ["sudo usermod -aG docker $USER"]
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.ssh/test-k8s-cluster.pem")
      host        = self.public_ip
    }
  }

  provisioner "remote-exec" {
    inline = [
      "minikube start --driver=docker",
      "minikube config set driver docker"
    ]
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.ssh/test-k8s-cluster.pem")
      host        = self.public_ip
    }
  }

  # This is optional!
  provisioner "remote-exec" {
    inline = [
      "sudo chmod +x /home/ubuntu/challenge-devops-abat/k8s/scripts/start-depl.sh",
      "sudo /home/ubuntu/challenge-devops-abat/k8s/scripts/start-depl.sh"
    ]
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.ssh/test-k8s-cluster.pem")
      host        = self.public_ip
    }
  }
}

output "public_ip" {
  value = aws_instance.test_k8s.public_ip
}

output "private_ip" {
  value = aws_instance.test_k8s.private_ip
}
