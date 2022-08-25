CREATE DATABASE QUESTLOG;

CREATE TABLE usuarios (
    id serial primary key,
    nome text NOT NULL,
    email text NOT NULL UNIQUE,
    senha text NOT NULL
)

CREATE TABLE produtos (
	id serial primary key,
  	produto text NOT NULL,
  	story boolean DEFAULT TRUE,
  	freq_postagem varchar(20),
  	data_inicio date,
  	data_limite date,
  	plataforma varchar(30)[] NOT NULL,
  	metodo text[],
  	status boolean DEFAULT FALSE
    usuario_id number,
    foreign key(usuario_id) references usuarios(id)
);