# Desafio Técnico - App de Recrutamento Interno 

Esse é o repositório do Frontend do Desafio Técnico para a vaga de Desenvolvedor Full Stack (Java e Angular) - Nível Pleno. Este projeto visa criar uma aplicação web que facilita o processo de recrutamento interno para os colaboradores da empresa. O projeto foi desenvolvido com Angular no frontend, Spring Boot no backend e banco de dados relacional PostgreSQL.

## Objetivo

Desenvolver uma aplicação que permita aos usuários pesquisar e candidatar-se a vagas internas

## Funcionalidades

1. **Autenticação e Autorização:**
   - Sistema de autenticação com tokens JWT seguro para os usuários

2. **Cadastro de Vagas:**
   - Administradores cadastram novas vagas, incluindo informações como título, descrição e requisitos.
   - Administradores podem efetuar a atualização e exclusão de vagas.

3. **Candidatura a Vagas:**
   - Os colaboradores podem efetuar sua candidatura às vagas e expressar interesse em uma posição específica.
   - Notificações aos responsáveis pela vaga e ao candidato.

4. **Painel do Candidato (Bônus):**
   - Criar um painel para os candidatos acompanharem o status de suas candidaturas e receberem feedbacks.

5. **Avaliação de Candidatos (Bônus):**
   - Sistema de avaliação de candidatos pelos responsáveis pela vaga, incluindo filtros de requisitos ou tempo de empresa.

## Como Rodar a Aplicação

É possível testar a aplicação em produção diretamente no link https://main--desafio-tecnico-pacto-frontend.netlify.app/login

O frontend está hospedado no Netlify. O backend e uma instância do banco de dados PostgreSQL estão hospedados no Railway. 

## Rodando a Aplicação na Máquina Local

1. **Backend (Spring Boot):**
   - Acesse o repositório do backend
   - Faça um clone do projeto
   - Configure as variáveis de ambiente no arquivo de configuração application.properties
   - Execute a aplicação Spring Boot

3. **Frontend (Angular):**
   - Acesse o repositório do frontend
   - Faça um clone do projeto
   - Instale as dependências: `npm install`
   - Inicie o servidor de desenvolvimento: `ng serve`

 Após seguir os passos acima, acesse http://localhost:4200/ no navegador. A aplicação estará disponível localmente para testes.

Não hesite em entrar em contato se precisar de suporte ou tiver alguma dúvida.

