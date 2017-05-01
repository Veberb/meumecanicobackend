drop schema if exists mymechanic cascade;

create schema mymechanic;

CREATE SEQUENCE seq_garage START 101;
CREATE SEQUENCE seq_customer START 101;
CREATE SEQUENCE seq_user START 101;
CREATE SEQUENCE seq_review START 101;
CREATE SEQUENCE seq_answer START 101;

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
  ADD CONSTRAINT id_customer_fk foreign key (id_customer) references mymechanic.customer (id),
  ADD CONSTRAINT id_garage_fk foreign key (id_garage) references mymechanic.garage (id)
);

create table mymechanic.review (

  id integer NOT NULL DEFAULT nextval('seq_review'),
  id_customer integer,
  id_garagae integer,
  id_review_fk,
  review text,
  creation_time timestamp with time zone default now(),
  ADD CONSTRAINT id_review_fkey foreign key (id_review_fk) references mymechanic.review (id)
  ADD CONSTRAINT id_customer_fkey foreign key (id_customer) references mymechanic.customer (id),
  ADD CONSTRAINT id_garage_fkey foreign key (id_garage) references mymechanic.garage (id)
);

create table mymechanic.answer (
  id integer NOT NULL DEFAULT nextval('seq_answer'),
  id_garagae integer,
  id_review,
  answer text,
  creation_time timestamp with time zone default now(),
  ADD CONSTRAINT id_review_fk foreign key (id_review) references mymechanic.review (id)
  ADD CONSTRAINT id_customer_fk foreign key (id_customer) references mymechanic.customer (id),
  ADD CONSTRAINT id_garage_fk foreign key (id_garage) references mymechanic.garage (id)
);