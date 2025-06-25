provider "google" {
  credentials = file("/home/ilyas/Downloads/credential_GCP.json")
  project = "crafty-cache-463522-g2"
  region  = "us-central1"
  zone    = "us-central1-a"
}

resource "google_container_cluster" "primary" {
  name     = "moussaada-cluster"
  location = "us-central1-a"

  remove_default_node_pool = true
  initial_node_count       = 1

  networking_mode = "VPC_NATIVE"
  network         = "default"
  subnetwork      = "default"
}

resource "google_container_node_pool" "primary_nodes" {
  name       = "default-pool"
  location   = "us-central1-a"
  cluster    = google_container_cluster.primary.name

  node_config {
    machine_type = "e2-medium"
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
    ]
    disk_size_gb = 30
  }

  initial_node_count = 1

    autoscaling {
    min_node_count = 1    
    max_node_count = 3    
  }
}
