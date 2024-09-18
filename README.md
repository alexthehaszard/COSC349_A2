# Job Logger

A simple software solution for organizations to log jobs for workers to do

## How to Operate

This is designed to be run using AWS, with an RDS instance hosting a MariaDB database, S3 bucket for static web hosting, and an EC2 instance for the API.

## Database & API setup

### EC2 setup for API

To setup the API in AWS, we will first create an EC2 instance.

I used all default settings, except in the "Network settings" section, I will tick the "Allow HTTP traffic from the internet". This will open up the HTTP port for the API.

### RDS setup for Database

To setup the database in AWS, we will first create an RDS instance.

- Choose the MariaDB engine, and choose a template for your needs.
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

### Local setup

For these next steps, you will need to clone the repo onto your local machine.

To use the frontend, you will need to first setup the API_URL environment variable.
To do this, create a file in /frontend called ".env" and set the "REACT_APP_API_URL" variable to your public IP address hosting the API.
This can be done by running the command in the frontend directory

    echo "REACT_APP_API_URL=your_url_here" > .env

Note: If the frontend host doesn't work, this is a known issue. Follow the steps below for a temporary workaround.

    fetch(`http://your db ip address/job`)
on line 7 of JobList.jsx

    http://your db ip address/job,
on line 27 of JobForm.jsx

![image](https://github.com/user-attachments/assets/6d819b72-e7bd-4876-a332-5b24c7edbdb2)


You can then either run the frontend locally by running

    npm start

or, if you want to host it in AWS, run the command:

    npm build

### AWS setup

- To host the frontend, create a new S3 bucket and disable the "block all public access" setting.
- Then, you will need to set permissions to allow connections to all objects, by adding this to the bucket policy (you will need to replace "hasal314-joblist" with the name of your bucket)

- Make sure the name matches your bucket name exactly, I.E "arn:aws:s3:::insert_name_here/_"
```
  {
    "Version": "2012-10-17",
    "Statement":
    [
        {
            "Sid": "Allow Public Access to All Objects",
            "Effect": "Allow",
            "Principal": "_",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::hasal314-joblist/_"
        }
    ]
  }
```

- You can then upload all files in the "build" folder through the "objects" tab (I just drag-and-dropped)
- Try to drag all the files individually and not the 'build' folder
- Finally, you can enable static web hosting at the bottom of the properties tab.

The frontend will now be visible at the bucket's website endpoint, which can be found at the bottom of the properties tab
