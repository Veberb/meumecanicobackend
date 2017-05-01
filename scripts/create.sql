drop schema if exists mymechanic cascade;

create schema mymechanic;

CREATE SEQUENCE seq_garage START 101;

create table mymechanic.garage (
   id integer NOT NULL DEFAULT nextval('seq_garage'),
  name text not null,
  email text not null,
  cep text,
  born_year integer,
  cellphone text,
  description text,
  creation_time timestamp with time zone default now(),
  primary key (id)
);

create table mymechanic.customer (
  id integer not null,
  name text not null,
  email text not null,
  cep text not null,
  born_year integer,
  profession text not null,
  car text not null,
  sex text not null,
  cellphone text not null,
  creation_time timestamp with time zone default now(),
  primary key (id)
);

create table mymechanic.user (
  id_customer integer,
  id_garage integer,
  foreign key (id_customer) references mymechanic.customer (id),
  foreign key (id_garage) references mymechanic.garage (id)
);