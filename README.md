# COSC349_A1

3 vms doing different things

## Idea 1

A todo list for organisations

- workers or the public can amend jobs through a web interface
- jobs are stored in a database
- organizations can view and organize (pun intended) those jobs

## Docker containers:

With docker/docker-compose installed and running, use the command:

    docker-compose -f docker-compose.yml up

- MariaDB database, this is initialized with the name JobList and all sql files (in alphabetical order) in /docker-entrypoint-initdb will be run to initialize the tables.

- Adminer admin panel, can be accessed by viewing localhost:8080

- Backend API using NodeJS and express, accessed at localhost:3000. To send a get request on the joblist table, view localhost:3000/job. For each SELECT, INSERT and UPDATE request we may send to the DB, we must send these requests through GET and POST requests to this API.
