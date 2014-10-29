create table Admin(
AdminID int identity primary key,
AdminName varchar(100),
Password varchar(32)
)

insert into Admin (AdminName,Password) values ('admin','E10ADC3949BA59ABBE56E057F20F883E')

create table Closes(
CloseID int primary key identity,
CloseName varchar(500),
Cover varchar(255),
Cover1 varchar(255),
Picture varchar(255),
Url varchar(400)
)

create table Note (
NoteID int primary key identity,
CloseID int,
NoteText varchar(1000),
AddTime DateTime default GetDate()
)