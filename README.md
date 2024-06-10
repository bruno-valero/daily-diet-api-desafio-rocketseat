# Daily Diet API - Desafio Rocketseat

Nesse desafio será desenvolvido uma API para controle de dieta diária, a Daily Diet API.

## Requisitos Funcionais

- [ ] Deve ser possível criar um usuário
- [ ] Deve ser possível identificar o usuário entre as requisições
- [ ] Deve ser possível editar uma refeição, podendo alterar todos os dados (editáveis)
- [ ] Deve ser possível apagar uma refeição
- [ ] Deve ser possível listar todas as refeições de um usuário
- [ ] Deve ser possível visualizar uma única refeição
- [ ] Deve ser possível recuperar as métricas de um usuário

## Regras de Negócio

- [ ] Uma refeição deve conter as seguintes informações:
  - [ ] Dados editáveis
    - [ ] Nome
    - [ ] Descrição
    - [ ] Data e Hora
    - [ ] Está dentro ou não da dieta
  - [ ] Metadados
    - [ ] Data de criação
    - [ ] Data da última atualização
    - [ ] id
- [ ] A métricas do usuário devem conter os seguintes dados:
  - [ ] Quantidade total de refeições registradas
  - [ ] Quantidade total de refeições dentro da dieta
  - [ ] Quantidade total de refeições fora da dieta
  - [ ] Melhor sequência de refeições dentro da dieta
- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

## Requisitos Funcionais

- [ ] Os dados deverão ser persistidos num banco de dados postgreSQL
- [ ] O Banco de dados em desenvolvimento deve ser usado através de um container do Docker
- [ ] Devem haver testes unitários e testes e2e para validar os requisitos e as regras de negócio
- [ ] Deve ser implementado o CI (Continuous Integration)
- [ ] CI - ao realizar um **push** para o github, todos os tests unitários devem ser executados
- [ ] CI - ao realizar um **pull request** para o github, todos os tests e2e devem ser executados
- [ ] O projeto dev seguir a metodologia DDD (Domain-Driven Design)

## Metodologia Domain-Driven Design

- [ ] Domains:
  - [ ] Diet Control
    - [ ] application:
      - [ ] repositories:
        - [ ] users repository
        - [ ] meals repository
      - [ ] use cases:
        - [ ] register user
        - [ ] create meal
        - [ ] update meal
        - [ ] delete meal
        - [ ] find meal by id
        - [ ] fetch meals
        - [ ] get user metrics
    - [ ] enterprise:
      - [ ] entities:
        - [ ] user
        - [ ] meal
