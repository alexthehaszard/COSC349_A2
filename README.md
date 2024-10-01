# Job Logger

A simple software solution for organizations to log jobs for workers to do

## How to Operate

This is designed to be run using AWS, with an RDS instance hosting a MariaDB database, and 2 EC2 instances for the API and frontend hosting.
## Database & API setup

### EC2 setup for API

To setup the API in AWS, we will first create an EC2 instance.

I used all default settings, except in the "Network settings" section, I will tick the "Allow HTTP traffic from the internet". This will open up the HTTP port for the API.

### RDS setup for Database

To setup the database in AWS, we will first create an RDS instance.

- Choose the MariaDB engine, and choose a template for your needs.
- For this demonstration, the "Free Tier" will do just fine, so select this.
- For credentials, I chose to use a self-managed password. If you use a username that is not the default (admin), then this will need to be changed in the API configuration.
- In "Connectivity", we will select "Connect to and EC2 compute resource", and then select the EC2 instance we just set up.

You can then select "Create database".

### Connecting API and Database

To connect the API and Database, we will be connecting to the API. To do this, go to the EC2 instance settings, and click "Connect" to get options for connecting.

Once connected, we will need to install MariaDB, git and npm (node package manager). This can be done by running the command

    sudo dnf install mariadb105 git npm

We will now clone the repository by running:

    git clone https://github.com/alexthehaszard/COSC349_A2.git

Then, to initialize the database, run the command (replace with your database endpoint, can be found in the RDS dashboard):

    mariadb -h your_database_endpoint -u admin -p -P 3306 < COSC349_A2/db.sql

To start the API, we will first go into the API directory, and install any dependencies needed.

    cd COSC349_A2/API
    npm install

To edit the DB endpoint, and credentials we can open the server.js file by running

    nano server.js

and changing the mysqlConfig variable, with

```
{
    host: "your_db_endpoint",
    port: "3306",
    user: "admin",
    password: "your_password"
}
```

Finally, we can start the API service. We will first run

    screen

to make the API keep running even after disconnecting from the SSH session. Then, run

    sudo node server.js

Your API should now be up and running and connected to your database.

## Frontend setup

### EC2 instance setup

First, you will make an EC2 instance similarly to how you made the API's EC2 instance.
I used all default settings, except in the "Network settings" section, I will tick the "Allow HTTP traffic from the internet". This will open up the HTTP port for the API.

Next, connect to your EC2 instance and run the command:

    sudo dnf install git npm

### Frontend setup

First, we will clone the repo using 

    git clone https://github.com/alexthehaszard/COSC349_A2.git

Then, you will need to setup the API_URL environment variable.
To do this, create a file in /frontend called ".env" and set the "REACT_APP_API_URL" variable to your public IP address hosting the API.
This can be done by running these commands.

    cd COSC349_A2/frontend
    echo "REACT_APP_API_URL=your_url_here" > .env

Included in the repository is a script which automatically installs all necessary packages, builds, and runs the frontend on port 80 (HTTP).
If you would like it to continue running after disconnecting from the SSH session, run the command

    screen
    
Then, run the build script:

    bash build.sh

Your frontend should now be running, and can be visited using the endpoint of the EC2 instance.
    
# Costs of running

To estimate the costs of running this service, I will use the [AWS Calculator](https://calculator.aws).

- The EC2 costs can be reduced to zero if using the Free Tier, as well as the S3 storage setup for the static web hosting.
- The costs of running the RDS instance monthly will be around $40.26, which can vary depending on the storage and speed requirements.
- The costs of running the Virtual Private Cloud (VPC) instance, it will cost around $36.50 per month.

This brings the total cost to around $76.76 per month.
