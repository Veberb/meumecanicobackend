Body for localhost:8081/insert/garage

{
    "name":"Oficina",
    "description":"Oficina mecanica localizada...",
    "email":"oficina@carro.com.br",
    "cep":"8800000",
    "born_year":"1980",
    "cellphone":"88555555"
}


Body for localhost:8081/insert/costumer

{
    "name":"Cliente",
    "email":"oficina@carro.com.br",
    "cep":"8800000",
    "born_year":"1980",
    "profession":"Estudante",
    "sex":"Male",
    "car":"Peugeot",
    "cellphone":"88555555"
}


INSERT INTO mymechanic.garage (id,name,email,cep,born_year,cellphone,description) VALUES
    (1000, 'Martelinho de ouro','martelinhodeouro@gmail.com.br', 89058254,2000, 4830282363,'Oficina visando melhor atendimento ao cliente'),
    (1001, 'Rei do Auto Center','reidoautorcenter@gmail.com.br', 15812070,2012, 4896048616,'A oficina com melhor custo/beneficio '),
    (1002, 'Oficina Mãos Veloz','maosveloz@gmail.com.br', 58400312,2013, 4833259746,'Oficina para quem busca um ótimo serviço.'),
    (1003, 'Oficina Soberana','soberana@gmail.com.br', 96501110,1999, 4925801147,'Para quem necessita de agilidade e qualidade'),
    (1004, 'Oficina Ao seu Dispor','aoseudispor@gmail.com.br', 86046480,1995, 4186492217,'Oficina a qualquer momento. Atendimento 24 horas 7 dias por semana'),
    (1005, 'Oficina Villa Center','villacenter@gmail.com.br', 59122330,2005, 4895321652,'A oficina vila center tem como objetivos atender  os moradores da região com agilidade, qualidade e bons preços.'),
    (1006, 'Oficina Top Center','topcenter@gmail.com.br', 36038135,2009, 4896021477,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed aliquet ipsum. Nulla eget sodales libero, vel aliquam est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum ut ipsum in ligula laoreet finibus. Sed a elit cursus, ultrices mauris et, pharetra ex. Praesent efficitur lacus a nulla tristique imperdiet.'),
    (1007, 'Oficina Restauro','restauro@gmail.com.br', 74455352,1997, 48909065412,'Nunc luctus quam imperdiet erat vulputate commodo. Donec rhoncus tortor in turpis interdum hendrerit. Vivamus ullamcorper eu est nec consequat.'),
    (1008, 'Oficina Imediato','imediato@gmail.com.br', 52165241,2001, 4132306987,'Donec facilisis nec tortor at pharetra. Cras euismod nulla dignissim, sagittis odio at, sollicitudin lacus. Curabitur et tincidunt risus. Morbi viverra luctus dapibus. Integer eget maximus leo. Duis at molestie lacus.'),
    (1009, 'Oficina Mãos Veloz','maosveloz@gmail.com.br', 41306015,2002, 4133285417,'Suspendisse consequat metus sit amet ligula vulputate mattis. Donec at pellentesque ante, ut finibus turpis. Sed ullamcorper eget ipsum in laoreet. Phasellus pellentesque sollicitudin lacus vitae rhoncus. Nullam dignissim felis mollis ultrices rutrum'),
    (1010, 'Oficina 4 dedos','4dedos@gmail.com.br', 12091410,2016, 4888703562,'Mussum Ipsum, cacilds vidis litro abertis. Interagi no mé, cursus quis, vehicula ac nisi. Mé faiz elementum girarzis, nisi eros vermeio. Detraxit consequat et quo num tendi nada. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.');

INSERT INTO mymechanic.customer (id, name, email, cep, born_year, profession, car, sex, cellphone) VALUES
    (1000, 'Mateus', 'mateus@gennera.com.br', 88070340, 1991, 'desenvolvedor', 'corsa', 'female', 4896048616);

INSERT INTO mymechanic."user" (id, id_customer, id_garage, password) VALUES (250,1000,null,123456 );

insert into mymechanic."user" (id, id_garage, password) values (251, 1000, 123456);
