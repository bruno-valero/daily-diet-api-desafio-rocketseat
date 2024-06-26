# Daily Diet API - Desafio Rocketseat

[![Typescript Badge](https://img.shields.io/badge/TypeScript-20232A?style=for-the-badge&logo=typescript&logoColor=007acd&link=https://gist.github.com/bruno-valero/302a8b36f8fb5749bd15866b523b315e)](https://gist.github.com/bruno-valero/302a8b36f8fb5749bd15866b523b315e)
[![NodeJS Badge](https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=node.js&logoColor=68a063&link=https://gist.github.com/bruno-valero/9c4167a53b05049712ee0333c5664904)](https://gist.github.com/bruno-valero/9c4167a53b05049712ee0333c5664904)
[![Fastify Badge](https://img.shields.io/badge/Fastify-20232A?style=for-the-badge&logo=fastify&logoColor=white&link=https://gist.github.com/bruno-valero/e8c06d762d79b08abfacaa56810b2938)](https://gist.github.com/bruno-valero/e8c06d762d79b08abfacaa56810b2938)

Nesse desafio será desenvolvido uma API para controle de dieta diária, a Daily Diet API.

Confira a proposta do desafio no **[notion](https://efficient-sloth-d85.notion.site/Desafio-02-be7cdb37aaf74ba898bc6336427fa410#1256d50643f4408ca1f5e75811004c3a)**.

## Requisitos Funcionais

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as requisições
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados (editáveis)
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível recuperar as métricas de um usuário

## Regras de Negócio

- [x] Uma refeição deve conter as seguintes informações:
  - [x] Dados editáveis
    - [x] Nome
    - [x] Descrição
    - [x] Data e Hora
    - [x] Está dentro ou não da dieta
  - [x] Metadados
    - [x] Data de criação
    - [x] Data da última atualização
    - [x] id
- [x] A métricas do usuário devem conter os seguintes dados:
  - [x] Quantidade total de refeições registradas
  - [x] Quantidade total de refeições dentro da dieta
  - [x] Quantidade total de refeições fora da dieta
  - [x] Melhor sequência de refeições dentro da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

## Requisitos Não Funcionais

- [x] Os dados deverão ser persistidos num banco de dados postgreSQL
- [x] O Banco de dados em desenvolvimento deve ser usado através de um container do Docker
- [x] Devem haver testes unitários e testes e2e para validar os requisitos e as regras de negócio
- [x] Deve ser implementado o CI (Continuous Integration)
- [x] CI - ao realizar um **push** para o github, todos os tests unitários devem ser executados
- [x] CI - ao realizar um **pull request** para o github, todos os tests e2e devem ser executados
- [x] O projeto dev seguir a metodologia DDD (Domain-Driven Design)

## Metodologia Domain-Driven Design

- [x] Domains:
  - [x] Diet Control
    - [x] application:
      - [x] repositories:
        - [x] users repository
        - [x] meals repository
      - [x] use cases:
        - [x] register user
        - [x] authenticate user
        - [x] create meal
        - [x] update meal
        - [x] delete meal
        - [x] find meal by id
        - [x] fetch meals
        - [x] get user metrics
    - [x] enterprise:
      - [x] entities:
        - [x] user
        - [x] meal
