# Job Logger

A simple software solution for organizations to log jobs for workers to do

## How to Operate

This is designed to be run using AWS, with an RDS instance hosting a MariaDB database, S3 bucket for static web hosting, and an EC2 instance for the API.

## Frontend setup

### Local setup

To use the frontend, you will need to first setup the API_URL environment variable.
To do this, create a file in /frontend called ".env" and set the "REACT_APP_API_URL" variable to your public IP address hosting the API.
This can be done by running the command

    echo "REACT_APP_API_URL=[your_url_here]" > .env

You can then either run the frontend locally by running

    npm start

or, if you want to host it in AWS, run the command:

    npm build

### AWS setup

- To host the frontend, create a new S3 bucket and disable the "block all public access" setting.
- Then, you will need to set permissions to allow connections to all objects, by adding this to the bucket policy (you will need to replace "hasal314-joblist" with the name of your bucket)

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
            "Resource": "arn:aws:s3:::PUT YOUR BUCKET NAME HERE/_"
        }
    ]
  }
```

- You can then add upload all files in the "build" folder through the "objects" tab (I just drag-and-dropped)

- Finally, you can enable static web hosting at the bottom of the properties tab.

The frontend will now be visible at the bucket's website endpoint, which can be found at the bottom of the properties tab
