# Job Logger

A simple software solution for organizations to log jobs for workers to do

## How to Operate
Head to [this](https://www.docker.com/products/docker-desktop/) website to download Docker Desktop if your system does not have it already

With docker/docker-compose installed and running, use the command:

    docker-compose -f docker-compose.yml up

Visit [localhost:3000](http://localhost:3000/) to view the main application


# Details
- MariaDB database, this is initialized with the name JobList and all sql files (in alphabetical order) in /docker-entrypoint-initdb will be run to initialize the tables.

- Adminer admin panel, can be accessed through port 8080

- Backend API using NodeJS and express, accessed at port 3001. To send a get request on the joblist table, view localhost:3001/job. For each SELECT, INSERT and UPDATE request we may send to the DB, we must send these requests through GET and POST requests to this API.

- Frontend React app, performs GET and POST requests to the backend API. Accessed through port 3000
