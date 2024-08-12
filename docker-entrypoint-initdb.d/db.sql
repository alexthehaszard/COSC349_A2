-- the SQL in this file will be run in the JobList DB in MariaDB
create table Jobs (
    Job_Num int primary key,
    Issue varchar(255)
);

insert into Jobs (Job_Num, Issue) values (1, "Pothole");
insert into Jobs (Job_Num, Issue) values (2, "Fallen Tree");
insert into Jobs (Job_Num, Issue) values (3, "Line Painting");