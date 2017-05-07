# meumecanicobackend
backend


Para rodar o projeto, deve-se primeiro entrar na pasta scripts e rodar o seguinte comando.

psql -U postgres -h localhost -d mymechanic -f create.sql



Após isto, ir na pasta js, e no arquivo connectDataBase.js e trocar a linha chamada constring:

var conString = "postgres://postgres:@localhost/mymechanic";

Esta linha deve conter o usuario e senha do postgres.


"postgres://usuario:senha@localhost/mymechanic";