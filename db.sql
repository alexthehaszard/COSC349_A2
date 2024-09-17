-- the SQL in this file will be run in the JobList DB in MariaDB
-- very simple job tuple with some init jobs to start us off
create database JobList;
use JobList;

drop table if exists Jobs;

create table Jobs (
    Job_ID int primary key auto_increment,
    Job_Desc varchar(255) NOT NULL,
    Creation_Date date default current_date,
    Due_Date date,
    Address_ varchar(255)
);


insert into Jobs (Job_ID, Job_Desc, Due_Date, Address_) values (1, "Pothole", "2025-05-08", "34 addy st");
insert into Jobs (Job_ID, Job_Desc, Due_Date, Address_) values (2, "Fallen Tree", "2025-06-08", "35 addy st");
insert into Jobs (Job_ID, Job_Desc, Due_Date, Address_) values (3, "Line Painting", "2025-07-08", "42 addy st");
