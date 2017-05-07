CREATE SEQUENCE seq_workshop START 101;
CREATE SEQUENCE seq_client START 101;
CREATE SEQUENCE seq_user START 101;
CREATE SEQUENCE seq_answer START 101;
CREATE SEQUENCE seq_sign START 101;

CREATE TABLE workshop
(
  id integer NOT NULL DEFAULT nextval('seq_workshop'),
  name text,
  email text,
  cep text,
  born text,
  car text,
  cadastration_date date,
  whatsapp integer,
  cellphone text,
  
  CONSTRAINT workshop_pkey PRIMARY KEY (id)
);



CREATE TABLE client
(
  id integer NOT NULL DEFAULT nextval('seq_client'),
  name text,
  email text,
  cep text,
  born integer,
  profession text,
  car text,
  sex integer,
  cadastration_date date,
  
  CONSTRAINT oficina_pkey PRIMARY KEY (id)
);

CREATE TABLE userr
(
  id integer NOT NULL DEFAULT nextval('seq_user'),
  type text,
  id_workshop integer references workshop(id),
  id_client integer references client(id),

  CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE TABLE sign
(
  id integer NOT NULL DEFAULT nextval('seq_sign'),
  sign text,
  data date,
  answer text,
  id_workshop integer references workshop(id),
  id_client integer references client(id),

  CONSTRAINT sign_pkey PRIMARY KEY (id)
)

CREATE TABLE answer
(
  id integer NOT NULL DEFAULT nextval('seq_answer'),
  type text,
  data date,
  answer text,
  id_sign integer references sign(id),
  id_workshop integer references workshop(id),

  CONSTRAINT answer_pkey PRIMARY KEY (id)
)

