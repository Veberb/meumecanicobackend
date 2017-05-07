drop schema if exists mymechanic cascade;

create schema mymechanic;

CREATE SEQUENCE mymechanic.seq_garage START 101;
CREATE SEQUENCE mymechanic.seq_customer START 101;
CREATE SEQUENCE mymechanic.seq_user START 101;
CREATE SEQUENCE mymechanic.seq_review START 101;
CREATE SEQUENCE mymechanic.seq_answer START 101;

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
  id integer NOT NULL DEFAULT nextval('seq_customer'),
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
  id integer NOT NULL DEFAULT nextval('seq_user'),
  id_customer integer,
  id_garage integer,
  primary key (id),
  foreign key (id_customer) references mymechanic.customer (id),
  foreign key (id_garage) references mymechanic.garage (id)
);

create table mymechanic.review (
  id integer NOT NULL DEFAULT nextval('seq_review'),
  id_customer integer,
  id_garage integer,
  id_review integer  default null,
  review text,
  creation_time timestamp with time zone default now(),
  primary key (id),
  foreign key (id_review) references mymechanic.review (id),
  foreign key (id_customer) references mymechanic.customer (id),
  foreign key (id_garage) references mymechanic.garage (id)
);

create table mymechanic.answer (
  id integer NOT NULL DEFAULT nextval('seq_answer'),
  id_garage integer,
  id_review integer,
  answer text,
  creation_time timestamp with time zone default now(),
  primary key (id),
  foreign key (id_review) references mymechanic.review (id),
  foreign key (id_garage) references mymechanic.garage (id)
);

ALTER TABLE mymechanic.user
ADD password text;