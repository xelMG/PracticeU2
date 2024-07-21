# PracticeU2
Implementation of Grafana and Prometheus for Monitoring a system

Objective
Investigate, install, and configure Grafana and Prometheus to set up a monitoring system for a software application. For testing purposes, use the Node.js service covered in classes. Employ Docker and Docker-Compose for the setup, and use Git to version and upload the configuration files to a GitHub repository.

Development
1.	Preliminary Investigation

Grafana:
-	An open-source platform for visualizing, analyzing, and monitoring metrics.
-	Features:
-	Customizable Dashboards: Create tailored dashboards with charts and visualizations.
-	Alerts: Set up notifications with rule-based alerts.
-	Integrations: Works with various data sources like Prometheus, Elasticsearch, InfluxDB, MySQL, PostgreSQL, etc.
     - Users and Roles: Manage users with different roles and permissions.

  	 Prometheus:
-	An open-source toolkit for system monitoring and alerting, initially developed at SoundCloud.
-	Features:
-	Time Series Data Model: Collects metrics in time series format with labels.
-	Advanced Queries: Utilizes PromQL (Prometheus Query Language) for querying metrics.
-	Alerts: Configure alerts using Alertmanager.
-	Exporters: Tools to gather metrics from various systems (e.g., Node Exporter for OS metrics).

2.	Installing Docker and Docker-Compose

Install Docker with the following commands:
sudo apt-get update
sudo apt-get install docker-ce
 
Install Docker-Compose:
sudo curl -L https://github.com/docker/compose/releases/download/1.25.3/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose –version

3.	Configuration of Prometheus
Create a Project Directory:
mkdir monitoring_project
cd monitoring_project

4.	Create a `docker-compose.yml` File:
Define the Prometheus service in this file.
Configure Prometheus:
 
Create a `prometheus.yml` configuration file:
global:
scrape_interval: 15s
scrape_configs:
- job_name: 'prometheus'
static_configs:
- targets: ['localhost:9090']
- job_name: 'nodejs-app'
static_configs:
- targets: ['nodejs:3000']

Run Prometheus with Docker-Compose:
docker-compose up --build -d

Verify Prometheus:
Open [http://localhost:9090](http://localhost:9090) in a browser to access the Prometheus web interface.
 

5.	Configuration of Grafana

-	Add Grafana to `docker-compose.yml`:
-	Include the Grafana service in the `docker-compose.yml` file.
-	Save and close the file.

Run Grafana and Prometheus Together:
docker-compose up --build -d

-	Verify Both Services:
Check Prometheus at [http://localhost:9090](http://localhost:9090).
Check Grafana at [http://localhost:3000](http://localhost:3000).

Log in to Grafana:
-	Default credentials:
-	Username: admin
-	Password: admin (or the password set in the `GF_SECURITY_ADMIN_PASSWORD` environment variable)

Configure Grafana Data Source:
-	After logging in, add Prometheus as a data source with the URL: `http://prometheus:9090`.
-	Click "Save & Test" to verify the connection.
 
Create Dashboards in Grafana:
-	Go to Home > Dashboards > New Dashboard.
-	Add visualizations using Prometheus queries (e.g., `prometheus_target_metadata_cache_bytes`).
-	Save the dashboard.

6.	Integration with the Node.js Project

Initial Setup:
-	Create a basic Node.js project and install necessary dependencies.

Implement Metrics Collection:
-	Create an `app.js` file in the project directory.
-	Run the application and check the metrics endpoint at [http://localhost:3000/metrics](http://localhost:3000/metrics).

Configure Prometheus:
-	Update `prometheus.yml` to include the Node.js target and restart Prometheus.

Verify Integration:
-	Check Prometheus targets at [http://localhost:9090](http://localhost:9090).
-	Check Grafana for metrics from the Node.js application and create additional panels as needed.


7.	Versioning and Repository on GitHub
- 

9.	Testing and Verification

10.	Deliverables
