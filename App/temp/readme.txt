create database productdb;
use[productdb]
go

create table Currency (
 ID int primary key identity (1,1),
 currencyName nvarchar (50) not null,
 abbreviation nvarchar (3) not null

);

create table ProductStatus(
 ID int primary key identity (1,1),
 statusName nvarchar (50) not null
);
create table Product(
 ID int primary key identity (1,1),
 productName nvarchar (100) not null,
 productDescription text not null,
 price decimal (18,2) not null,
 currencyID int not null,
 statusID int not null,
 CONSTRAINT FK_Product_Currency FOREIGN KEY (currencyID)
 REFERENCES Currency(ID),
 CONSTRAINT FK_Product_ProductStatus FOREIGN KEY (statusID)
 REFERENCES ProductStatus(ID)
);

insert into Currency (currencyName, abbreviation) values ('georgian lari', 'GEL');
insert into Currency (currencyName, abbreviation) values ('US dollar', 'USD');
insert into Currency (currencyName, abbreviation) values ('Euro', 'EUR');

insert into ProductStatus (statusName) values (N'დასადასტურებელი');
insert into ProductStatus (statusName) values (N'დადასტურებული');
insert into ProductStatus (statusName) values (N'გადამისამართებული');


insert into Product(productName, productDescription, price, currencyID, statusID)
              values('Knife', 'Made Of Steel', 15.9, 1, 2);
insert into Product(productName, productDescription, price, currencyID, statusID)
              values('Table', 'Made Of Wood', 154.99, 2, 3);
insert into Product(productName, productDescription, price, currencyID, statusID)
              values('Wallet', 'Made Of Leather', 85.66, 3, 1);

select * from Currency;
select * from ProductStatus;


