terraform{
   required_providers {
      docker = {
         source = "kreuzwerker/docker"
         version = "3.0.2"
      }
   }
}

provider "docker" {}

resource "docker_network" "internal_network" {
   name = "internal-app-network"
}

resource "docker_image" "mongo" {
   name = "mongo:latest"
   keep_locally = true

}

resource "docker_image" "node" {
   name = "nodejs"
   keep_locally = true
}

resource "docker_container" "mongo" {
   name  = "mongo"
   image = docker_image.mongo.image_id
   networks_advanced {
      name = docker_network.internal_network.name
   }
   volumes {
      host_path      = "C:/Users/eliel/Vscode Projects/mongo-db-node-js/mongo-seed/init.json"
      container_path = "/docker-entrypoint-initdb.d/init.json"
   }
   env = [
   "MONGO_INITDB_DATABASE: mydatabase"
   ]
   ports {
      external = 27017
      internal = 27017
   }
}

resource "docker_container" "node" {
   name  = "node"
   image = docker_image.node.image_id
   volumes {
      host_path      = "C:/Users/eliel/Vscode Projects/mongo-db-node-js/"
      container_path = "/server"
   }
   volumes {
      container_path = "/server/node_modules"
   }
   env = [
      "MONGODB_URL=mongodb://mongo_db:27017/mydatabase",
      "PORT=8000"
   ]
   ports {
      external = 8001
      internal = 8000
   }
   restart = "always"
   depends_on = [docker_container.mongo]
   command = ["node", "server.js"]
}