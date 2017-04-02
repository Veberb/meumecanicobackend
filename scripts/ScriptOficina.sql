CREATE SEQUENCE seq_oficina START 101;

CREATE TABLE oficina
(
  id integer NOT NULL DEFAULT nextval('seq_oficina'),
  nome text,
  descricao text,
  cep text,
  cidade text,
  bairro text,
  telefone integer,
  whatsapp integer,
  facebook text,
  
  CONSTRAINT oficina_pkey PRIMARY KEY (id)
)
